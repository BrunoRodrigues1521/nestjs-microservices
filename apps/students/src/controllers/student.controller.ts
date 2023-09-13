import { SuccessMessage } from '../types/success';
import { EHttpStatus } from '../enums/httpStatus.enum';
import { StartDegreeMessageDto } from 'src/dto/messages/startDegree.message.dto';
import { Student, DegreeId, CourseEditionId } from '@prisma/client';
import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
  ClientKafka,
} from '@nestjs/microservices';
import Topics from 'src/enums/topics.enum';
import {
  StudentDeleteDto,
  StudentDto,
  StudentFilterDto,
  StudentUpdateDto,
} from 'src/dto/messages/student.message.dto';
import { ValidationService } from 'src/services/validation.service';
import CustomExceptionMessage from 'src/dto/messages/exception.message.dto';
import { ExceptionMessage } from 'src/types/exception';
import CustomSuccessMessage from 'src/dto/messages/success.message.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import CourseEditionMessageDto from '../dto/messages/courseEdition.message.dto';
import CourseEditionIdMessageDto from 'src/dto/messages/courseEditionId.message.dto';
import { StudentIdRequestDto } from 'src/dto/messages/studentIdRequest.dto';
import { DegreeIdKeyValue } from 'src/dto/messages/degreeIdKeyValue.dto';
import AppealEnrollMessageDto from '../dto/messages/appealEnrollement.message.dto';
import { StudentCourseEditionService } from 'src/services/studentCourseEdition.service';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentCourseService: StudentCourseEditionService,
    private readonly validationService: ValidationService,

    @Inject('ACADEMIC_RECORDS_MICROSERVICE')
    private readonly academicRecordsClient: ClientKafka,
  ) { }

  @MessagePattern(Topics.STUDENT_GET)
  getStudentFilter(query: StudentFilterDto): Promise<Student[]> {
    const result = this.studentService.getStudents(query);
    return result;
  }

  @MessagePattern(Topics.STUDENT_CREATE)
  async studentRegister(data: StudentDto): Promise<Student> {
    const result = this.studentService.studentRegister(data);
    this.academicRecordsClient.emit(Topics.ADD_STUDENT_ID_TOPIC, await result);

    return result;
  }

  @MessagePattern(Topics.STUDENT_DELETE)
  async deleteStudent(
    query: StudentDeleteDto,
  ): Promise<Student | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      parseInt(query.studentId),
    );

    if (!isStudent) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student id',
      ).toJSON();
    }
    const result = this.studentService.deleteStudent(query);
    this.academicRecordsClient.emit(
      Topics.DELETE_STUDENT_ID_TOPIC,
      await result,
    );
    return result;
  }

  @MessagePattern(Topics.STUDENT_UPDATE)
  async updateStudent(
    data: StudentUpdateDto,
  ): Promise<Student | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );

    if (!isStudent) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student id',
      ).toJSON();
    }

    const validDegreeStates: boolean =
      await this.validationService.validateDegreeStates(
        data.degreeStateId,
        data.studentId,
      );

    if (!validDegreeStates) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid degree state id in the request (or degree state id does not belong to the student)',
      ).toJSON();
    }

    const result = this.studentService.updateStudent(data);
    return result;
  }

  @MessagePattern(Topics.STUDENT_START_DEGREE)
  async startDegree(
    data: StartDegreeMessageDto,
  ): Promise<Student | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );
    const isDegree: boolean = await this.validationService.validateDegreeId(
      data.degreeId,
    );
    if (!isStudent || !isDegree) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student or degree id',
      ).toJSON();
    }
    return this.studentCourseService.startDegree(data);
  }

  @MessagePattern(Topics.STUDENT_FREEZE_ENROLLMENT)
  async freezeEnrollment(
    data: StartDegreeMessageDto,
  ): Promise<SuccessMessage | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );
    const isDegree: boolean = await this.validationService.validateDegreeId(
      data.degreeId,
    );
    if (!isStudent || !isDegree) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student or degree id',
      ).toJSON();
    }
    const freeze = await this.studentCourseService.freezeEnrollment(data);
    if (freeze) {
      return new CustomSuccessMessage(
        EHttpStatus.OK,
        'Student enrollment frozen successfully',
      ).toJSON();
    }
    return new CustomExceptionMessage(
      EHttpStatus.INTERNAL_SERVER_ERROR,
      'Student enrollment could not be frozen',
    ).toJSON();
  }

  @MessagePattern(Topics.STUDENT_QUIT_DEGREE)
  async quitDegree(
    data: StartDegreeMessageDto,
  ): Promise<Student | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );
    const isDegree: boolean = await this.validationService.validateDegreeId(
      data.degreeId,
    );
    if (!isStudent || !isDegree) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student or degree id',
      ).toJSON();
    }
    return this.studentCourseService.quitDegree(data);
  }

  @MessagePattern(Topics.STUDENT_GET_DEGREES)
  async getStudentDegrees(
    data: StudentIdRequestDto,
  ): Promise<any | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );
    if (!isStudent) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student id',
      ).toJSON();
    }
    return this.studentService.getStudentDegrees(data);
  }

  @EventPattern(Topics.DEGREE)
  async updateDegreeIds(
    @Payload() data: string,
    @Ctx() context: KafkaContext,
  ): Promise<DegreeId> {
    const { key, value } = context.getMessage();
    const buffer: DegreeIdKeyValue = {
      key: key.toString(),
      degreeId: value.toString(),
    };
    return this.studentCourseService.updateDegreeIds(buffer);
  }

  @MessagePattern(Topics.CREATE_APPEAL_ENROLLMENT)
  async createAppealEnroll(
    data: AppealEnrollMessageDto,
  ): Promise<SuccessMessage> {
    return this.studentService.appealEnroll(data);
  }

  @EventPattern(Topics.ADD_COURSE_EDITION_TOPIC)
  async courseEditionCreated(
    data: CourseEditionIdMessageDto,
  ): Promise<CourseEditionId> {
    return this.studentService.courseEditionCreated(data);
  }

  @EventPattern(Topics.DELETE_COURSE_EDITION_TOPIC)
  async courseEditionDelete(
    data: CourseEditionIdMessageDto,
  ): Promise<CourseEditionId> {
    return this.studentService.courseEditionDelete(data);
  }

  @MessagePattern(Topics.STUDENT_ENROLL_COURSE_EDITION)
  async enrollCourseEdition(
    data: CourseEditionMessageDto,
  ): Promise<Student | ExceptionMessage> {
    const isStudent: boolean = await this.validationService.validateStudentId(
      data.studentId,
    );
    const isCourseEdition: boolean =
      await this.validationService.validateCourseEditionId(
        data.courseEditionId,
      );
    if (!isStudent || !isCourseEdition) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid Course Edition id or Invalid Student id',
      ).toJSON();
    }
    return this.studentCourseService.enrollCourseEdition(data);
  }
}

import { StartDegreeMessageDto } from 'src/dto/messages/startDegree.message.dto';
import { PrismaService } from '../repository/app.repository';
import CourseEditionMessageDto from '../dto/messages/courseEdition.message.dto';
import CourseEditionIdMessageDto from 'src/dto/messages/courseEditionId.message.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  PrismaPromise,
  Student,
  DegreeId,
  DegreeState,
  CourseEditionId,
} from '@prisma/client';
import { convertToStudent } from 'src/helpers/util';
import { StudentDeleteDto } from 'src/dto/messages/student.message.dto';
import { HttpService } from '@nestjs/axios';
import { StudentIdRequestDto } from 'src/dto/messages/studentIdRequest.dto';
import { DegreeIdKeyValue } from 'src/dto/messages/degreeIdKeyValue.dto';
import AppealEnrollMessageDto from 'src/dto/messages/appealEnrollement.message.dto';
import Topics from 'src/enums/topics.enum';
import { EHttpStatus } from 'src/enums/httpStatus.enum';
import CustomSuccessMessage from 'src/dto/messages/success.message.dto';
import { SuccessMessage } from 'src/types/success';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class StudentService {
  constructor(
    @Inject('DEGREE_MICROSERVICE')
    private readonly degreeClient: ClientKafka,
    @Inject('COURSE_EDITION_MICROSERVICE')
    private readonly courseEditionClient: ClientKafka,
    @Inject('ACADEMIC_RECORDS_MICROSERVICE')
    private readonly academicRecordClient: ClientKafka,
    private prisma: PrismaService,
    private http: HttpService,
  ) { }

  getStudents(query): Promise<Student[]> {
    query = convertToStudent(query);

    return this.prisma.student.findMany({
      where: {
        AND: [query],
      },
    });
  }

  studentRegister(data): PrismaPromise<Student> {
    data.birthDate = new Date(data.birthDate);
    return this.prisma.student.create({
      data: data,
    });
  }

  async deleteStudent(query: StudentDeleteDto): Promise<Student> {
    const studentId: number = parseInt(query.studentId);

    const student = await this.getStudentById(studentId);
    const deleteStateId = student.degreeStateId;
    const deleteStudent = await this.prisma.student.delete({
      where: {
        id: studentId,
      },
    });
    await this.prisma.degreeState.deleteMany({
      where: {
        id: {
          in: deleteStateId,
        },
      },
    });
    return deleteStudent;
  }

  async updateStudent(data): Promise<Student> {
    const { studentId } = data;

    delete data.studentId;
    data.id = studentId;

    data.birthDate = new Date(data.birthDate);

    return this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: data,
    });
  }

  async getStudentDegrees(data: StudentIdRequestDto) {
    const { studentId } = data;
    const degreeDetailsSet = [];
    const studentDegreeStates: DegreeState[] =
      await this.prisma.degreeState.findMany({
        where: {
          studentId: studentId,
        },
      });
    const degreeIds = studentDegreeStates.map((state) => {
      return { id: state.degreeId };
    });
    for (const degreeId of degreeIds) {
      const degreeDetails = await this.http
        .get(`https://cosn-gateway.brenosalles.workers.dev/degrees/${degreeId.id}`)
        .toPromise();
      degreeDetailsSet.push(degreeDetails.data);
    }
    return degreeDetailsSet;
  }

  async getStudentById(id: number): Promise<Student> {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async courseEditionCreated(
    data: CourseEditionIdMessageDto,
  ): Promise<CourseEditionId> {
    const { courseEditionId } = data;
    return this.prisma.courseEditionId.create({
      data: {
        courseEditionId,
      },
    });
  }

  async courseEditionDelete(
    data: CourseEditionIdMessageDto,
  ): Promise<CourseEditionId> {
    const { courseEditionId } = data;
    return this.prisma.courseEditionId.delete({
      where: {
        courseEditionId,
      },
    });
  }

  async appealEnroll(data: AppealEnrollMessageDto): Promise<SuccessMessage> {
    const enrollment = this.academicRecordClient.send(
      Topics.CREATE_APPEAL_ENROLLMENT,
      data,
    );
    if (enrollment) {
      return new CustomSuccessMessage(
        EHttpStatus.OK,
        'Appeal Enroll Success',
      ).toJSON();
    }
  }
  async onModuleInit() {
    this.academicRecordClient.subscribeToResponseOf(
      Topics.CREATE_APPEAL_ENROLLMENT,
    );
  }
}

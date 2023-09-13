import { QuitDegreeRequestDto } from 'src/dto/quitDegreeRequest.dto';
import { StartDegreeRequestDto } from 'src/dto/startDegreeRequest.dto';
import Topics from 'src/enums/topics.enum';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EnrollCourseEditionRequestDto } from '../dto/enrollCourseEditionRequest.dto';
import { CreateAppealEnrollRequestDto } from 'src/dto/createAppealEnroll.dto';
import { StudentDto } from 'src/dto/student.message.dto';
import { StudentIdRequestDto } from 'src/dto/studentIdRequest.dto';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENTS_MICROSERVICE')
    private readonly studentsClient: ClientKafka,
  ) {}
  startDegree(data: StartDegreeRequestDto): Observable<any> {
    const result = this.studentsClient.send(
      Topics.STUDENT_START_DEGREE,
      JSON.stringify(data),
    );
    return result;
  }
  freezeEnrollment(data: StartDegreeRequestDto): Observable<any> {
    return this.studentsClient.send(
      Topics.STUDENT_FREEZE_ENROLLMENT,
      JSON.stringify(data),
    );
  }
  quitDegree(data: QuitDegreeRequestDto): Observable<any> {
    const parsedataToInt = {
      studentId: parseInt(data.studentId),
      degreeId: data.degreeId,
    };
    return this.studentsClient.send(
      Topics.STUDENT_QUIT_DEGREE,
      JSON.stringify(parsedataToInt),
    );
  }
  createAppealEnroll(data: CreateAppealEnrollRequestDto): Observable<any> {
    return this.studentsClient.send(
      Topics.CREATE_APPEAL_ENROLLMENT,
      JSON.stringify(data),
    );
  }

  saveStudent(data: StudentDto): Observable<any> {
    return this.studentsClient.send(
      Topics.STUDENT_CREATE,
      JSON.stringify(data),
    );
  }

  getStudentFiltered(data: any): Observable<any> {
    return this.studentsClient.send(Topics.STUDENT_GET, JSON.stringify(data));
  }

  deleteStudent(data: any): Observable<any> {
    return this.studentsClient.send(
      Topics.STUDENT_DELETE,
      JSON.stringify(data),
    );
  }

  updateStudent(data: any): Observable<any> {
    return this.studentsClient.send(
      Topics.STUDENT_UPDATE,
      JSON.stringify(data),
    );
  }

  getStudentDegrees(data: StudentIdRequestDto): Observable<any> {
    const parsedataToInt = {
      studentId: parseInt(data.studentId),
    };
    return this.studentsClient.send(
      Topics.STUDENT_GET_DEGREES,
      JSON.stringify(parsedataToInt),
    );
  }

  enrollCourseEdition(data: EnrollCourseEditionRequestDto): Observable<any> {
    const result = this.studentsClient.send(
      Topics.STUDENT_ENROLL_COURSE_EDITION,
      JSON.stringify(data),
    );
    return result;
  }
  async onModuleInit() {
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_GET);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_START_DEGREE);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_FREEZE_ENROLLMENT);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_QUIT_DEGREE);
    this.studentsClient.subscribeToResponseOf(
      Topics.STUDENT_ENROLL_COURSE_EDITION,
    );
    this.studentsClient.subscribeToResponseOf(Topics.CREATE_APPEAL_ENROLLMENT);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_CREATE);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_DELETE);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_UPDATE);
    this.studentsClient.subscribeToResponseOf(Topics.STUDENT_GET_DEGREES);
  }
}

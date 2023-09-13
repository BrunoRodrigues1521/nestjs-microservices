import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CertificateRequestDto } from 'src/dto/certificateRequest.dto';
import Topics from 'src/enums/topics.enum';
import { GetAcademicRecordsMessageDto } from 'src/dto/getAcademicRecords.message.dto';
import { GetStudentsResultsMessageDto } from '../dto/getStudentsResults.message.dto';

@Injectable()
export class AcademiRecordsService {
  constructor(
    @Inject('ACADEMIC_RECORDS_MICROSERVICE')
    private readonly academicRecordsClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getStudentCertificates(data: any): Observable<any> {
    const parsedataToInt = {
      studentId: parseInt(data.studentId),
    };

    return this.academicRecordsClient.send(
      Topics.GET_CERTIFICATE,
      JSON.stringify(parsedataToInt),
    );
  }

  getStudentExams(data: any): Observable<any> {
    const parsedataToInt = {
      studentId: parseInt(data.studentId),
    };

    return this.academicRecordsClient.send(
      Topics.GET_EXAMS,
      JSON.stringify(parsedataToInt),
    );
  }

  createStudentCertificates(data: CertificateRequestDto) {
    return this.academicRecordsClient.send(
      Topics.ADD_CERTIFICATE,
      JSON.stringify(data),
    );
  }
  getAcademicRecords(data: GetAcademicRecordsMessageDto): Observable<any> {
    const parsedataToInt = {
      studentId: parseInt(data.studentId),
      courseEditionId: parseInt(data.courseEditionId),
    };
    return this.academicRecordsClient.send(
      Topics.GET_ACADEMIC_RECORDS,
      JSON.stringify(parsedataToInt),
    );
  }

  getStudentsResults(data: GetStudentsResultsMessageDto): Observable<any> {
    const parsedataToInt = {
      courseEditionId: parseInt(data.courseEditionId),
    };
    return this.academicRecordsClient.send(
      Topics.GET_STUDENT_RESULTS,
      JSON.stringify(parsedataToInt),
    );
  }
  gradesByStudent(data: any): Observable<any> {
    return this.academicRecordsClient.send(
      Topics.GRADE_BY_STUDENT,
      JSON.stringify(data),
    );
  }
  getStudentMessageDto;
  async onModuleInit() {
    this.academicRecordsClient.subscribeToResponseOf(Topics.ADD_CERTIFICATE);
    this.academicRecordsClient.subscribeToResponseOf(Topics.GET_CERTIFICATE);
    this.academicRecordsClient.subscribeToResponseOf(Topics.GET_EXAMS);
    this.academicRecordsClient.subscribeToResponseOf(
      Topics.GET_ACADEMIC_RECORDS,
    );
    this.academicRecordsClient.subscribeToResponseOf(
      Topics.GET_STUDENT_RESULTS,
    );
    this.academicRecordsClient.subscribeToResponseOf(Topics.GRADE_BY_STUDENT);
  }
}

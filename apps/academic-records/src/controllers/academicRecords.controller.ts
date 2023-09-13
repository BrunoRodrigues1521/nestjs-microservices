import Topics from 'src/enums/topics.enum';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AcademicRecordService } from '../services/academicRecord.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CertificateMessageDto } from '../dto/messages/certificate.message.dto';
import AppealEnrollMessageDto from 'src/dto/appealEnrollement.message.dto';
import { GetCertificateDto } from 'src/dto/messages/GetCertificate.message.dto';
import { GetExamsDto } from 'src/dto/messages/GetExams.message.dto';
import { GetAcademicRecordsDto } from '../dto/messages/GetAcademicRecords.message.dto';
import { Certificate } from '@prisma/client';
import { GetResultsDto } from 'src/dto/messages/GetResults.message.dto';
import { GradesDto } from 'src/dto/grades.dto';
import { ValidatorService } from 'src/services/validator.service';
import CustomExceptionMessage from 'src/dto/exception.message.dto';
import { EHttpStatus } from 'src/enums/httpStatus.enum';
import { ExamService } from 'src/services/exams.service';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AcademicRecordController {
  constructor(
    private readonly academicRecordService: AcademicRecordService,
    private readonly validate: ValidatorService,
    private readonly examService: ExamService,
  ) {}

  @EventPattern(Topics.NOTIFY_ACADEMIC_RECORDS)
  getHello(): void {
    console.log('student_created');
  }

  @MessagePattern(Topics.GET_CERTIFICATE)
  async getCertificate(data: GetCertificateDto) {
    return this.academicRecordService.getCertificates(data);
  }

  @MessagePattern(Topics.GET_EXAMS)
  async getExams(data: GetExamsDto) {
    return this.examService.getExams(data);
  }

  @MessagePattern(Topics.GET_ACADEMIC_RECORDS)
  async getAcademicRecord(data: GetAcademicRecordsDto) {
    return this.academicRecordService.getAcademicRecords(data);
  }

  @MessagePattern(Topics.GET_STUDENT_RESULTS)
  async getStudentResults(data: GetResultsDto) {
    return this.academicRecordService.getStudentResults(data);
  }

  @MessagePattern(Topics.ADD_CERTIFICATE)
  async certificateCreated(data: CertificateMessageDto): Promise<Certificate> {
    return this.academicRecordService.createCertificate(data);
  }
  @MessagePattern(Topics.CREATE_APPEAL_ENROLLMENT)
  async createAppealEnrollment(data: AppealEnrollMessageDto) {
    return this.examService.createAppealEnrollment(data);
  }

  @MessagePattern(Topics.GRADE_BY_STUDENT)
  async getGradesByStudent(studentId: GradesDto) {
    const exists = await this.validate.verifyStudentID(studentId.studentId);

    if (!exists) {
      return new CustomExceptionMessage(
        EHttpStatus.BAD_REQUEST,
        'Invalid student id',
      ).toJSON();
    }

    return this.academicRecordService.getGradesByStudent(studentId.studentId);
  }
}

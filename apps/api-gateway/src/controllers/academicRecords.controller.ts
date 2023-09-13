import { GetAcademicRecordsMessageDto } from 'src/dto/getAcademicRecords.message.dto';
import { GetExamMessageDto } from './../dto/getExam.message.dto';
import { AcademiRecordsService } from './../services/academicRecords.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CertificateRequestDto } from 'src/dto/certificateRequest.dto';
import { GetCertificateMessageDto } from 'src/dto/getCertificate.message.dto';
import { Observable } from 'rxjs';
import { GetStudentsResultsMessageDto } from 'src/dto/getStudentsResults.message.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AcademicRecordsController {
  constructor(private readonly academicRecordsService: AcademiRecordsService) {}

  @Get('/academicRecord/:studentId/certificates')
  async getStudentCertificates(
    @Param() data: GetCertificateMessageDto,
  ): Promise<Observable<any>> {
    const result = await this.academicRecordsService
      .getStudentCertificates(data)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }
  @Post('/academicRecord/certificate')
  async createStudentCertificate(
    @Body()
    data: CertificateRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.academicRecordsService
      .createStudentCertificates(data)
      .toPromise();

    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Get('/exam/academicRecord/:studentId')
  async getStudentExams(
    @Param() data: GetExamMessageDto,
  ): Promise<Observable<any>> {
    const result = await this.academicRecordsService
      .getStudentExams(data)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Get('/academicRecord/:studentId/courseEdition/:courseEditionId')
  async getAcademicResults(
    @Param() data: GetAcademicRecordsMessageDto,
  ): Promise<Observable<any>> {
    const result = await this.academicRecordsService
      .getAcademicRecords(data)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }
  @Get('/academicRecord/courseEdition/:courseEditionId')
  async getStudentsResults(
    @Param() data: GetStudentsResultsMessageDto,
  ): Promise<Observable<any>> {
    const result = await this.academicRecordsService
      .getStudentsResults(data)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }
  @Get('/grades/:studentId')
  async getGradesByStudent(@Param() studentId: string) {
    return this.academicRecordsService.gradesByStudent(studentId);
  }
}

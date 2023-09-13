import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/app.repository';
import { HttpService } from '@nestjs/axios';
import { GetExamsDto } from 'src/dto/messages/GetExams.message.dto';
import { AcademicRecord, Exam } from '@prisma/client';
import AppealEnrollMessageDto from 'src/dto/appealEnrollement.message.dto';
import { AcademicRecordService } from './academicRecord.service';

@Injectable()
export class ExamService {
  constructor(
    private prisma: PrismaService,
    private readonly academicRecordService: AcademicRecordService,
  ) {}

  async getExams(data: GetExamsDto) {
    const { studentId } = data;
    const examsResultSet: Exam[] = [];
    const academicRecords: AcademicRecord[] =
      await this.academicRecordService.findAllAcademicRecords(studentId);
    for (const record of academicRecords) {
      const examIdList = record.examId;
      for (const examId of examIdList) {
        const exam = await this.prisma.exam.findUnique({
          where: {
            id: examId,
          },
        });
        examsResultSet.push(exam);
      }
    }

    return examsResultSet;
  }
  createAppealEnrollment(data: AppealEnrollMessageDto): Promise<any> {
    return this.academicRecordService.updateAllAcademicRecords(data);
  }
}

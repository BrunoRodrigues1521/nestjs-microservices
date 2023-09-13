import { AcademicRecord, Exam, Certificate } from '@prisma/client';
import { PrismaService } from '../repository/app.repository';
import { Injectable } from '@nestjs/common';

import { CertificateMessageDto } from 'src/dto/messages/certificate.message.dto';
import AppealEnrollMessageDto from '../dto/appealEnrollement.message.dto';
import { HttpService } from '@nestjs/axios';
import { GetCertificateDto } from 'src/dto/messages/GetCertificate.message.dto';
import { GetExamsDto } from 'src/dto/messages/GetExams.message.dto';
import { GetAcademicRecordsDto } from '../dto/messages/GetAcademicRecords.message.dto';
import { GetResultsDto } from '../dto/messages/GetResults.message.dto';

@Injectable()
export class AcademicRecordService {
  async getStudentResults(data: GetResultsDto) {
    const { courseEditionId } = data;
    return this.prisma.academicRecord.findMany({
      where: {
        courseEditionId: courseEditionId,
      },
    });
  }
  constructor(private prisma: PrismaService, private http: HttpService) { }

  async getAcademicRecords(
    data: GetAcademicRecordsDto,
  ): Promise<AcademicRecord[]> {
    const { studentId, courseEditionId } = data;
    console.log(studentId);
    return await this.prisma.academicRecord.findMany({
      where: {
        studentId: studentId,
        courseEditionId: courseEditionId,
      },
    });
  }

  async getCertificates(data: GetCertificateDto): Promise<Certificate[]> {
    const { studentId } = data;
    const certificatesResultSet: Certificate[] = [];
    const academicRecord: AcademicRecord[] =
      await this.prisma.academicRecord.findMany({
        where: {
          studentId: studentId,
        },
      }); // array of academic records
    console.log(academicRecord);
    for (const record of academicRecord) {
      const certificateIdsArray = record.certificateId; // array of certificate ids
      for (const certificateId of certificateIdsArray) {
        const certificate = await this.prisma.certificate.findUnique({
          where: {
            id: certificateId,
          },
        });
        certificatesResultSet.push(certificate);
      }
    }
    return certificatesResultSet;
  }

  async createCertificate(data: CertificateMessageDto): Promise<Certificate> {
    const { studentId, degreeId, facultyId } = data;

    const getStudentName = await this.http
      .get(`http://35.180.128.163:3000/students?id=${studentId}`)
      .toPromise();
    const getDegreeName = await this.http
      .get(`https://cosn-gateway.brenosalles.workers.dev/degrees/${degreeId}`)
      .toPromise();
    const getInstitutionName = await this.http
      .get(`https://cosn-gateway.brenosalles.workers.dev/faculty/${facultyId}/`)
      .toPromise();

    return this.prisma.certificate.create({
      data: {
        name: getStudentName.data[0].name,
        courseYear: new Date().getFullYear(),
        degreeName: getDegreeName.data.name,
        institutionName: getInstitutionName.data.name,
      },
    });
  }

  getGradesByStudent(studentId: string): Promise<any> {
    const id = parseInt(studentId);

    return this.prisma.academicRecord.findMany({
      where: {
        studentId: id,
      },
      select: {
        studentId: true,
        courseEditionId: true,
        classGrade: true,
        finalGrade: true,
      },
    });
  }

  updateAllAcademicRecords(data: AppealEnrollMessageDto): Promise<any> {
    const { studentId, examId, courseEditionId } = data;
    return this.prisma.academicRecord.updateMany({
      where: {
        studentId: studentId,
        courseEditionId: courseEditionId,
      },
      data: {
        examId: { push: examId },
      },
    });
  }
  
  findAllAcademicRecords(studentId: number): Promise<AcademicRecord[]> {
    return this.prisma.academicRecord.findMany({
      where: {
        studentId: studentId,
      },
    });
  }
}

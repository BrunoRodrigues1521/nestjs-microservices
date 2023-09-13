import { StartDegreeMessageDto } from 'src/dto/messages/startDegree.message.dto';
import { PrismaService } from '../repository/app.repository';
import CourseEditionMessageDto from '../dto/messages/courseEdition.message.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  PrismaPromise,
  Student,
  DegreeId,
  DegreeState,
  CourseEditionId,
} from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { DegreeIdKeyValue } from 'src/dto/messages/degreeIdKeyValue.dto';
import { StudentService } from './student.service';

@Injectable()
export class StudentCourseEditionService {
  constructor(
    private readonly studentService: StudentService,
    private prisma: PrismaService,
    private http: HttpService,
  ) { }

  async startDegree(data: StartDegreeMessageDto): Promise<Student> {
    const { studentId, degreeId } = data;
    const startDegree = await this.prisma.degreeState.create({
      data: {
        studentId,
        degreeId,
        state: '1',
      },
    });
    return this.prisma.student.update({
      where: {
        id: startDegree.studentId,
      },
      data: {
        degreeStateId: {
          push: startDegree.id,
        },
      },
    });
  }

  async updateDegreeIds(data: DegreeIdKeyValue): Promise<DegreeId> {
    const { key, degreeId } = data;
    if (key === 'created') {
      return this.prisma.degreeId.create({
        data: {
          degreeId: degreeId,
        },
      });
    }
    return this.prisma.degreeId.delete({
      where: {
        degreeId,
      },
    });
  }

  async freezeEnrollment(data: StartDegreeMessageDto): Promise<any> {
    const { studentId, degreeId } = data;
    return this.prisma.degreeState.updateMany({
      where: {
        studentId: studentId,
        degreeId: degreeId,
      },
      data: {
        state: '2',
      },
    });
  }

  async quitDegree(data: StartDegreeMessageDto): Promise<Student> {
    const { studentId, degreeId } = data;
    const student = await this.studentService.getStudentById(studentId);
    const quitDegree = await this.prisma.degreeState.findMany({
      where: {
        studentId: studentId,
        degreeId: degreeId,
      },
    });

    const deleteStateId = student.degreeStateId.filter(
      (id) => id !== quitDegree[0].id,
    );
    await this.prisma.student.update({
      where: {
        id: quitDegree[0].studentId,
      },
      data: {
        degreeStateId: {
          set: deleteStateId,
        },
      },
    });
    await this.prisma.degreeState.delete({
      where: {
        id: quitDegree[0].id,
      },
    });
    return this.studentService.getStudentById(studentId);
  }

  async enrollCourseEdition(data: CourseEditionMessageDto): Promise<Student> {
    const { studentId, courseEditionId } = data;
    return this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        courseEditionId: {
          push: courseEditionId,
        },
      },
    });
  }
}

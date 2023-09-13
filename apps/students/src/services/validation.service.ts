import {
  DegreeId,
  Student,
  CourseEditionId,
  DegreeState,
} from '@prisma/client';
import { PrismaService } from './../repository/app.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  constructor(private prisma: PrismaService) {}

  async validateStudentId(studentId: number): Promise<boolean> {
    const student: Student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    return student ? true : false;
  }

  async validateDegreeId(degreeId: string): Promise<boolean> {
    const degree: DegreeId = await this.prisma.degreeId.findUnique({
      where: {
        degreeId: degreeId,
      },
    });
    return degree ? true : false;
  }
  async validateCourseEditionId(courseEditionId: number): Promise<boolean> {
    const courseEdition: CourseEditionId =
      await this.prisma.courseEditionId.findUnique({
        where: {
          id: courseEditionId,
        },
      });
    return courseEdition ? true : false;
  }
  async validateDegreeStateId(
    degreeStateId: number,
    studentId: number,
  ): Promise<boolean> {
    const degreeState: DegreeState = await this.prisma.degreeState.findFirst({
      where: {
        id: degreeStateId,
        studentId,
      },
    });

    if (degreeState.studentId !== studentId) {
      return false;
    }

    return degreeState ? true : false;
  }

  async validateDegreeStates(
    degreeStateIds: number[],
    studentId: number,
  ): Promise<boolean> {
    const degreeStates: DegreeState[] = await this.prisma.degreeState.findMany({
      where: {
        id: {
          in: degreeStateIds,
        },
        studentId,
      },
    });

    if (degreeStates.length !== degreeStateIds.length) {
      return false;
    }

    return degreeStates ? true : false;
  }
}

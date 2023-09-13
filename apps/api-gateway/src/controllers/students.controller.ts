import { Observable } from 'rxjs';
import { StudentsService } from './../services/students.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  HttpException,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { StartDegreeRequestDto } from 'src/dto/startDegreeRequest.dto';
import { QuitDegreeRequestDto } from 'src/dto/quitDegreeRequest.dto';
import { CreateAppealEnrollRequestDto } from 'src/dto/createAppealEnroll.dto';
import {
  StudentDeleteDto,
  StudentDto,
  StudentFilterDto,
  StudentUpdateDto,
} from 'src/dto/student.message.dto';
import { StudentIdRequestDto } from 'src/dto/studentIdRequest.dto';
import { EnrollCourseEditionRequestDto } from '../dto/enrollCourseEditionRequest.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/students')
  async saveStudent(@Body() data: StudentDto): Promise<Observable<any>> {
    const result = await this.studentsService.saveStudent(data).toPromise();

    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Get('/students')
  async getStudentFiltered(
    @Query() query: StudentFilterDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService
      .getStudentFiltered(query)
      .toPromise();

    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Delete('/students')
  async deleteStudent(
    @Query() query: StudentDeleteDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService.deleteStudent(query).toPromise();

    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Patch('/students')
  async updateStudent(
    @Body() data: StudentUpdateDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService.updateStudent(data).toPromise();

    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Get('/student/:studentId/degrees')
  async getStudentDegrees(
    @Param() params: StudentIdRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService
      .getStudentDegrees(params)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Post('/student/degree')
  async startDegree(
    @Body() body: StartDegreeRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService.startDegree(body).toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Patch('/student/degree')
  async freezeEnrollment(
    @Body() body: StartDegreeRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService
      .freezeEnrollment(body)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Delete('/student/:studentId/degree/:degreeId')
  async quitDegree(
    @Param() params: QuitDegreeRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService.quitDegree(params).toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Post('/exam')
  async createAppealEnroll(
    @Body() body: CreateAppealEnrollRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService
      .createAppealEnroll(body)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }

  @Post('/student/course')
  async enrollCourseEdition(
    @Body() body: EnrollCourseEditionRequestDto,
  ): Promise<Observable<any>> {
    const result = await this.studentsService
      .enrollCourseEdition(body)
      .toPromise();
    if (result?.error) {
      throw new HttpException(result.error, result.statusCode);
    }
    return result;
  }
}

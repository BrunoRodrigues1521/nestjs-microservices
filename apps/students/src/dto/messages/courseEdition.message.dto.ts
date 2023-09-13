import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CourseEditionMessageDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CourseEditionIdMessageDto {
  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;
}

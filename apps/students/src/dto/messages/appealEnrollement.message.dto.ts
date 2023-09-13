import { IsNotEmpty, IsNumber } from 'class-validator';

export default class AppealEnrollMessageDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;

  @IsNotEmpty()
  @IsNumber()
  examId: number;
}

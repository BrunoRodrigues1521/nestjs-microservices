import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppealEnrollRequestDto {
  @IsNotEmpty()
  @IsNumber()
  examId: number;

  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class EnrollCourseEditionRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly courseEditionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number;
}

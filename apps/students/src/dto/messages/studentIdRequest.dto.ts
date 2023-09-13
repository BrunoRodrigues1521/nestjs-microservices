import { IsNotEmpty, IsNumber } from 'class-validator';

export class StudentIdRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAcademicRecordsDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;
}

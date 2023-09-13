import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetExamsDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}

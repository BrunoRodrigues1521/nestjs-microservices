import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StartDegreeMessageDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  degreeId: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class GetAcademicRecordsMessageDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;
  @IsNotEmpty()
  @IsString()
  courseEditionId: string;
}

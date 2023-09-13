import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CertificateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  degreeId: string;

  @IsNotEmpty()
  @IsNumber()
  facultyId: number;
}

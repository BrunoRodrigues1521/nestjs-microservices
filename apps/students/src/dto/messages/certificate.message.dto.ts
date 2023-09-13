import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CertificateMessageDto {
  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsString()
  degreeId: string;

  @IsNotEmpty()
  @IsNumber()
  facultyId: number;
}

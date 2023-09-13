import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CertificateRequestDto {
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

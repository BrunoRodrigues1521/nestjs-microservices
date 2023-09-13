import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCertificateDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}

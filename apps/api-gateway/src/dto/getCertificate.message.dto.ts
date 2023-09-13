import { IsNotEmpty, IsString } from 'class-validator';

export class GetCertificateMessageDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;
}

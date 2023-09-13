import { IsNotEmpty, IsString } from 'class-validator';

export class GetExamMessageDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;
}

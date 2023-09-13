import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudentIdRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly studentId: string;
}

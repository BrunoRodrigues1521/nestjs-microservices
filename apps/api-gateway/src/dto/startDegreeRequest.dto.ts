import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StartDegreeRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly degreeId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class QuitDegreeRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly degreeId: string;

  @IsNotEmpty()
  @IsString()
  readonly studentId: string;
}

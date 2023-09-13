import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DegreeIdDto {
  @IsNotEmpty()
  @IsString()
  degreeId: string;
}

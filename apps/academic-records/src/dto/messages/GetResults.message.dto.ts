import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetResultsDto {
  @IsNotEmpty()
  @IsNumber()
  courseEditionId: number;
}

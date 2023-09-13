import { IsNotEmpty, IsString } from 'class-validator';

export class GetStudentsResultsMessageDto {
  @IsNotEmpty()
  @IsString()
  courseEditionId: string;
}

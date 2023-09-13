import { IsNotEmpty, IsString } from 'class-validator';

export class LogMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}

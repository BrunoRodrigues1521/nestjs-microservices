import { IsNotEmpty, IsString } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly version: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;
}

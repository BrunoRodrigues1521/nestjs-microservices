import { IsNotEmpty, IsString } from "class-validator";

export class GradesDto {
  @IsString()
  @IsNotEmpty()
  readonly studentId: string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class DegreeIdKeyValue {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  degreeId: string;
}

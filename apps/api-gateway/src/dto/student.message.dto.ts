import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @MaxLength(1)
  @IsUppercase()
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly adress: string;

  @IsDateString()
  @IsNotEmpty()
  readonly birthDate: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(1)
  @IsUppercase()
  @IsNotEmpty()
  readonly civilStatus: string;

  @IsString()
  @MaxLength(8)
  @MinLength(8)
  @IsNotEmpty()
  readonly ccNumber: string;

  @IsString()
  @MaxLength(9)
  @MinLength(9)
  @IsNotEmpty()
  readonly nifNumber: string;
}

export class StudentFilterDto {
  @IsOptional()
  readonly id: string;

  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly age: number;

  @IsOptional()
  readonly gender: string;

  @IsOptional()
  readonly adress: string;

  @IsOptional()
  readonly birthDate: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly civilStatus: string;

  @IsOptional()
  readonly ccNumber: string;

  @IsOptional()
  readonly nifNumber: string;
}

export class StudentDeleteDto {
  @IsString()
  @IsNotEmpty()
  readonly studentId: any;
}

export class StudentUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  readonly studentId: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @MaxLength(1)
  @IsUppercase()
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly adress: string;

  @IsDateString()
  @IsNotEmpty()
  readonly birthDate: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(1)
  @IsUppercase()
  @IsNotEmpty()
  readonly civilStatus: string;

  @IsString()
  @MaxLength(8)
  @MinLength(8)
  @IsNotEmpty()
  readonly ccNumber: string;

  @IsString()
  @MaxLength(9)
  @MinLength(9)
  @IsNotEmpty()
  readonly nifNumber: string;

  @IsArray()
  readonly degreeStateId: number[];
}

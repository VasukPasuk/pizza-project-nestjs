import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class BaseUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @MinLength(64)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  activation_link: string

  @IsBoolean()
  activated: boolean
}
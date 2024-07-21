import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";


export class LoginUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @IsNotEmpty()
  @IsOptional()
  login: string

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(64)
  password: string
}
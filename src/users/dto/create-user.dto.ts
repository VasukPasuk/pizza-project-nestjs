import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto
{
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
}

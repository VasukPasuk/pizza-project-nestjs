import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(64)
  password: string;
}

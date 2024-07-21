import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";


export class FindUserDto {
  @IsString()
  @IsOptional()
  @IsEmail()
  email:string

  @IsOptional()
  @IsString()
  login:string
}
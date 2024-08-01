import {IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator";
import {Size, CaloriesStage} from "@prisma/client";

export class CreateAddOptionDto {
  @IsString()
  pizza_name: string

  @IsString()
  @IsEnum(Size)
  size: Size

  @IsNumber()
  @IsPositive()
  weight: number

  @IsNumber()
  @IsPositive()
  calories: number

  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  @IsEnum(CaloriesStage)
  calories_stage: CaloriesStage
}
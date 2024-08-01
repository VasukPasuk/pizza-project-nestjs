import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {HotStage} from "../../_constants/enums";
import {Type} from "class-transformer";

export class CreatePizzaDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  category_name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  discount: number

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  average_cooking_speed: number


  @IsNotEmpty()
  @IsEnum(HotStage)
  hot_stage: HotStage


  @IsNotEmpty()
  @IsString()
  country: string
}

import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  pizza_name: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  user_id: number
}

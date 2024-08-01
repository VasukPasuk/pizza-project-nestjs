import {PartialType} from "@nestjs/mapped-types";
import {CreateAddOptionDto} from "./create-add-option.dto";
// import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class UpdateAddOptionDto extends PartialType(CreateAddOptionDto) {
  // @IsNumber()
  // @IsNotEmpty()
  // @IsPositive()
  // id: number
}
import {BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CreateAddOptionDto} from "./dto/create-add-option.dto";
import {UpdateReviewDto} from "../reviews/dto/update-review.dto";
import {Size} from "@prisma/client";

@Injectable()
export class AdditionalOptionsService {
  constructor(readonly prisma: PrismaService) {
  }

  async createAddOption(createAddOptionDto: CreateAddOptionDto) {
    const {size} = createAddOptionDto;
    const isExists = await this.prisma.additional_Options.findFirst({
      where: {size}
    })
    if (isExists) {
      throw new BadRequestException(`Pizza additional option with ${size.toLowerCase()} already exists`);
    }
    return this.prisma.additional_Options.create({
      data: {
        ...createAddOptionDto
      }
    })
  }

  async updateAddOption(id: number, updateReviewDto: UpdateReviewDto) {
    const result = await this.prisma.additional_Options.update({
      where: {id},
      data: updateReviewDto
    })
    if (!result) {
      throw new BadRequestException("Error updating additional options");
    }
    return result;
  }

  async getAllAddOptionsOfPizza(name: string) {
    return this.prisma.additional_Options.findMany({
      where: {pizza_name: {equals: name, mode: "insensitive"}},
    })
  }

  async getByPizzaNameAndSize(name: string, size: Size) {
    return this.prisma.additional_Options.findFirst({
      where: {pizza_name: {equals: name, mode: "insensitive"}, size: size.toUpperCase() as Size},
    })
  }

  async deleteAddOptionById(id: number) {
    return this.prisma.additional_Options.delete({where: {id}})
  }

  async deleteAllAddOptions() {
    return this.prisma.additional_Options.deleteMany()
  }

  async deleteAllAddOptionsOfPizza(name: string) {
    return this.prisma.additional_Options.deleteMany({
      where: {
        pizza_name: name
      }
    })
  }

  async deleteSpecificOptionsOfPizza(name: string, size: Size) {
    return this.prisma.additional_Options.deleteMany({
      where: {
        pizza_name: name,
        size: size
      }
    })
  }

  async updateWholeOptionById(id: number, createAddOptionDto: CreateAddOptionDto) {
    return this.prisma.additional_Options.update({
      where: {id},
      data: createAddOptionDto
    })
  }
}
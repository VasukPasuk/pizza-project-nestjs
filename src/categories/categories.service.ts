import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma:PrismaService) {
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const new_category = await this.prisma.category.create({data: createCategoryDto})
    if (!new_category) throw new BadRequestException
    return new_category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany()
    if (!categories) throw new NotFoundException
    return categories;
  }

  async findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

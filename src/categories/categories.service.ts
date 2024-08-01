import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {PrismaService} from "../prisma.service";
import {IUser} from "../_interfaces";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const new_category = await this.prisma.category.create({data: createCategoryDto})
    if (!new_category) throw new BadRequestException
    return new_category;
  }

  async createMany(categories: Array<CreateCategoryDto>) {
    return this.prisma.category.createMany({data: categories})
  }

  async findAll() {
    const categories = await this.prisma.category.findMany()
    if (!categories) throw new NotFoundException
    return categories;
  }

  async findOneByName(name: string) {
    return this.prisma.category.findUnique({where: {name: name}})
  }

  async update(name: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({where: {name: name}, data: updateCategoryDto})
  }

  async removeByName(name: string) {
    return this.prisma.category.delete({where: {name: name}})
  }

  async removeAll() {
    return this.prisma.category.deleteMany();
  }
}

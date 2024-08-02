import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePizzaDto} from './dto/create-pizza.dto';
import {UpdatePizzaDto} from './dto/update-pizza.dto';
import {PrismaService} from "../prisma.service";
import {CategoriesService} from "../categories/categories.service";
import {GetWithQueriesDto} from "./dto/get-with-queries.dto";
import {AdditionalOptionsService} from "./add-options.service";

@Injectable()
export class PizzaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoriesService,
    private readonly additionalOptionsService:AdditionalOptionsService
  ) {
  }

  async create(pizzaDto: CreatePizzaDto, image: string) {
    const {category_name} = pizzaDto;
    const existCategory = await this.categoryService.findOneByName(category_name);
    if (!existCategory) {
      throw new NotFoundException(`Category ${category_name} not found`);
    }

    const pizza = await this.prisma.pizza.create({data: {...pizzaDto, image: image}})

    if (!pizza) throw new BadRequestException("Oops, we couldn't create pizza");

    return pizza
  }

  getAll() {
    return `This action returns all pizza`;
  }

  getOneByName(name: string) {
    return this.prisma.pizza.findUnique({where: {name}})
  }

  update(name: string, updatePizzaDto: UpdatePizzaDto) {
    return this.prisma.pizza.update({where: {name: name}, data: updatePizzaDto})
  }

  removeOneByName(name: string) {
    return this.prisma.pizza.delete({where: {name: name}})
  }

  removeAll() {
    return this.prisma.pizza.deleteMany();
  }

  async getOneByNameAndWith(name: string, getWithQueriesDto: GetWithQueriesDto) {
    return this.prisma.pizza.findUnique({where: {name: name}, include: {...getWithQueriesDto}});
  }

  async getAllByCategory(category: string) {
    return this.prisma.pizza.findMany({where: {category_name: category}});
  }
}

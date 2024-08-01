import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Category")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Post('many')
  async createMany(@Body() createCategoryDtoList: Array<CreateCategoryDto>) {
    return this.categoriesService.createMany(createCategoryDtoList);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    const category = await this.categoriesService.findOneByName(name);
    return this.categoriesService.findOneByName(name);
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.categoriesService.removeByName(name);
  }

  @Delete()
  async removeAll() {
    return this.categoriesService.removeAll();
  }
}

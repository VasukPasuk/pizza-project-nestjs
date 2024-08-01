import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException, Put
} from '@nestjs/common';
import {PizzaService} from './pizza.service';
import {CreatePizzaDto} from './dto/create-pizza.dto';
import {UpdatePizzaDto} from './dto/update-pizza.dto';
import {FilesService} from "../files/files.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType} from "../_constants/enums";
import {CategoriesService} from "../categories/categories.service";
import {GetWithQueriesDto} from "./dto/get-with-queries.dto";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAddOptionDto} from "./dto/create-add-option.dto";
import {Pizza, Size} from "@prisma/client";
import {AdditionalOptionsService} from "./add-options.service";
import {UpdateAddOptionDto} from "./dto/update-add-option.dto";


@ApiTags("Pizza")
@Controller('pizza')
export class PizzaController {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly fileService: FilesService,
    private readonly categoryService: CategoriesService,
    private readonly additionalOptionsService: AdditionalOptionsService
  ) {
  }


  @ApiOperation({summary: 'Створення піци', description: 'Створення екземпляру піци в БД'})
  @ApiBody({type: CreatePizzaDto, description: "test", required: true})
  @Post()
  @UseInterceptors(FileInterceptor('pizza_image'))
  create(
    @Body() createPizzaDto: CreatePizzaDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const [fileName] = this.fileService.upload(file, FileType.PIZZA);
    return this.pizzaService.create(createPizzaDto, fileName);
  }


  @ApiOperation({
    summary: 'Get specific pizza with selected related entities or without them',
    description: 'Retrieves the specific pizza with selected related entities or without them'
  })
  @ApiParam({name: 'name', description: 'Pizza name', type: 'string'})
  @ApiQuery({
    name: 'category',
    description: 'Select category boolean query',
    type: 'boolean',
    example: 'true',
    required: false
  })
  @ApiQuery({
    name: 'Review',
    description: 'Select Review boolean query',
    type: 'boolean',
    example: 'true',
    required: false
  })
  @Get(':name')
  getPizzaByName(@Param('name') name: string, @Query() getWithQueriesDto: GetWithQueriesDto) {
    const pizzaName = name.charAt(0).toUpperCase() + name.slice(1)
    if (getWithQueriesDto) {
      return this.pizzaService.getOneByNameAndWith(pizzaName, getWithQueriesDto)
    }
    return this.pizzaService.getOneByName(pizzaName);
  }


  @Get()
  findAll() {
    return this.pizzaService.getAll();
  }


  async getAllAdditionalOptions() {
    // return this.additionalOptionsService.
  }

  async getAdditionalOptionsOfPizza() {
    // return this.additionalOptionsService.
  }


  @ApiParam({name: 'name', description: 'Pizza name', type: 'string'})
  @ApiBody({type: UpdatePizzaDto})
  @Patch(':name')
  update(@Param('name') name: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzaService.update(name, updatePizzaDto);
  }


  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.pizzaService.removeOneByName(name);
  }


  @Delete('')
  removeAll() {
    return this.pizzaService.removeAll();
  }


  // ADDITION OPTIONS CONTROLLER METHODS

  @ApiOperation({
    summary: "Створення додаткових опцій піци",
    description: "POST обробник, який створює додаткову опцію для конкретної піци"
  })
  @Post("additional")
  async createAddOption(@Body() createAddOptionDto: CreateAddOptionDto) {
    const createdOpt = await this.additionalOptionsService.createAddOption(createAddOptionDto);
    if (!createdOpt) {
      throw new BadRequestException()
    }
    return createdOpt
  }

  @Put("additional/:id") // Process PUT http://localhost/pizza/additional/{id}
  async updateWholeAdditionalOptions (@Param('id') id: number) {
    return this.additionalOptionsService.deleteAddOptionById(id)
  }

  @Patch("additional/:id") // Process PATCH http://localhost/pizza/additional/{id}
  async updateAdditionalOption(@Body() updateAddOptionDto: UpdateAddOptionDto, @Param('id') id: number) {
    return this.additionalOptionsService.updateAddOption(+id, updateAddOptionDto)
  }

  @Get(":name/additional/:size") // Process GET http://localhost/pizza/{name}/additional/{size}
  async getAddOption(@Param('name') name: string, @Param('id') size: Size) {
    return this.additionalOptionsService.getByPizzaNameAndSize(name, size)
  }

  @Delete(':name/additional') // Process DELETE http://localhost/pizza/{name}/additional
  async deleteAllAddOptionsOfPizza(@Param('name') name: string) {
    return this.additionalOptionsService.deleteAllAddOptionsOfPizza(name)
  }

  @Delete('additional') // Process DELETE http://localhost/pizza/additional
  async deleteAllAddOptions() {
    return this.additionalOptionsService.deleteAllAddOptions()
  }

  @Delete(':name/additional/:size') // Process DELETE http://localhost/pizza/{name}/additional/{size}
  async deleteSpecificOptionsOfPizza(@Param('name') name: string, @Param('size') size: Size) {
    return this.additionalOptionsService.deleteSpecificOptionsOfPizza(name, size)
  }
}

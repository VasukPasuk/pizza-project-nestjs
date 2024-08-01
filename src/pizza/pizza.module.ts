import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import {FilesService} from "../files/files.service";
import {PrismaService} from "../prisma.service";
import {CategoriesService} from "../categories/categories.service";
import {AdditionalOptionsService} from "./add-options.service";

@Module({
  controllers: [PizzaController],
  providers: [PizzaService, FilesService, PrismaService, CategoriesService, AdditionalOptionsService],
})
export class PizzaModule {}

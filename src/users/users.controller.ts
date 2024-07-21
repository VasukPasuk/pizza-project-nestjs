import {Controller, Get, Patch, Param, Put, UseGuards, Req, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Request} from "express";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request ) {
    console.log(req.user)

    return this.usersService.findAll();
  }


  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Put()
  update() {

  }

  @Patch()
  updatePartial(){

  }
}

import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FilesService} from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {FileType} from "src/_constants/enums";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("File")
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.filesService.upload(file, FileType.PIZZA)
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  })

  app.setGlobalPrefix('/api')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ));
  const config = new DocumentBuilder()
    .setTitle('Pizza e-commerce back-end')
    .setDescription('Pizza e-commerce API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}

bootstrap()

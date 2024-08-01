import {MiddlewareConsumer, Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PizzaModule } from './pizza/pizza.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import {PrismaService} from "./prisma.service";
import {ConfigModule} from "@nestjs/config";
import {LoggingMiddleware} from "./logging.middleware";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "node:path";

@Module({
  imports: [

    UsersModule,
    AuthModule,
    PizzaModule,
    CategoriesModule,
    ReviewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static', 'pizzas'),
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}

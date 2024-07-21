import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PizzaModule } from './pizza/pizza.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import {PrismaService} from "./prisma.service";
import {ConfigModule} from "@nestjs/config";

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
  ],
  providers: [PrismaService],
})
export class AppModule {}

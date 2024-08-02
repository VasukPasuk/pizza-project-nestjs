import {Injectable} from '@nestjs/common';
import {CreateReviewDto} from './dto/create-review.dto';
import {UpdateReviewDto} from './dto/update-review.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto
    })
  }

  // async update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return this.prisma.review.update({
  //     where: {id},
  //     data: updateReviewDto
  //   });
  // }

  // async deleteById(id: number) {
  //   return this.prisma.review.delete({where: {id}});
  // }


  // async getAll({limit = 10, skip = 0, start = 0}:TestConfig) {
  //   return this.prisma.review.findMany({
  //     skip: skip,
  //     take: limit,
  //   })
  // }
}

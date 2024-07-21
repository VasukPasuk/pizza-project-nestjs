import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PrismaService} from "../prisma.service";
import * as bcrypt from "bcrypt";
import {v4 as uuid} from "uuid"
import {IUser} from "../_interfaces/User.interface";
import {FindUserDto} from "./dto/find-user.dto";
import {USER_SELECT_ID_ROLE_LOGIN} from "../_constants/prismaSelectObjects";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const {login, email, password} = createUserDto;

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt)

    const userWithThisPassword = await this.prisma.user.findFirst({
      where: {
        password: hashedPassword
      }
    })

    if (userWithThisPassword) throw new BadRequestException("User with such password exist.")

    const genActivationLink: string = uuid()

    const user = await this.prisma.user.create({
      data: {
        login,
        email,
        password: hashedPassword,
        activation_link: genActivationLink
      },
      select: {
        role: true,
        login: true,
        id: true
      }
    })

    if (!user) throw new BadRequestException()

    return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    if (!users) throw new BadRequestException()
    return users
  }

  async findOneByEmailOrLogin(findUserDto: FindUserDto):Promise<IUser> {
    const {email, login} = findUserDto;
    return this.prisma.user.findFirst({
      // If email && login returns true, search with EMAIL OR LOGIN,
      // In another case we will search with either of these two fields (login or email)
      where: (email && login) ? {OR: [{email: email}, {login: login}]} : {...findUserDto},
      select: {
        ...USER_SELECT_ID_ROLE_LOGIN,
        password: true
      }
    });
  }

  async findUserById(id: number) {

    const user = await this.prisma.user.findUnique({where: {id: id}})

    if (!user) throw new BadRequestException("User with such ID doesn't exist.")

    return user
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserDto
      }
    })
  }

  async updateByActivateLink(link:string) {
    return this.prisma.user.update({
      where: {
        activation_link: link
      },
      data: {
        activated: true
      }
    })
  }
}

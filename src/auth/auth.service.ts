import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../_interfaces/User.interface";
import {RegUserDto} from "./dto/reg-user.dto";
import * as process from "process";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<IUser> {
    const {password} = loginUserDto;
    const user = await this.usersService.findOneByEmailOrLogin(loginUserDto);

    const validPassword = await bcrypt.compare(password, user.password)

    if (user && validPassword) {
      return {
        id: user.id,
        login: user.login,
        role: user.role,
      }
    }

    throw new UnauthorizedException()
  }

  async login(loginUserDto: LoginUserDto) {

    const user = await this.validateUser(loginUserDto)

    const payload = {
      id: user.id,
      login: user.login,
      role: user.role
    };

    const tokenPair = await this.generateTokenPair(payload)

    return {
      user: payload,
      tokenPair
    };
  }

  async register(regUserDto: RegUserDto) {
    const {login, email, password} = regUserDto;

    const isUserExist = await this.usersService.findOneByEmailOrLogin(regUserDto);

    if (isUserExist) throw new BadRequestException("User with such login or email exists.");


    const newUser = await this.usersService.create({login, email, password})

    if (!newUser) throw new BadRequestException("Something is wrong...");

    const payload = {
      ...newUser
    }

    const tokenPair = await this.generateTokenPair(payload)

    return {
      newUser,
      tokenPair
    }
  }

  async refresh(refreshToken: string) {
    const user:IUser = await this.jwtService.verify(refreshToken)
    return {
      access_token: this.jwtService.sign(user)
    }
  }

  async generateTokenPair(user: any) {
    return {
      access_token: this.jwtService.sign(user),
      refresh_token: this.jwtService.sign(user, {expiresIn: "30d"})
    }
  }

  async activate(link: string) {
    return this.usersService.updateByActivateLink(link)
  }
}

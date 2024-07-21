import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Param,
  Redirect,
  Body,
  Req,
  Res,
  BadRequestException, Patch, Query
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {RegUserDto} from "./dto/reg-user.dto";
import {Response} from "express";
import * as process from "process";
import {LoginUserDto} from "./dto/login-user.dto";
import * as console from "console";
import {Cookies} from "../_decorators/cookies.decorator";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({passthrough: true}) response: Response
  ) {
    const {tokenPair, user} = await this.authService.login(loginUserDto);
    const {access_token, refresh_token} = tokenPair

    response.cookie("refresh-token", refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return {
      user,
      access_token
    }
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @Redirect(process.env.FRONTEND_URL, 200)
  async logout(@Res() res: Response, @Req() req: Request) {
    res.clearCookie("refresh-token")
  }

  @Get('refresh')
  async refresh(@Cookies("refresh-cookie") refreshToken: string) {
    if (!refreshToken) throw new BadRequestException("Refresh token doesn't exist.");
    return this.authService.refresh(refreshToken)
  }

  @Patch('activate/:link')
  @Redirect(process.env.FRONTEND_URL, 200)
  async activate(
    @Param("link") link: string,
  ) {
    console.log(await this.authService.activate(link))
  }

  @Post('register')
  async register(@Res({passthrough: true}) response: Response, @Body() regUserDto: RegUserDto) {
    const {tokenPair, newUser} = await this.authService.register(regUserDto)
    const {refresh_token, access_token} = tokenPair;

    response.cookie("refresh-token", refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    return {
      user: newUser,
      access_token
    };
  }
}

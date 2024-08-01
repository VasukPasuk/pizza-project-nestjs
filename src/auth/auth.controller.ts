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
import {IRegisterResponseSuccess} from "../_interfaces";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Auth")
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

    this.setRefreshTokenCookie(response, refresh_token);

    return {
      user,
      access_token
    }
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response, @Req() req: Request) {
    res.clearCookie("refresh-token")
  }

  @Get('refresh')
  async refresh(@Cookies("refresh-cookie") refreshToken: string) {
    if (!refreshToken) throw new BadRequestException("Refresh token doesn't exist.");
    return this.authService.refresh(refreshToken)
  }

  @Patch('activate/:link')
  async activate(
    @Param("link") link: string,
  ) {
    console.log(await this.authService.activate(link))
  }

  @Post('register')
  async register(
    @Res({passthrough: true}) response: Response,
    @Body() regUserDto: RegUserDto):
    Promise<IRegisterResponseSuccess>
  {
    const {tokenPair, newUser} = await this.authService.register(regUserDto)
    const {refresh_token, access_token} = tokenPair;
    this.setRefreshTokenCookie(response, refresh_token);

    return this.createRegisterResponse(access_token, newUser);
  }


  private setRefreshTokenCookie(response: Response, refreshToken: string): void {
    response.cookie("refresh-token", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
  }

  private createRegisterResponse(accessToken: string, newUser:any): IRegisterResponseSuccess {
    return {
      access_token: accessToken,
      extra: {
        isActivated: newUser.activated
      },
      profile: {
        city: newUser.city,
        district: newUser.disctrict,
        email: newUser.email,
        firstSurname: newUser.first_surname,
        name: newUser.name,
        phone: newUser.phone,
        secondSurname: newUser.second_surname,
        street: newUser.street,
      },
      user: {
        id: newUser.id,
        login: newUser.login,
        role: newUser.role
      },
    };
  }

}

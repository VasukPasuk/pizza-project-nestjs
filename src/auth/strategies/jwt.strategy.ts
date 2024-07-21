import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {IUser} from "../../_interfaces/User.interface";
import * as process from "process";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    });
  }
  // Function that will be called in case success jwt-token, data from jwt token will be passed into the argument
  async validate(payload: any) {
    const {role, login, id} = payload;

    // Returned object will be injected into the request object as a user FIELD
    return {
      role,
      login,
      id
    }
  }
}
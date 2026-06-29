import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log("JwtStrategy constructor called");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MBAOS_SECRET_KEY',
    });
  }

  async validate(payload: any) {
    console.log("JWT PAYLOAD =>", payload);

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
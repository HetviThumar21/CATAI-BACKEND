import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
  ) {}

  @Get('health')
  gethealth() {
    return this.authservice.gethealth();
  }

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authservice.register(
      registerDto,
    );
  }

  @Post('login')
login(
  @Body()
  loginDto: LoginDto,
) {
  console.log(
    'LOGIN DTO:',
    loginDto,
  );

  return this.authservice.login(
    loginDto,
  );
}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(
    @Req() req,
  ) {
    return this.authservice.profile(
      req.user.id,
    );
  }
}
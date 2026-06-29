import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async gethealth() {
    return {
      message: 'auth service working',
    };
  }

  async register(
    registerDto: RegisterDto,
  ) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email: registerDto.email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        registerDto.password,
        10,
      );

    const user =
      await this.prisma.user.create({
        data: {
          fullName: registerDto.fullName,
          email: registerDto.email,
          password: hashedPassword,
        },
      });

    const { password, ...userWithoutPassword } = user;

    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  async login(
    loginDto: LoginDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    console.log('Login Email:', loginDto.email);
console.log('User Found:', user);
console.log('Password From Request:', loginDto.password);
console.log('Password In DB:', user.password);

    const passwordMatched =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );
console.log(
  'Password Matched:',
  passwordMatched,
);

    if (!passwordMatched) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const accessToken =
      this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
  async profile(
  userId: string,
) {
  const user =
    await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    return null;
  }

  const { password, ...userData } =
    user;

  return userData;
}
}
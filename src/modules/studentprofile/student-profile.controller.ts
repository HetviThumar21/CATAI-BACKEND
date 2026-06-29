import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { StudentProfileService } from './student-profile.service';

import { CreateStudentProfileDto } from './dto/create-student-profile.dto';

@Controller('student-profile')
export class StudentProfileController {
  constructor(
    private readonly studentProfileService: StudentProfileService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Body()
    dto: CreateStudentProfileDto,
  ) {
    return this.studentProfileService.create(
      req.user.id,
      dto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req() req,
  ) {
    return this.studentProfileService.findOne(
      req.user.id,
    );
  }
}
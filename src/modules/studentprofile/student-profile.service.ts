import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateStudentProfileDto } from './dto/create-student-profile.dto';

@Injectable()
export class StudentProfileService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateStudentProfileDto,
  ) {
      console.log("PROFILE DTO RECEIVED:", dto);
    return this.prisma.studentprofile.upsert({
      where: {
        userid: userId,
      },

      update: {
        ...dto,
      },

      create: {
        userid: userId,
        ...dto,
      },
    });
  }

  async findOne(
    userId: string,
  ) {
    return this.prisma.studentprofile.findUnique({
      where: {
        userid: userId,
      },
    });
  }
} 
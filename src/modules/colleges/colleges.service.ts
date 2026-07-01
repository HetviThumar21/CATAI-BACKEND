import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollegeDto } from './dto/create-college.dto';

@Injectable()
export class CollegesService {
  constructor(private prisma: PrismaService) {}

  async create(createCollegeDto: CreateCollegeDto) {
    return this.prisma.college.create({
      data: createCollegeDto,
    });
  }

  async findAll() {
    return this.prisma.college.findMany({
      orderBy: {
        nirfRank: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.college.findUnique({
      where: { id },
      include: {
        cutoffs: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.college.delete({
      where: { id },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCutoffDto } from './dto/create-cutoff.dto';

@Injectable()
export class CollegeCutoffService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCutoffDto) {
    return this.prisma.collegeCutoff.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.collegeCutoff.findMany({
      include: {
        college: true,
      },
    });
  }

  findByCollege(collegeId: string) {
    return this.prisma.collegeCutoff.findMany({
      where: { collegeId },
      orderBy: {
        overallPercentile: 'desc',
      },
    });
  }

  remove(id: string) {
    return this.prisma.collegeCutoff.delete({
      where: { id },
    });
  }
}
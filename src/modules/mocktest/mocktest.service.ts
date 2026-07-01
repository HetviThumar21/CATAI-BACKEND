import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMockTestDto } from './dto/create-mocktest.dto';

@Injectable()
export class MocktestService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateMockTestDto) {
    return this.prisma.mockTest.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  history(userId: string) {
    return this.prisma.mockTest.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  latest(userId: string) {
    return this.prisma.mockTest.findFirst({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MockLibraryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getExam(userId: string) {
    const profile =
      await this.prisma.studentprofile.findUnique({
        where: {
          userid: userId,
        },
      });

    return profile?.targetexam ?? 'CAT';
  }

  async library(userId: string) {
    const exam = await this.getExam(userId);

    return this.prisma.mockLibrary.findMany({
      where: {
        exam,
        isActive: true,
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  async full(userId: string) {
    const exam = await this.getExam(userId);

    return this.prisma.mockLibrary.findMany({
      where: {
        exam,
        category: 'FULL',
        isActive: true,
      },
    });
  }

  async sectionals(userId: string) {
    const exam = await this.getExam(userId);

    return this.prisma.mockLibrary.findMany({
      where: {
        exam,
        category: 'SECTIONAL',
        isActive: true,
      },
    });
  }

  async topics(userId: string) {
    const exam = await this.getExam(userId);

    return this.prisma.mockLibrary.findMany({
      where: {
        exam,
        category: 'TOPIC',
        isActive: true,
      },
    });
  }

 async start(userId: string, mockId: string) {
  const mock = await this.prisma.mockLibrary.findUnique({
    where: {
      id: mockId,
    },
  });

 

  if (!mock) {
    throw new Error("Mock not found");
  }

  return this.prisma.mockAttempt.create({
    data: {
      userId,
      mockId,
    },
  });
}
async questions(mockId: string) {
  return this.prisma.mockQuestion.findMany({
    where: {
      mockId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
}
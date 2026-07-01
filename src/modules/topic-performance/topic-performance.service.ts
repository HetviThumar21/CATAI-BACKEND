import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTopicPerformanceDto } from './dto/create-topic-performance.dto';

@Injectable()
export class TopicPerformanceService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateTopicPerformanceDto) {
    return this.prisma.topicPerformance.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  history(userId: string) {
    return this.prisma.topicPerformance.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
     averageAccuracy(userId: string) {
  return this.prisma.topicPerformance.aggregate({
    where: {
      userId,
    },
    _avg: {
      accuracy: true,
    },
  });
}

  weakTopics(userId: string) {
    return this.prisma.topicPerformance.findMany({
      where: {
        userId,
        accuracy: {
          lt: 70,
        },
      },
      orderBy: {
        accuracy: 'asc',
      },
    });
  }
  sectionAnalysis(userId: string) {
  return this.prisma.topicPerformance.groupBy({
    by: ["section"],
    where: {
      userId,
    },
    _avg: {
      accuracy: true,
    },
    _count: true,
  });
}
topWeakTopics(userId: string) {
  return this.prisma.topicPerformance.findMany({
    where: {
      userId,
    },
    orderBy: {
      accuracy: "asc",
    },
    take: 5,
  });
}
}
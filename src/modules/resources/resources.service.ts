import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  all() {
    return this.prisma.resource.findMany();
  }

  byTopic(topic: string) {
    return this.prisma.resource.findMany({
      where: {
        topic,
      },
    });
  }

  bySection(section: string) {
    return this.prisma.resource.findMany({
      where: {
        section,
      },
    });
  }
}
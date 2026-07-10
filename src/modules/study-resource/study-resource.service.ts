import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class StudyResourceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getResources(topic: string) {
    return this.prisma.studyResource.findMany({
      where: {
        topic: {
          equals: topic,
          mode: "insensitive",
        },
      },
      orderBy: {
        type: "asc",
      },
    });
  }
}
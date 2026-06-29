import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  test() {
  return this.prisma.studentprofile.findMany();
}

  async create(
    userId: string,
    body: any,
  ) {
    return this.prisma.task.create({
      data: {
        userid: userId,
        title: body.title,
        description: body.description,
        priority:
          body.priority ?? 'medium',
        duedate: body.duedate
          ? new Date(body.duedate)
          : null,
      },
    });
  }

  async findAll(
    userId: string,
  ) {
    return this.prisma.task.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async today(
    userId: string,
  ) {
    return this.prisma.task.findMany({
      where: {
        userid: userId,
        status: 'pending',
      },
      orderBy: {
        priority: 'desc',
      },
    });
  }

  async complete(
    id: string,
  ) {
    const task =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        status: 'completed',
      },
    });
  }

  async delete(
    id: string,
  ) {
    const task =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Body() body,
  ) {
    return this.taskService.create(
      req.user.id,
      body,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req() req,
  ) {
    return this.taskService.findAll(
      req.user.id,
    );
  }

  @Get('today')
  @UseGuards(JwtAuthGuard)
  today(
    @Req() req,
  ) {
    return this.taskService.today(
      req.user.id,
    );
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  complete(
    @Param('id')
    id: string,
  ) {
    return this.taskService.complete(
      id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(
    @Param('id')
    id: string,
  ) {
    return this.taskService.delete(
      id,
    );
  }
}
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TopicPerformanceService } from './topic-performance.service';
import { CreateTopicPerformanceDto } from './dto/create-topic-performance.dto';

@Controller('topic-performance')
@UseGuards(JwtAuthGuard)
export class TopicPerformanceController {
  constructor(private readonly service: TopicPerformanceService) {}

  @Post()
  create(
    @Req() req,
    @Body() dto: CreateTopicPerformanceDto,
  ) {
    return this.service.create(req.user.userId, dto);
  }

  @Get('history')
  history(@Req() req) {
    return this.service.history(req.user.userId);
  }

  @Get('weak-topics')
  weakTopics(@Req() req) {
    return this.service.weakTopics(req.user.userId);
  }
}
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MockLibraryService } from './mock-library.service';

@Controller('mock-library')
@UseGuards(JwtAuthGuard)
export class MockLibraryController {
  constructor(
    private readonly service: MockLibraryService,
  ) {}

  @Get('full')
  full(@Req() req) {
    return this.service.full(req.user.id);
  }

  @Get('sectionals')
  sectionals(@Req() req) {
    return this.service.sectionals(req.user.id);
  }

  @Get('topics')
  topics(@Req() req) {
    return this.service.topics(req.user.id);
  }

  @Get(":id/questions")
questions(
  @Param("id") id: string,
) {
  return this.service.questions(id);
}

  @Post(":id/start")
start(
  @Req() req,
  @Param("id") id: string,
) {
  return this.service.start(req.user.id, id);
}


}
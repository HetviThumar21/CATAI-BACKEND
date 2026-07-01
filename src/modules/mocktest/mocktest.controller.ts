import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';import { MocktestService } from './mocktest.service';
import { CreateMockTestDto } from './dto/create-mocktest.dto';

@Controller('mock-test')
@UseGuards(JwtAuthGuard)
export class MocktestController {
  constructor(private readonly service: MocktestService) {}

  @Post()
  create(
    @Req() req,
    @Body() dto: CreateMockTestDto,
  ) {
    return this.service.create(req.user.userId, dto);
  }

  @Get('history')
  history(@Req() req) {
    return this.service.history(req.user.userId);
  }

  @Get('latest')
  latest(@Req() req) {
    return this.service.latest(req.user.userId);
  }
}
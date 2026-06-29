import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  dashboard(@Req() req) {
    console.log("REQ USER =>", req.user);

    return this.analyticsService.dashboard(req.user.id);
  }
}
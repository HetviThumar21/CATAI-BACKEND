import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { StudyPlanService } from './study-plan.service';

@Controller('study-plan')
export class StudyPlanController {
  constructor(
    private readonly studyPlanService: StudyPlanService,
  ) {}

  @Post('generate')
@UseGuards(JwtAuthGuard)
generate(
  @Req() req,
  @Body() body,
) {
  return this.studyPlanService.generate(
    req.user.id,
    body,
  );
}

  @Get('latest')
  @UseGuards(JwtAuthGuard)
  latest(@Req() req) {
    return this.studyPlanService.latest(
      req.user.id,
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  history(@Req() req) {
    return this.studyPlanService.history(
      req.user.id,
    );
  }

  @Get("tasks")
@UseGuards(JwtAuthGuard)
getTasks(@Req() req) {
  return this.studyPlanService.getTasks(
    req.user.id,
  );
}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(
    @Param('id') id: string,
  ) {
    return this.studyPlanService.getOne(
      id,
    );
  }
}
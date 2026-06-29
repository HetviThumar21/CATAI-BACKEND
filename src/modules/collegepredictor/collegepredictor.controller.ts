import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CollegepredictorService } from './collegepredictor.service';

import { PredictCollegeDto } from './dto/predict-college.dto';

@Controller('college-predictor')
export class CollegepredictorController {
  constructor(
    private readonly collegePredictorService: CollegepredictorService,
  ) {}

  @Post('predict')
  @UseGuards(JwtAuthGuard)
  predict(
    @Req() req,
    @Body() dto: PredictCollegeDto,
  ) {
    return this.collegePredictorService.predict(
      req.user.id,
      dto.percentile,
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  history(
    @Req() req,
  ) {
    return this.collegePredictorService.history(
      req.user.id,
    );
  }

  @Get('latest')
  @UseGuards(JwtAuthGuard)
  latest(
    @Req() req,
  ) {
    return this.collegePredictorService.latest(
      req.user.id,
    );
  }
}
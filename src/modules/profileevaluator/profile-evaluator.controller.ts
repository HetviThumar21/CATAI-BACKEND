import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProfileEvaluatorService } from './profile-evaluator.service';

@Controller('profile-evaluator')
export class ProfileEvaluatorController {
  constructor(
    private readonly profileEvaluatorService: ProfileEvaluatorService,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  generate(
    @Req() req,
  ) {
    return this.profileEvaluatorService.generate(
      req.user.id,
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  history(
    @Req() req,
  ) {
    return this.profileEvaluatorService.history(
      req.user.id,
    );
  }

 @Get('latest')
@UseGuards(JwtAuthGuard)
latest(@Req() req) {


  return this.profileEvaluatorService.latest(
    req.user.id,
  );
}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(
    @Param('id')
    id: string,
  ) {
    return this.profileEvaluatorService.getOne(
      id,
    );
  }
}
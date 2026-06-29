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

import { AskQuestionDto } from './dto/ask-question.dto';

import { CatgptService } from './catgpt.service';

@Controller('catgpt')
export class CatgptController {
  constructor(
    private readonly catgptService: CatgptService,
  ) {}

  @Post('ask')
  @UseGuards(JwtAuthGuard)
  ask(
    @Req() req,
    @Body() dto: AskQuestionDto,
  ) {
    return this.catgptService.ask(
      req.user.id,
      dto.question,
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  history(@Req() req) {
    return this.catgptService.history(
      req.user.id,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(
    @Param('id')
    id: string,
  ) {
    return this.catgptService.getOne(id);
  }
}
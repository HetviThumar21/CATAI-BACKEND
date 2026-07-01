import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CollegeCutoffService } from './college-cutoff.service';
import { CreateCutoffDto } from './dto/create-cutoff.dto';

@Controller('college-cutoff')
export class CollegeCutoffController {
  constructor(private readonly service: CollegeCutoffService) {}

  @Post()
  create(@Body() dto: CreateCutoffDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':collegeId')
  findByCollege(@Param('collegeId') collegeId: string) {
    return this.service.findByCollege(collegeId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
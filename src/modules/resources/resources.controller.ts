import { Controller, Get, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly service: ResourcesService,
  ) {}

  @Get()
  all() {
    return this.service.all();
  }

  @Get('topic/:topic')
  byTopic(
    @Param('topic') topic: string,
  ) {
    return this.service.byTopic(topic);
  }

  @Get('section/:section')
  bySection(
    @Param('section') section: string,
  ) {
    return this.service.bySection(section);
  }
}
import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { StudyPlanController } from './study-plan.controller';
import { StudyPlanService } from './study-plan.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    StudyPlanController,
  ],
  providers: [
    StudyPlanService,
  ],
})
export class StudyPlanModule {}
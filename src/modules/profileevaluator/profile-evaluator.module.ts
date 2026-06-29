import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { ProfileEvaluatorController } from './profile-evaluator.controller';

import { ProfileEvaluatorService } from './profile-evaluator.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    ProfileEvaluatorController,
  ],

  providers: [
    ProfileEvaluatorService,
  ],
})
export class ProfileEvaluatorModule {}
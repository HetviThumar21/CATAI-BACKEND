import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CollegepredictorController } from './collegepredictor.controller';
import { CollegepredictorService } from './collegepredictor.service';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    CollegepredictorController,
  ],

  providers: [
    CollegepredictorService,
  ],
})
export class CollegepredictorModule {}
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TopicPerformanceController } from './topic-performance.controller';
import { TopicPerformanceService } from './topic-performance.service';

@Module({
  imports: [PrismaModule],
  controllers: [TopicPerformanceController],
  providers: [TopicPerformanceService],
})
export class TopicPerformanceModule {}
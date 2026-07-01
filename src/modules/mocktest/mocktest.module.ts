import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MocktestController } from './mocktest.controller';
import { MocktestService } from './mocktest.service';

@Module({
  imports: [PrismaModule],
  controllers: [MocktestController],
  providers: [MocktestService],
})
export class MocktestModule {}
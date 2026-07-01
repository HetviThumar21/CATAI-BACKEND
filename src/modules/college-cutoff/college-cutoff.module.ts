import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CollegeCutoffController } from './college-cutoff.controller';
import { CollegeCutoffService } from './college-cutoff.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollegeCutoffController],
  providers: [CollegeCutoffService],
  exports: [CollegeCutoffService],
})
export class CollegeCutoffModule {}
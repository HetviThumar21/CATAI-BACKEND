import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CatgptController } from './catgpt.controller';
import { CatgptService } from './catgpt.service';

@Module({
  imports: [PrismaModule],
  controllers: [CatgptController],
  providers: [CatgptService],
})
export class CatgptModule {}
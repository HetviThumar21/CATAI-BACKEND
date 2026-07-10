import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MockLibraryController } from './mock-library.controller';
import { MockLibraryService } from './mock-library.service';

@Module({
  imports: [PrismaModule],
  controllers: [MockLibraryController],
  providers: [MockLibraryService],
})
export class MockLibraryModule {}
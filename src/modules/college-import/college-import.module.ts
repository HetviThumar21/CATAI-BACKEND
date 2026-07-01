import { Module } from '@nestjs/common';
import { CollegeImportController } from './college-import.controller';
import { CollegeImportService } from './college-import.service';

@Module({
  controllers: [CollegeImportController],
  providers: [CollegeImportService],
})
export class CollegeImportModule {}
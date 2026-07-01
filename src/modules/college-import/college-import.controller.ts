import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CollegeImportService } from './college-import.service';

@Controller('college-import')
export class CollegeImportController {
  constructor(
    private readonly service: CollegeImportService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadExcel(
    @UploadedFile() file: any,
  ) {
    return this.service.importExcel(file);
  }
}
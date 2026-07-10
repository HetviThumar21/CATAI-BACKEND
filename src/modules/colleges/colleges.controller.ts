import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Post()
  create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegesService.create(createCollegeDto);
  }
@Post('import-default')
importDefaultColleges() {
  return this.collegesService.importDefaultColleges();
}
 @Get()
findAll(
  @Query("page") page?: string,
  @Query("limit") limit?: string,
  @Query("search") search?: string,
  @Query("state") state?: string,
) {
  return this.collegesService.findAll(
    Number(page) || 1,
    Number(limit) || 6,
    search || "",
    state || "",
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collegesService.findOne(id);
  }

@Patch(':id')
update(
  @Param('id') id: string,
  @Body() updateCollegeDto: UpdateCollegeDto,
) {
  return this.collegesService.update(id, updateCollegeDto);
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collegesService.delete(id);
  }

  
}
import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { StudentProfileController } from './student-profile.controller';

import { StudentProfileService } from './student-profile.service';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    StudentProfileController,
  ],

  providers: [
    StudentProfileService,
  ],
})
export class StudentProfileModule {}
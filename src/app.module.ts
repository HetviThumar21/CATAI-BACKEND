import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileEvaluatorModule } from './modules/profileevaluator/profile-evaluator.module';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { CatgptModule } from './modules/catgpt/catgpt.module';
import { StudyPlanModule } from './modules/studyplan/study-plan.module';

import { StudentProfileModule } from './modules/studentprofile/student-profile.module';
import { CollegepredictorModule } from './modules/collegepredictor/collegepredictor.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { TaskModule } from './modules/task/task.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StudentProfileModule,
    ProfileEvaluatorModule,
    CatgptModule,
    StudyPlanModule,
    CollegepredictorModule,
    AnalyticsModule,
    TaskModule,  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
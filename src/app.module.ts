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
import { CollegesModule } from './modules/colleges/colleges.module';
import { CollegeCutoffModule } from './modules/college-cutoff/college-cutoff.module';
import { CollegeImportModule } from './modules/college-import/college-import.module';
import { MocktestModule } from './modules/mocktest/mocktest.module';
import { TopicPerformanceModule } from './modules/topic-performance/topic-performance.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { StudyResourceModule } from "./modules/study-resource/study-resource.module";
import { MockLibraryModule } from './modules/mock-library/mock-library.module';
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
    TaskModule,
    CollegesModule,
    CollegeCutoffModule,
    CollegeImportModule,
    MocktestModule,
    TopicPerformanceModule,
    ResourcesModule, 
    StudyResourceModule,
    MockLibraryModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
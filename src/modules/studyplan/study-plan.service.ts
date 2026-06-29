import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudyPlanService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async generate(userId: string) {
    const profile =
      await this.prisma.studentprofile.findUnique({
        where: {
          userid: userId,
        },
      });

    if (!profile) {
      throw new NotFoundException(
        'Student profile not found',
      );
    }


    const latestReport =
      await this.prisma.profileevaluation.findFirst({
        where: {
          userid: userId,
        },
        orderBy: {
          createdat: 'desc',
        },
      });

    if (!latestReport) {
      throw new NotFoundException(
        'Profile evaluation not found',
      );
    }

    let roadmap = '';
let monthlyPlan = '';
let weeklyPlan = '';
let dailyTasks = '';
let revisionPlan = '';

if (latestReport.overallscore >= 80) {

  roadmap = `
Target top IIMs and premier MBA colleges.
Focus on CAT mock tests, GDPI preparation, and interview readiness.
Continue profile building through leadership activities and certifications.
`;

  monthlyPlan = `
Month 1: Advanced Quant Practice
Month 2: Advanced DILR Sets
Month 3: Mock Test Focus
Month 4: Profile Building
Month 5: GDPI Preparation
Month 6: Final CAT Revision
`;

  weeklyPlan = `
Monday: Quant
Tuesday: DILR
Wednesday: VARC
Thursday: Advanced Practice
Friday: Mock Test
Saturday: Mock Analysis
Sunday: Revision
`;

  dailyTasks = `
2 Hours Quant
1 Hour DILR
1 Hour VARC
1 Mock Review
`;

  revisionPlan = `
Weekly revision every Sunday.
2 Mock tests per week.
GDPI preparation from Month 4.
`;
}

else if (latestReport.overallscore >= 60) {

  roadmap = `
Improve CAT percentile through structured preparation.
Strengthen weak sections and build certifications.
Track progress through weekly mock tests.
`;

  monthlyPlan = `
Month 1: Quant Foundation
Month 2: DILR Strengthening
Month 3: VARC Improvement
Month 4: Mock Practice
Month 5: Sectional Tests
Month 6: Final Revision
`;

  weeklyPlan = `
Monday: Quant
Tuesday: DILR
Wednesday: VARC
Thursday: Practice Questions
Friday: Mock Test
Saturday: Analysis
Sunday: Revision
`;

  dailyTasks = `
1 Hour Quant
1 Hour DILR
1 Hour VARC
30 Minutes Revision
`;

  revisionPlan = `
Weekly revision every Sunday.
1 Mock test per week.
Monthly performance review.
`;
}

else {

  roadmap = `
Focus on building aptitude fundamentals.
Improve academics through certifications and projects.
Develop a disciplined CAT preparation routine.
`;

  monthlyPlan = `
Month 1: Basic Quant
Month 2: Basic DILR
Month 3: Reading Habit
Month 4: Sectional Practice
Month 5: Mock Introduction
Month 6: Improvement Cycle
`;

  weeklyPlan = `
Monday: Quant Basics
Tuesday: DILR Basics
Wednesday: Reading Practice
Thursday: Quant
Friday: Practice Test
Saturday: Analysis
Sunday: Revision
`;

  dailyTasks = `
1 Hour Quant Basics
1 Hour Reading
30 Minutes DILR
30 Minutes Revision
`;

  revisionPlan = `
Weekly revision every Sunday.
Sectional test every 2 weeks.
Focus on fundamentals before mocks.
`;
}

   
//  const roadmap = `
// Focus on CAT preparation through consistent study and mock tests.
// Improve weak areas identified in your profile evaluation.
// Track progress monthly and optimize preparation strategy.
// `;

//     const monthlyPlan = `
// Month 1: Build Quant fundamentals
// Month 2: Strengthen DILR concepts
// Month 3: Improve VARC performance
// Month 4: Increase mock test frequency
// Month 5: Advanced revision and analysis
// Month 6: Final CAT preparation
// `;

//     const weeklyPlan = `
// Monday: Quant
// Tuesday: DILR
// Wednesday: VARC
// Thursday: Quant Practice
// Friday: Mock Test
// Saturday: Mock Analysis
// Sunday: Revision
// `;

//     const dailyTasks = `
// ${profile.dailystudyhours ?? 3} Hours Study

// • Quant Practice
// • DILR Practice
// • VARC Reading
// • Revision
// `;

//     const revisionPlan = `
// Weekly revision every Sunday.
// Monthly revision after every four weeks.
// Full CAT mocks during the final preparation phase.
// `;


        const examDate =
  new Date();

examDate.setMonth(
  examDate.getMonth() + 6,
);
    const studyPlan =
      await this.prisma.studyplan.create({
        data: {
          userid: userId,

          targetexam:
            profile.targetexam ?? 'CAT',

          targetpercentile:
            profile.targetpercentile ?? 90,

            examdate: examDate,


          roadmap,

          monthlyplan: monthlyPlan,

          weeklyplan: weeklyPlan,

          dailytasks: dailyTasks,

          revisionplan: revisionPlan,
        },
      });

    return studyPlan;
  }

  async latest(userId: string) {
    return this.prisma.studyplan.findFirst({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async history(userId: string) {
    return this.prisma.studyplan.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async getOne(id: string) {
    return this.prisma.studyplan.findUnique({
      where: {
        id,
      },
    });
  }
}
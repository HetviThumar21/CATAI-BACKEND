import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  StudyPlanEngine,
} from "./study-plan.engine";

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

    const weakTopics =
  await this.prisma.topicPerformance.findMany({
    where: {
      userId,
      accuracy: {
        lt: 70,
      },
    },
    orderBy: {
      accuracy: 'asc',
    },
    take: 5,
  });

const weakTopicNames =
  weakTopics.map(t => t.topic);

  const strengths: string[] = [];

if ((profile.tenthpercentage ?? 0) >= 85)
  strengths.push("Strong Academic Foundation");

if ((profile.twelfthpercentage ?? 0) >= 85)
  strengths.push("Consistent School Performance");

if ((profile.graduationscore ?? 0) >= 8)
  strengths.push("Good Graduation Performance");

if (profile.isexperienced)
  strengths.push("Work Experience");

if ((profile.internshipcount ?? 0) > 0)
 {
  strengths.push(
    `${profile.internshipcount ?? 0} Internship${
      (profile.internshipcount ?? 0) > 1 ? "s" : ""
    }`
  );
}
if (profile.leadershipexperience)
  strengths.push("Leadership Experience");

if (profile.certifications?.trim())
  strengths.push("Professional Certifications");

if (profile.competitions?.trim())
  strengths.push("Competition Participation");

if (profile.graduationstream?.trim())
  strengths.push(`${profile.graduationstream} Background`);

const weaknesses: string[] = [];

if ((profile.tenthpercentage ?? 0) < 70)
  weaknesses.push("Low 10th Percentage");

if ((profile.twelfthpercentage ?? 0) < 70)
  weaknesses.push("Low 12th Percentage");

if ((profile.graduationscore ?? 0) < 7)
  weaknesses.push("Low Graduation Score");

weaknesses.push(...weakTopicNames);

if (!profile.isexperienced)
  weaknesses.push("Limited Industry Exposure");

if ((profile.dailystudyhours ?? 0) < 3)
  weaknesses.push("Low Daily Study Time");

if (!profile.certifications?.trim())
  weaknesses.push("No Professional Certifications");

if (!profile.competitions?.trim())
  weaknesses.push("Limited Competitive Exposure");



const planContext = {
  profile,
  latestReport,

  strengths,
  weaknesses,
  weakTopicNames,

  recommendations: [] as string[],

  mockTests: [],

  topicPerformance: [],
};

if ((profile.tenthpercentage ?? 0) < 70) {
  planContext.recommendations.push(
    "Compensate lower school academics with an exceptional CAT percentile."
  );
}

if ((profile.graduationscore ?? 0) < 7) {
  planContext.recommendations.push(
    "Strengthen your profile through certifications, live projects, and internships."
  );
}

if (!profile.isexperienced) {
  planContext.recommendations.push(
    "Build industry exposure through internships, freelancing, research projects, or volunteering."
  );
}

if ((profile.dailystudyhours ?? 0) < 3) {
  planContext.recommendations.push(
    "Increase study time gradually to at least 3–4 focused hours per day."
  );
}

if (!profile.certifications?.trim()) {
  planContext.recommendations.push(
    "Complete at least two industry-recognized certifications before CAT."
  );
}



console.log("Study Plan Context", planContext);

const engine = new StudyPlanEngine();

const generatedPlan =
  engine.generate(planContext);


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


          roadmap: generatedPlan.roadmap,

monthlyplan: generatedPlan.monthlyPlan,

weeklyplan: generatedPlan.weeklyPlan,

dailytasks: generatedPlan.dailyTasks,

revisionplan: generatedPlan.revisionPlan,
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

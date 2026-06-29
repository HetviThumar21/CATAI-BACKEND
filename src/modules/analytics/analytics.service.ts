import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async dashboard(
    userId: string,
  ) {
    const latestProfile =
      await this.prisma.studentprofile.findUnique({
        where: {
          userid: userId,
        },
      });

    const latestReport =
      await this.prisma.profileevaluation.findFirst({
        where: {
          userid: userId,
        },
        orderBy: {
          createdat: 'desc',
        },
      });

    const reportsGenerated =
      await this.prisma.profileevaluation.count({
        where: {
          userid: userId,
        },
      });

    const catgptConversations =
      await this.prisma.catgptconversation.count({
        where: {
          userid: userId,
        },
      });

    const studyPlans =
      await this.prisma.studyplan.count({
        where: {
          userid: userId,
        },
      });

    const collegePredictions =
      await this.prisma.collegeprediction.count({
        where: {
          userid: userId,
        },
      });

    return {
      profileScore:
        latestReport?.overallscore ?? 0,

      targetPercentile:
        latestProfile?.targetpercentile ?? 0,

      reportsGenerated,

      catgptConversations,

      studyPlans,

      collegePredictions,

      roadmap:
        latestReport?.roadmap ?? '',

      gapAnalysis:
        latestReport?.gapanalysis ?? '',
    };
  }
}
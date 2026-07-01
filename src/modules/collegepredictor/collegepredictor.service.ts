import {
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CollegepredictorService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

 async predict(
  userId: string,
  percentile: number,
) {
  const latestReport =
    await this.prisma.profileevaluation.findFirst({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });

  const profile =
    await this.prisma.studentprofile.findUnique({
      where: {
        userid: userId,
      },
    });

  const profileScore =
    latestReport?.overallscore ?? 0;

  const workExperience =
    profile?.isexperienced ?? false;

  const latestYear = await this.prisma.collegeCutoff.aggregate({
  _max: {
    year: true,
  },
});

const cutoffs = await this.prisma.collegeCutoff.findMany({
  where: {
    exam: "CAT",
    year: latestYear._max.year ?? new Date().getFullYear(),
  },
  include: {
    college: true,
  },
});

  const dream: string[] = [];
  const target: string[] = [];
  const safe: string[] = [];



 for (const cutoff of cutoffs) {
  if (
    cutoff.category !== "General"
  ) {
    continue;
  }

  if (
    cutoff.varcCutoff &&
    cutoff.dilrCutoff &&
    cutoff.qaCutoff
  ) {
    // Later we'll compare sectionals here
  }

  const diff = percentile - cutoff.overallPercentile;

  if (diff >= 3) {
    safe.push(JSON.stringify({
  id: cutoff.college.id,
  name: cutoff.college.name,
  city: cutoff.college.city,
  state: cutoff.college.state,
  nirfRank: cutoff.college.nirfRank,
  fees: cutoff.college.fees,
  avgPackage: cutoff.college.avgPackage,
  website: cutoff.college.officialWebsite,
}));

target.push(JSON.stringify({
  id: cutoff.college.id,
  name: cutoff.college.name,
  city: cutoff.college.city,
  state: cutoff.college.state,
  nirfRank: cutoff.college.nirfRank,
  fees: cutoff.college.fees,
  avgPackage: cutoff.college.avgPackage,
  website: cutoff.college.officialWebsite,
}));

dream.push(JSON.stringify({
  id: cutoff.college.id,
  name: cutoff.college.name,
  city: cutoff.college.city,
  state: cutoff.college.state,
  nirfRank: cutoff.college.nirfRank,
  fees: cutoff.college.fees,
  avgPackage: cutoff.college.avgPackage,
  website: cutoff.college.officialWebsite,
}));
  }
}

  // Bonus for work experience
  if (workExperience && percentile >= 95) {
    target.push("SJMSOM IIT Bombay");
    target.push("DoMS IIT Delhi");
  }

  const uniqueDream = [...new Set(dream)];
const uniqueTarget = [...new Set(target)];
const uniqueSafe = [...new Set(safe)];

  const analysis = `Based on your CAT percentile (${percentile}) and profile score (${profileScore}), college recommendations have been generated using the latest college cutoff database.`;
return {
  percentile,
  profileScore,
  analysis,
  dream: uniqueDream,
  target: uniqueTarget,
  safe: uniqueSafe,
};
}

  async history(
    userId: string,
  ) {
    return this.prisma.collegeprediction.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async latest(
    userId: string,
  ) {
    return this.prisma.collegeprediction.findFirst({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }
}
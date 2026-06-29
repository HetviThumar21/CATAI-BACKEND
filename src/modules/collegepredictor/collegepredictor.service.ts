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

  let dream: string[] = [];
  let target: string[] = [];
  let safe: string[] = [];

  let analysis = '';

  // TOP PROFILE
  if (
    percentile >= 99 &&
    profileScore >= 85
  ) {
    dream = [
      'IIM Ahmedabad',
      'IIM Bangalore',
      'IIM Calcutta',
      'FMS Delhi',
    ];

    target = [
      'IIM Lucknow',
      'IIM Indore',
      'SPJIMR',
      'MDI Gurgaon',
    ];

    safe = [
      'IIFT Delhi',
      'IMT Ghaziabad',
    ];

    analysis =
      'Your profile is highly competitive for top MBA colleges. A 99+ percentile combined with your profile score makes you a strong candidate for IIMs and other Tier-1 institutes.';
  }

  // STRONG PROFILE
  else if (
    percentile >= 95 &&
    profileScore >= 75
  ) {
    dream = [
      'IIM Indore',
      'IIM Kozhikode',
      'SPJIMR',
    ];

    target = [
      'MDI Gurgaon',
      'IIFT Delhi',
      'IMT Ghaziabad',
    ];

    safe = [
      'IMI Delhi',
      'XIMB',
      'TAPMI',
    ];

    analysis =
      'Your profile is competitive for several Tier-1 MBA colleges. Improving CAT performance and interview preparation can significantly improve admission chances.';
  }

  // AVERAGE PROFILE
  else if (
    percentile >= 90
  ) {
    dream = [
      'IMT Ghaziabad',
      'XIMB',
    ];

    target = [
      'IMI Delhi',
      'TAPMI',
      'FORE School of Management',
    ];

    safe = [
      'Jaipuria',
      'IPE Hyderabad',
    ];

    analysis =
      'You have a reasonable chance at good MBA colleges. Strengthening your profile and improving CAT performance can help you move into higher-ranked institutions.';
  }

  // LOW PROFILE
  else {
    dream = [
      'IMI Delhi',
    ];

    target = [
      'Jaipuria',
      'IPE Hyderabad',
    ];

    safe = [
      'ICFAI',
      'Alliance University',
    ];

    analysis =
      'Your current profile requires improvement before targeting highly competitive MBA colleges. Focus on CAT preparation, certifications, and profile building.';
  }

  // Work Experience Bonus
  if (
    workExperience &&
    percentile >= 95
  ) {
    target.push(
      'SJMSOM IIT Bombay',
    );

    target.push(
      'DoMS IIT Delhi',
    );
  }

  const prediction =
    await this.prisma.collegeprediction.create({
      data: {
        userid: userId,
        percentile,
        dream,
        target,
        safe,
        analysis,
      },
    });

  return prediction;
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
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatgptService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
async ask(
  userId: string,
  question: string,
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

  const latestPlan =
    await this.prisma.studyplan.findFirst({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });

    const latestPrediction =
  await this.prisma.collegeprediction.findFirst({
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

  let answer = '';

  const questionLower =
    question.toLowerCase();

  if (
    questionLower.includes('iim ahmedabad')
  ) {
    let chance = '';

    if (
      latestReport.overallscore >= 85 &&
      (profile?.targetpercentile ?? 0) >= 99
    ) {
      chance =
        'You have a realistic chance if you achieve a 99+ percentile and perform well in interviews.';
    } else {
      chance =
        'IIM Ahmedabad remains highly ambitious. You should focus on maximizing CAT performance and strengthening your profile.';
    }

    answer = `
IIM Ahmedabad Assessment

Profile Score:
${latestReport.overallscore}/100

Target Percentile:
${profile?.targetpercentile}

Assessment:
${chance}

Current Gaps:
${latestReport.gapanalysis}
`;
  }

  else if (
  questionLower.includes('chance') ||
  questionLower.includes('admission chance')
) {

  answer = `
Admission Assessment

Profile Score:
${latestReport.overallscore}/100

Target Percentile:
${profile?.targetpercentile}

Predicted Colleges:

Dream:
${latestPrediction?.dream}

Target:
${latestPrediction?.target}

Safe:
${latestPrediction?.safe}

Analysis:

${latestPrediction?.analysis}
`;
}

else if (
  questionLower.includes('how many percentile') ||
  questionLower.includes('cat score')
) {

  let response = '';

  if (latestReport.overallscore >= 85) {
    response =
      'A 98 to 99+ percentile can make you highly competitive for top IIMs and Tier-1 MBA colleges.';
  }
  else if (latestReport.overallscore >= 70) {
    response =
      'A 95 to 98 percentile should be your minimum target for strong MBA admission opportunities.';
  }
  else {
    response =
      'You should focus on achieving at least a 95 percentile while simultaneously strengthening your profile.';
  }

  answer = `
CAT Percentile Guidance

Current Profile Score:
${latestReport.overallscore}/100

Recommendation:

${response}
`;
}

else if (
  questionLower.includes('next step') ||
  questionLower.includes('what should i do')
) {

  answer = `
Recommended Next Steps

Current Profile Score:
${latestReport.overallscore}/100

Current Gaps:
${latestReport.gapanalysis}

Roadmap:

${latestReport.roadmap}

Study Plan:

${latestPlan?.weeklyplan}
`;
}

else if (
  questionLower.includes('interview')
) {

  answer = `
MBA Interview Preparation

Focus Areas:

1. Academic consistency
2. Graduation subjects
3. Current affairs
4. Work experience discussion
5. Why MBA

Current Profile Assessment:

${latestReport.academicanalysis}

Recommendations:

${latestReport.airecommendations}
`;
}

  else if (
    questionLower.includes('iim') ||
    questionLower.includes('admission') ||
    questionLower.includes('college')
  ) {
    const colleges =
      latestReport.collegesuitability as any;

    let admissionChance = '';

    if (latestReport.overallscore >= 85) {
      admissionChance =
        'Your profile is highly competitive for top MBA colleges if supported by a strong CAT percentile.';
    } else if (
      latestReport.overallscore >= 70
    ) {
      admissionChance =
        'Your profile is competitive for several Tier-1 MBA colleges but would benefit from a higher CAT percentile and stronger profile building.';
    } else {
      admissionChance =
        'Your current profile has a few gaps that should be improved before targeting highly competitive MBA colleges.';
    }

    answer = `
Current Profile Score:
${latestReport.overallscore}/100

Target Percentile:
${profile?.targetpercentile}

Admission Assessment:
${admissionChance}

Dream Colleges:
${colleges.dream.join(', ')}

Target Colleges:
${colleges.target.join(', ')}

Safe Colleges:
${colleges.safe.join(', ')}

Key Improvements Needed:
${latestReport.gapanalysis}

Recommended Strategy:
${latestReport.roadmap}
`;
  }

  else if (
    questionLower.includes('improve') ||
    questionLower.includes('profile')
  ) {
    answer = `
Profile Score:
${latestReport.overallscore}/100

Areas needing improvement:
${latestReport.gapanalysis}

Recommended Actions:
${latestReport.airecommendations}

Roadmap:
${latestReport.roadmap}
`;
  }

  else if (
    questionLower.includes('cat') ||
    questionLower.includes('percentile')
  ) {
    answer = `
Target Percentile:
${profile?.targetpercentile}

Current Profile Score:
${latestReport.overallscore}/100

Preparation Roadmap:
${latestReport.roadmap}

Focus Areas:
${latestReport.airecommendations}
`;
  }

  else if (
    questionLower.includes('today') ||
    questionLower.includes('study')
  ) {
    answer = `
Today's Study Tasks:

${latestPlan?.dailytasks}

Revision Plan:

${latestPlan?.revisionplan}
`;
  }

  else if (
    questionLower.includes('week') ||
    questionLower.includes('weekly')
  ) {
    answer = `
Weekly Preparation Plan:

${latestPlan?.weeklyplan}
`;
  }

  else if (
    questionLower.includes('roadmap')
  ) {
    answer = `
Your MBA Roadmap:

${latestPlan?.roadmap}
`;
  }

  else if (
    questionLower.includes('mock') ||
    questionLower.includes('mocks')
  ) {
    answer = `
Mock Test Strategy:

${latestPlan?.revisionplan}

Based on your profile score of ${latestReport.overallscore}/100, regular mock analysis should be a major part of your preparation.
`;
  }

  else if (
    questionLower.includes('weak') ||
    questionLower.includes('weakness')
  ) {
    answer = `
Weak Areas Identified:

${latestReport.gapanalysis}

Recommended Actions:

${latestReport.airecommendations}
`;
  }

  else if (
    questionLower.includes('work experience') ||
    questionLower.includes('experience')
  ) {
    answer = `
Work Experience Analysis

${latestReport.workexperienceanalysis}

Current Experience:
${profile?.experiencemonths ?? 0} months

Recommendation:

${
  profile?.isexperienced
    ? 'Your work experience strengthens your MBA profile and can positively impact admission chances.'
    : 'Consider internships, live projects, leadership activities, and certifications to compensate for limited work experience.'
}
`;
  }

  else if (
    questionLower.includes('am i ready') ||
    questionLower.includes('ready for cat')
  ) {
    let readiness = '';

    if (latestReport.overallscore >= 85) {
      readiness =
        'You are on a strong path and should focus on maximizing CAT performance and interview preparation.';
    } else if (
      latestReport.overallscore >= 70
    ) {
      readiness =
        'You are moderately prepared but still have improvement opportunities before becoming highly competitive.';
    } else {
      readiness =
        'Your profile requires significant improvement and consistent preparation to become competitive.';
    }

    answer = `
CAT Readiness Assessment

Profile Score:
${latestReport.overallscore}/100

Assessment:
${readiness}

Roadmap:
${latestReport.roadmap}
`;
  }

  else if (
    questionLower.includes('best college') ||
    questionLower.includes('which college')
  ) {
    const colleges =
      latestReport.collegesuitability as any;

    answer = `
Based on your profile evaluation:

Most Suitable Colleges:
${colleges.target.join(', ')}

Safe Colleges:
${colleges.safe.join(', ')}

Stretch Goals:
${colleges.dream.join(', ')}

Reason:
These recommendations are based on your academics, work experience, target percentile, and overall profile score.
`;
  }

  else {
    answer = `
Profile Score:
${latestReport.overallscore}/100

Academic Analysis:
${latestReport.academicanalysis}

Gap Analysis:
${latestReport.gapanalysis}

Roadmap:
${latestReport.roadmap}

Recommendations:
${latestReport.airecommendations}
`;
  }

  const conversation =
    await this.prisma.catgptconversation.create({
      data: {
        userid: userId,
        question,
        answer,
      },
    });

  return conversation;
}
async history(userId: string) {
  return this.prisma.catgptconversation.findMany({
    where: {
      userid: userId,
    },
    orderBy: {
      createdat: 'desc',
    },
  });
}

async getOne(id: string) {
  return this.prisma.catgptconversation.findUnique({
    where: {
      id,
    },
  });
}
}
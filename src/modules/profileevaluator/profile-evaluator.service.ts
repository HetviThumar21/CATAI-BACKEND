
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { evaluateWorkExperience } from "./engines/work-experience.engine";
import { evaluateAchievements } from "./engines/achievement.engine";
import { evaluateAcademics } from "./engines/academic.engine";
import { evaluateGapAnalysis } from "./engines/gap-analysis.engine";

@Injectable()
export class ProfileEvaluatorService {
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

    const workEvaluation =
  evaluateWorkExperience(profile);

  const achievementEvaluation =
  evaluateAchievements(profile);

  const academicEvaluation =
  evaluateAcademics(profile);

  const gapEvaluation = evaluateGapAnalysis(profile);


  // Improved scoring
  let score =
  academicEvaluation.score +
  workEvaluation.score +
achievementEvaluation.score
  const targetPercentile = profile.targetpercentile ?? 0;

if (targetPercentile >= 99.5) {
  score += 10;
} else if (targetPercentile >= 99) {
  score += 8;
} else if (targetPercentile >= 95) {
  score += 5;
} else if (targetPercentile >= 90) {
  score += 3;
}

score = Math.min(100, Math.round(score));

  

  
  // Roadmap
let roadmap = '';

if (score >= 80) {
  roadmap =
    'Target top IIMs and premier business schools by maintaining consistency in CAT preparation. Increase mock test frequency, analyze performance regularly, and begin GDPI preparation early. Continue building leadership exposure and professional achievements to strengthen your overall profile.';
}
else if (score >= 60) {
  roadmap =
    'Focus on improving your CAT percentile through structured sectional practice and regular mock tests. Strengthen your profile with certifications, internships, and extracurricular activities. Track progress monthly and work on weak areas identified during preparation.';
}
else {
  roadmap =
    'Begin with strengthening aptitude fundamentals across Quant, DILR, and VARC. Build your profile through certifications, projects, and leadership activities while maintaining a consistent study schedule. Gradually increase mock test practice and focus on improving academic competitiveness.';
}

  // AI Recommendations
// AI Recommendations
let aiRecommendations = '';

if (score >= 80) {
  aiRecommendations =
    'You already have a strong MBA profile and are competitive for several top business schools. Focus on maximizing your CAT percentile through regular mock tests and sectional practice. Start preparing early for GDPI rounds and strengthen your profile with leadership initiatives or impactful projects.';
}
else if (score >= 60) {
  aiRecommendations =
    'Your profile shows good potential for MBA admissions, but there is room for improvement. Focus on improving your CAT percentile and building a stronger profile through certifications, internships, and extracurricular achievements. Consistent preparation over the coming months can significantly improve your admission chances.';
}
else {
  aiRecommendations =
    'Your profile currently has a few gaps that should be addressed before targeting top MBA colleges. Focus on strengthening academics through a strong CAT score, completing relevant certifications, and participating in projects or leadership activities. A structured preparation strategy can help improve both your profile strength and college opportunities.';
}

  // College Recommendations
  let dream: string[] = [];
  let target: string[] = [];
  let safe: string[] = [];

  if (score >= 85) {
    dream = [
      'IIM Ahmedabad',
      'IIM Bangalore',
      'IIM Calcutta',
      'FMS Delhi',
    ];

    target = [
      'IIM Indore',
      'IIM Kozhikode',
      'SPJIMR',
      'MDI Gurgaon',
    ];

    safe = [
      'IMT Ghaziabad',
      'XIMB',
      'TAPMI',
    ];
  } else if (score >= 70) {
    dream = [
      'IIM Indore',
      'IIM Kozhikode',
      'SPJIMR',
    ];

    target = [
      'IMT Ghaziabad',
      'IMI Delhi',
      'XIMB',
    ];

    safe = [
      'FORE School of Management',
      'TAPMI',
    ];
  } else {
    dream = [
      'IMT Ghaziabad',
    ];

    target = [
      'XIMB',
      'FORE School of Management',
    ];

    safe = [
      'Jaipuria Institute of Management',
      'IPE Hyderabad',
    ];
  }

  const report =
    await this.prisma.profileevaluation.create({
      data: {
        userid: userId,

        overallscore: score,

        profilesummary: `
Profile Score: ${score}/100

Academic Analysis:
${academicEvaluation.analysis}

Work Experience:
${workEvaluation.analysis}

Achievements:
${achievementEvaluation.analysis}

Strengths:
${academicEvaluation.strengths.join(", ")}

Weaknesses:
${academicEvaluation.weaknesses.join(", ")}
`,

        academicanalysis:
          academicEvaluation.analysis,

        workexperienceanalysis:
  workEvaluation.analysis,

achievementsanalysis:
  achievementEvaluation.analysis,
        examreadiness:
`Target percentile is ${targetPercentile}.`,

        collegesuitability: {
          dream,
          target,
          safe,
        },

        gapanalysis: gapEvaluation.analysis,

        roadmap,

        airecommendations:
          aiRecommendations,
      },
    });

  return report;
}


  async history(userId: string) {
    return this.prisma.profileevaluation.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async getOne(id: string) {
    return this.prisma.profileevaluation.findUnique({
      where: {
        id,
      },
    });
  }

  async latest(userId: string) {
  return this.prisma.profileevaluation.findFirst({
    where: {
      userid: userId,
    },
    orderBy: {
      createdat: 'desc',
    },
  });
}
}


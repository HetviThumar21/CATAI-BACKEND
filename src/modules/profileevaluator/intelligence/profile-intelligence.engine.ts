import { StudentProfile } from "../interfaces/profile.interface";

import {
  evaluateAcademics,
  AcademicResult,
} from "../engines/academic.engine";

import {
  evaluateWorkExperience,
  WorkExperienceResult,
} from "../engines/work-experience.engine";

import {
  evaluateAchievements,
  AchievementResult,
} from "../engines/achievement.engine";

import {
  evaluateGapAnalysis,
  GapAnalysisResult,
} from "../engines/gap-analysis.engine";

export interface ProfileIntelligence {

  overallScore: number;

  academic: AcademicResult;

  work: WorkExperienceResult;

  achievement: AchievementResult;

  gap: GapAnalysisResult;

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  readinessLevel: string;

  expectedPercentile: number;

}

export function buildProfileIntelligence(
  profile: StudentProfile
): ProfileIntelligence {

  const academic = evaluateAcademics(profile);

  const work = evaluateWorkExperience(profile);

  const achievement = evaluateAchievements(profile);

  const gap = evaluateGapAnalysis(profile);

  const overallScore =
    academic.score +
    work.score +
    achievement.score;

  let readinessLevel = "Beginner";

  if (overallScore >= 80) {
    readinessLevel = "Excellent";
  } else if (overallScore >= 65) {
    readinessLevel = "Very Good";
  } else if (overallScore >= 50) {
    readinessLevel = "Good";
  } else if (overallScore >= 35) {
    readinessLevel = "Average";
  }

  const expectedPercentile =
    Math.min(
      99.9,
      Math.round((overallScore * 1.15) * 10) / 10
    );

  return {

    overallScore,

    academic,

    work,

    achievement,

    gap,

    strengths: [
      ...academic.strengths,
      ...work.strengths,
      ...achievement.strengths,
    ],

    weaknesses: gap.weaknesses,

    recommendations: [
      ...work.recommendations,
      ...achievement.recommendations,
    ],

    readinessLevel,

    expectedPercentile,

  };
}
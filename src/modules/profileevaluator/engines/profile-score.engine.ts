import { StudentProfile } from "../interfaces/profile.interface";

import {
  evaluateAcademics,
  AcademicResult,
} from "./academic.engine";

import {
  evaluateWorkExperience,
  WorkExperienceResult,
} from "./work-experience.engine";

import {
  evaluateAchievements,
  AchievementResult,
} from "./achievement.engine";

export interface ProfileScoreResult {
  overallScore: number;

  academic: AcademicResult;

  work: WorkExperienceResult;

  achievement: AchievementResult;

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  summary: string;
}

export function evaluateProfileScore(
  profile: StudentProfile
): ProfileScoreResult {

  const academic = evaluateAcademics(profile);

  const work = evaluateWorkExperience(profile);

  const achievement = evaluateAchievements(profile);

  const overallScore =
    academic.score +
    work.score +
    achievement.score;

  return {

    overallScore,

    academic,

    work,

    achievement,

    strengths: [
      ...academic.strengths,
      ...work.strengths,
    ],

    weaknesses: [
      ...academic.weaknesses,
      ...work.weaknesses,
    ],

    recommendations: [
      ...work.recommendations,
    ],

    summary:
      `Overall MBA Profile Score: ${overallScore}/100`,
  };
}
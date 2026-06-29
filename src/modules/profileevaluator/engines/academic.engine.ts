import { StudentProfile } from "../interfaces/profile.interface";

export interface AcademicResult {
  score: number;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
}
export function evaluateAcademics(
  profile: StudentProfile
): AcademicResult {

    const tenth = profile.tenthpercentage ?? 0;
const twelfth = profile.twelfthpercentage ?? 0;
const graduation = profile.graduationscore ?? 0;
  let academicScore = 0;
  let academicAnalysis = "";

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // 10th
  if (tenth >= 90) {
    academicScore += 15;
    strengths.push("Outstanding 10th academic performance.");
  } else if (tenth >= 80) {
    academicScore += 10;
    strengths.push("Strong 10th academic record.");
  } else if (tenth >= 70) {
    academicScore += 5;
  } else {
    weaknesses.push("Low 10th percentage.");
  }

  // 12th
  if (twelfth >= 90) {
    academicScore += 15;
    strengths.push("Outstanding 12th academic performance.");
  } else if (twelfth >= 80) {
    academicScore += 10;
    strengths.push("Strong 12th academic record.");
  } else if (twelfth >= 70) {
    academicScore += 5;
  } else {
    weaknesses.push("Low 12th percentage.");
  }

  // Graduation
  if (graduation >= 8.5) {
    academicScore += 20;
    strengths.push("Excellent graduation performance.");
  } else if (graduation >= 7.5) {
    academicScore += 15;
    strengths.push("Good graduation performance.");
  } else if (graduation >= 6.5) {
    academicScore += 10;
  } else {
    weaknesses.push("Graduation score needs improvement.");
  }

  if (academicScore >= 45) {
    academicAnalysis =
      "Excellent academic consistency across all educational stages.";
  } else if (academicScore >= 30) {
    academicAnalysis =
      "Good academic profile with room for improvement.";
  } else if (academicScore >= 15) {
    academicAnalysis =
      "Average academic profile requiring stronger CAT performance.";
  } else {
    academicAnalysis =
      "Weak academic profile. CAT percentile and profile-building become very important.";
  }

  return {
  score: academicScore,
  analysis: academicAnalysis,
  strengths,
  weaknesses,
};
}
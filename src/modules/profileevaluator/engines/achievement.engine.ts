import { StudentProfile } from "../interfaces/profile.interface";

export interface AchievementResult {
  score: number;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export function evaluateAchievements(
  profile: StudentProfile
): AchievementResult {

  let score = 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  // Certifications
  if (profile.certifications) {
    score += 10;
    strengths.push(
      "Professional certifications strengthen your MBA profile."
    );
  } else {
    weaknesses.push(
      "No professional certifications found."
    );
    recommendations.push(
      "Complete industry-recognized certifications."
    );
  }

  // Leadership Activities
  if (profile.leadershipactivities) {
    score += 10;
    strengths.push(
      "Leadership activities demonstrate managerial potential."
    );
  } else {
    weaknesses.push(
      "Leadership activities are missing."
    );
    recommendations.push(
      "Participate in clubs, committees or lead social initiatives."
    );
  }

  // Competitions
  if (profile.competitions) {
    score += 10;
    strengths.push(
      "Participation in competitions improves your overall profile."
    );
  } else {
    weaknesses.push(
      "No competition participation found."
    );
    recommendations.push(
      "Participate in case competitions, hackathons or business contests."
    );
  }

  let analysis = "";

  if (score >= 25) {
    analysis =
      "Excellent extracurricular profile with strong leadership, certifications and competitive achievements.";
  } else if (score >= 15) {
    analysis =
      "Good extracurricular profile with scope for further enhancement.";
  } else if (score >= 5) {
    analysis =
      "Average extracurricular profile. Additional certifications and leadership activities are recommended.";
  } else {
    analysis =
      "Extracurricular profile is currently weak. Building achievements outside academics will significantly improve MBA admission chances.";
  }

  return {
    score,
    analysis,
    strengths,
    weaknesses,
    recommendations,
  };
}

import { StudentProfile } from "../interfaces/profile.interface";
export interface WorkExperienceResult {
  score: number;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export function evaluateWorkExperience(profile: StudentProfile): WorkExperienceResult {
  let score = 0;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  const months = profile.experiencemonths ?? 0;
  const internships = profile.internshipcount ?? 0;

  // Work Experience

  if (months === 0) {
    weaknesses.push("No full-time work experience.");
    recommendations.push(
      "Gain internships, live projects or certifications to strengthen your MBA profile."
    );
  }

  else if (months <= 12) {
    score += 10;
    strengths.push("Some work experience.");
  }

  else if (months <= 24) {
    score += 18;
    strengths.push("Good work experience.");
  }

  else if (months <= 36) {
    score += 25;
    strengths.push("Strong work experience.");
  }

  else {
    score += 30;
    strengths.push("Excellent work experience.");
  }

  // Internship

  if (internships === 0) {
    weaknesses.push("No internship experience.");
  }

  else if (internships === 1) {
    score += 4;
  }

  else if (internships === 2) {
    score += 7;
  }

  else {
    score += 10;
    strengths.push("Multiple internships completed.");
  }

  // Leadership

  if (profile.leadershipexperience) {
    score += 8;
    strengths.push("Leadership experience demonstrated.");
  }

  else {
    weaknesses.push("Leadership exposure is limited.");
  }

  // Final Analysis

  let analysis = "";

  if (score >= 40) {
    analysis =
      "Outstanding professional profile with strong work exposure and leadership potential.";
  }

  else if (score >= 25) {
    analysis =
      "Good work experience that strengthens MBA admission prospects.";
  }

  else if (score >= 12) {
    analysis =
      "Limited work experience. CAT performance and profile building will play an important role.";
  }

  else {
    analysis =
      "Current profile resembles that of a fresher. Focus on internships, projects and certifications.";
  }

  return {
    score,
    analysis,
    strengths,
    weaknesses,
    recommendations,
  };
}
import { StudentProfile } from "../interfaces/profile.interface";

export interface GapAnalysisResult {
  analysis: string;
  weaknesses: string[];
}

export function evaluateGapAnalysis(
  profile: StudentProfile
): GapAnalysisResult {
  const weaknesses: string[] = [];

  if ((profile.tenthpercentage ?? 0) < 80) {
    weaknesses.push("Improve Class X academic profile.");
  }

  if ((profile.twelfthpercentage ?? 0) < 80) {
    weaknesses.push("Improve Class XII academic profile.");
  }

  if ((profile.graduationscore ?? 0) < 8) {
    weaknesses.push(
      "Graduation CGPA is below the preferred level for top MBA colleges."
    );
  }

  if (!profile.isexperienced) {
    weaknesses.push("No full-time work experience.");
  }

  if ((profile.internshipcount ?? 0) === 0) {
    weaknesses.push("No internship experience.");
  }

  if (!profile.certifications) {
    weaknesses.push("Professional certifications are missing.");
  }

  if (!profile.leadershipactivities) {
    weaknesses.push("Leadership exposure is limited.");
  }

  if (!profile.competitions) {
    weaknesses.push("No participation in competitions or achievements.");
  }

  return {
    analysis:
      weaknesses.length > 0
        ? weaknesses.join(" ")
        : "No major weaknesses detected. Overall profile is balanced.",
    weaknesses,
  };
}
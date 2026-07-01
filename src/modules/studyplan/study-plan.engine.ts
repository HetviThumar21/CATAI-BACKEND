import {
  studentprofile,
  profileevaluation,
} from "@prisma/client";

export interface StudyPlanContext {
  profile: studentprofile;
  latestReport: profileevaluation;

  strengths: string[];
  weaknesses: string[];
  weakTopicNames: string[];
  recommendations: string[];
  
  mockTests: any[];
  topicPerformance: any[];
}

export interface StudyPlanResult {
  roadmap: string;
  monthlyPlan: string;
  weeklyPlan: string;
  dailyTasks: string;
  revisionPlan: string;
}

export class StudyPlanEngine {
  generate(context: StudyPlanContext): StudyPlanResult {
    return {
      roadmap: this.buildRoadmap(context),
      monthlyPlan: this.buildMonthlyPlan(context),
      weeklyPlan: this.buildWeeklyPlan(context),
      dailyTasks: this.buildDailyTasks(context),
      revisionPlan: this.buildRevisionPlan(context),
    };
  }

  private buildRoadmap(context: StudyPlanContext): string {
  const {
    profile,
    latestReport,
    strengths,
    weaknesses,
    weakTopicNames,
    recommendations,
  } = context;

  return `
Target Exam: ${profile.targetexam ?? "CAT"}

Target Percentile: ${profile.targetpercentile ?? 90}

Current Profile Score: ${latestReport.overallscore}/100

==================================================
STRENGTH ANALYSIS
==================================================
${
  strengths.length
    ? strengths.map((s) => `• ${s}`).join("\n")
    : "• Yet to identify"
}

==================================================
AREAS TO IMPROVE
==================================================
${
  weaknesses.length
    ? weaknesses.map((w) => `• ${w}`).join("\n")
    : "• None"
}

==================================================
TOP PRIORITY TOPICS
==================================================
${
  weakTopicNames.length
    ? weakTopicNames.map((t) => `• ${t}`).join("\n")
    : "• Strengthen Quant, DILR and VARC fundamentals."
}

==================================================
AI RECOMMENDATIONS
==================================================
${
  recommendations.length
    ? recommendations.map((r) => `• ${r}`).join("\n")
    : "• Continue your current preparation strategy."
}
`;
}

  private buildMonthlyPlan(context: StudyPlanContext): string {
    return "";
  }

  private buildWeeklyPlan(
  context: StudyPlanContext,
): string {

  const {
    profile,
    weakTopicNames,
  } = context;

  const studyHours =
    profile.dailystudyhours ?? 3;

  const firstTopic =
    weakTopicNames[0] ?? "Quantitative Aptitude";

  const secondTopic =
    weakTopicNames[1] ?? "Data Interpretation & Logical Reasoning";

  const thirdTopic =
    weakTopicNames[2] ?? "Verbal Ability & Reading Comprehension";

  return `
Monday
• ${firstTopic}
• Concept Building

Tuesday
• ${secondTopic}
• Practice Sets

Wednesday
• ${thirdTopic}
• Reading & Accuracy

Thursday
• Mixed Practice
• Weak Topic Revision

Friday
• Sectional Test

Saturday
• Mock Test
• Error Analysis

Sunday
• Weekly Revision
• Strategy Planning

Daily Study Time
${studyHours} Hours
`;
}

  private buildDailyTasks(
  context: StudyPlanContext,
): string {

  const {
    profile,
    weakTopicNames,
    recommendations,
  } = context;

  const studyHours =
    profile.dailystudyhours ?? 3;

  const tasks: string[] = [];

  tasks.push(`Daily Study Time: ${studyHours} Hours`);

  tasks.push("");

  tasks.push("Priority Topics:");

  if (weakTopicNames.length) {
    weakTopicNames.forEach(topic => {
      tasks.push(`• ${topic}`);
    });
  } else {
    tasks.push("• Quantitative Aptitude");
    tasks.push("• Data Interpretation & Logical Reasoning");
    tasks.push("• Verbal Ability & Reading Comprehension");
  }

  tasks.push("");

  tasks.push("Daily Activities:");

  tasks.push("• Learn one new concept");

  tasks.push("• Solve 25-30 quality questions");

  tasks.push("• Revise previous topics");

  tasks.push("• Analyse mistakes");

  tasks.push("• Read for 30 minutes");

  tasks.push("");

  tasks.push("AI Suggestions:");

  recommendations.forEach(r => {
    tasks.push(`• ${r}`);
  });

  return tasks.join("\n");
}

  private buildRevisionPlan(
  context: StudyPlanContext,
): string {

  const {
    profile,
    latestReport,
  } = context;

  const plan: string[] = [];

  plan.push("Weekly Revision");

  plan.push("• Revise all topics every Sunday.");

  plan.push("");

  plan.push("Mock Test Strategy");

  if (latestReport.overallscore >= 80) {
    plan.push("• 2 Full-Length Mock Tests every week.");
  } else if (latestReport.overallscore >= 60) {
    plan.push("• 1 Full-Length Mock Test every week.");
  } else {
    plan.push("• 1 Sectional Test every week.");
    plan.push("• 1 Full-Length Mock every 2 weeks.");
  }

  plan.push("");

  plan.push("Revision Cycle");

  plan.push("• Maintain an error notebook.");
  plan.push("• Reattempt incorrect questions after 7 days.");
  plan.push("• Track improvement every week.");
  plan.push("• Revise formulas and shortcuts daily.");

  plan.push("");

  plan.push(`Target Exam: ${profile.targetexam ?? "CAT"}`);
  plan.push(`Target Percentile: ${profile.targetpercentile ?? 90}`);

  return plan.join("\n");
}
}
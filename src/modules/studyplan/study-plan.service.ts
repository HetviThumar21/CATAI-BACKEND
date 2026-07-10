import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  StudyPlanEngine,
} from "./study-plan.engine";

@Injectable()
export class StudyPlanService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async generate(
    userId: string,
    dto: any,
) {
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


    const latestReport =
      await this.prisma.profileevaluation.findFirst({
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

    const weakTopics =
  await this.prisma.topicPerformance.findMany({
    where: {
      userId,
      accuracy: {
        lt: 70,
      },
    },
    orderBy: {
      accuracy: 'asc',
    },
    take: 5,
  });

const weakTopicNames =
  weakTopics.map(t => t.topic);

  const strengths: string[] = [];

if ((profile.tenthpercentage ?? 0) >= 85)
  strengths.push("Strong Academic Foundation");

if ((profile.twelfthpercentage ?? 0) >= 85)
  strengths.push("Consistent School Performance");

if ((profile.graduationscore ?? 0) >= 8)
  strengths.push("Good Graduation Performance");

if (profile.isexperienced)
  strengths.push("Work Experience");

if ((profile.internshipcount ?? 0) > 0)
 {
  strengths.push(
    `${profile.internshipcount ?? 0} Internship${
      (profile.internshipcount ?? 0) > 1 ? "s" : ""
    }`
  );
}
if (profile.leadershipexperience)
  strengths.push("Leadership Experience");

if (profile.certifications?.trim())
  strengths.push("Professional Certifications");

if (profile.competitions?.trim())
  strengths.push("Competition Participation");

if (profile.graduationstream?.trim())
  strengths.push(`${profile.graduationstream} Background`);

const weaknesses: string[] = [];

if ((profile.tenthpercentage ?? 0) < 70)
  weaknesses.push("Low 10th Percentage");

if ((profile.twelfthpercentage ?? 0) < 70)
  weaknesses.push("Low 12th Percentage");

if ((profile.graduationscore ?? 0) < 7)
  weaknesses.push("Low Graduation Score");

weaknesses.push(...weakTopicNames);

if (!profile.isexperienced)
  weaknesses.push("Limited Industry Exposure");

if ((profile.dailystudyhours ?? 0) < 3)
  weaknesses.push("Low Daily Study Time");

if (!profile.certifications?.trim())
  weaknesses.push("No Professional Certifications");

if (!profile.competitions?.trim())
  weaknesses.push("Limited Competitive Exposure");



const planContext = {
  profile,
  latestReport,

  strengths,
  weaknesses,
  weakTopicNames,

  recommendations: [] as string[],

  mockTests: [],

  topicPerformance: [],
};

if ((profile.tenthpercentage ?? 0) < 70) {
  planContext.recommendations.push(
    "Compensate lower school academics with an exceptional CAT percentile."
  );
}

if ((profile.graduationscore ?? 0) < 7) {
  planContext.recommendations.push(
    "Strengthen your profile through certifications, live projects, and internships."
  );
}

if (!profile.isexperienced) {
  planContext.recommendations.push(
    "Build industry exposure through internships, freelancing, research projects, or volunteering."
  );
}

if ((profile.dailystudyhours ?? 0) < 3) {
  planContext.recommendations.push(
    "Increase study time gradually to at least 3–4 focused hours per day."
  );
}

if (!profile.certifications?.trim()) {
  planContext.recommendations.push(
    "Complete at least two industry-recognized certifications before CAT."
  );
}



console.log("Study Plan Context", planContext);

// Override profile values with Wizard values
planContext.profile.targetexam =
  dto.targetExam ?? planContext.profile.targetexam;

planContext.profile.targetpercentile =
  dto.targetPercentile
    ? Number(dto.targetPercentile.toString().replace("+", ""))
    : planContext.profile.targetpercentile;

planContext.profile.targetcolleges =
  Array.isArray(dto.targetColleges)
    ? dto.targetColleges.join(", ")
    : dto.targetColleges ?? planContext.profile.targetcolleges;

planContext.profile.attemptyear =
  dto.attemptYear
    ? Number(dto.attemptYear)
    : planContext.profile.attemptyear;

const engine = new StudyPlanEngine();
console.log("========== DTO ==========");
console.log(dto);

console.log("Target Exam =>", dto.targetExam);
console.log("Target Percentile =>", dto.targetPercentile);
console.log("Target Colleges =>", dto.targetColleges);
console.log("Attempt Year =>", dto.attemptYear);

const generatedPlan =
  engine.generate(planContext);

console.log("========== GENERATED PLAN ==========");
console.log(generatedPlan);

  console.log("========== GENERATED PLAN ==========");
console.log(generatedPlan);
console.log("Monthly Plan:", generatedPlan.monthlyPlan);
console.log("Weekly Plan:", generatedPlan.weeklyPlan);
console.log("Daily Tasks:", generatedPlan.dailyTasks);
console.log("Revision Plan:", generatedPlan.revisionPlan);
console.log("====================================");


        const attemptYear = Number(
  dto.attemptYear ??
  profile.attemptyear ??
  new Date().getFullYear()
);
// Assume CAT/SNAP exam is on 30 November of the selected year
const examDate = new Date(attemptYear, 10, 30);
   const studyPlan = await this.prisma.studyplan.create({
  data: {
    userid: userId,

    targetexam:
      dto.targetExam ?? profile.targetexam ?? "CAT",

    targetpercentile:
      dto.targetPercentile
        ? Number(dto.targetPercentile.toString().replace("+", ""))
        : (profile.targetpercentile ?? 90),

    targetcolleges:
      Array.isArray(dto.targetColleges)
        ? dto.targetColleges.join(", ")
        : dto.targetColleges ?? profile.targetcolleges ?? null,

    attemptyear:
      dto.attemptYear?.toString() ??
      profile.attemptyear?.toString() ??
      null,

    examdate: examDate,

    roadmap: generatedPlan.roadmap,
    monthlyplan: generatedPlan.monthlyPlan,
    weeklyplan: generatedPlan.weeklyPlan,
    dailytasks: generatedPlan.dailyTasks,
    revisionplan: generatedPlan.revisionPlan,
  },
});


// DO NOT REMOVE THIS COMMENT
// Today's dynamic tasks will be created here.


const subjectTopics: Record<string, string[]> = {
  "Quantitative Aptitude": [
    "Arithmetic",
    "Percentages",
    "Profit & Loss",
    "Simple Interest",
    "Compound Interest",
    "Time & Work",
    "Time Speed Distance",
    "Ratio & Proportion",
    "Averages",
    "Mixtures & Allegations",
    "Algebra",
    "Geometry",
    "Mensuration",
    "Permutation & Combination",
    "Probability",
    "Number System",
    "Modern Math",
  ],

  DILR: [
    "Linear Arrangement",
    "Circular Arrangement",
    "Blood Relations",
    "Direction Sense",
    "Games & Tournament",
    "Selection",
    "Scheduling",
    "Caselets",
    "Tables DI",
    "Bar Graph DI",
    "Pie Chart DI",
    "Line Graph DI",
    "Venn Diagram",
    "Logical Reasoning",
    "Puzzles",
  ],

  VARC: [
    "Reading Comprehension",
    "Vocabulary",
    "Para Jumbles",
    "Odd One Out",
    "Summary Questions",
    "Sentence Completion",
    "Grammar",
    "Critical Reasoning",
    "Inference",
    "Tone of Passage",
  ],
};

const generatedTasks: {
  subject: string;
  topic: string;
  priority: string;
}[] = [];

// 1. Add weak topics first (Highest Priority)
for (const weakTopic of weakTopicNames) {
  let subject = "Quantitative Aptitude";

  if (
    weakTopic.toLowerCase().includes("reading") ||
    weakTopic.toLowerCase().includes("grammar") ||
    weakTopic.toLowerCase().includes("vocabulary") ||
    weakTopic.toLowerCase().includes("para")
  ) {
    subject = "VARC";
  } else if (
    weakTopic.toLowerCase().includes("logical") ||
    weakTopic.toLowerCase().includes("arrangement") ||
    weakTopic.toLowerCase().includes("blood") ||
    weakTopic.toLowerCase().includes("puzzle") ||
    weakTopic.toLowerCase().includes("graph") ||
    weakTopic.toLowerCase().includes("caselet")
  ) {
    subject = "DILR";
  }

  generatedTasks.push({
    subject,
    topic: weakTopic,
    priority: "Critical",
  });
}

// 2. Add remaining syllabus
Object.entries(subjectTopics).forEach(([subject, topics]) => {
  topics.forEach((topic, index) => {

    if (
      generatedTasks.some(
        t => t.topic.toLowerCase() === topic.toLowerCase()
      )
    ) {
      return;
    }

    generatedTasks.push({
      subject,
      topic,
      priority: index < 6 ? "High" : "Medium",
    });

  });
});

for (const item of generatedTasks) {
  const task = await this.prisma.studyTask.create({
    data: {
      studyPlanId: studyPlan.id,

      userId,

      subject: item.subject,

      topic: item.topic,

      priority: item.priority,

      duration:
        item.priority === "Critical"
          ? 90
          : item.priority === "High"
          ? 60
          : 45,

      status: "PENDING",

      resources: {
  topic: item.topic,

  videos: [
    {
      title: `${item.topic} Complete Lecture`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        item.topic + " CAT"
      )}`,
    },
    {
      title: `${item.topic} Short Tricks`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        item.topic + " shortcuts"
      )}`,
    },
  ],

  pdfs: [
    {
      title: `${item.topic} Notes`,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        item.topic + " pdf CAT"
      )}`,
    },
  ],

  practice: [
    {
      title: `${item.topic} Practice Questions`,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        item.topic + " practice questions CAT"
      )}`,
    },
  ],

  mocks: [
    {
      title: `${item.topic} Mock Test`,
      url: `https://www.google.com/search?q=${encodeURIComponent(
        item.topic + " mock test"
      )}`,
    },
  ],
},
    },
  });

  console.log("TASK CREATED =>", task.topic);
}
return studyPlan;  }

  async latest(userId: string) {
    return this.prisma.studyplan.findFirst({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  async history(userId: string) {
    return this.prisma.studyplan.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  }

  
  async getOne(id: string) {
  return this.prisma.studyplan.findUnique({
    where: {
      id,
    },
  });
}

async getTasks(userId: string) {
  console.log("========== GET TASKS ==========");
  console.log("User ID:", userId);

  const tasks = await this.prisma.studyTask.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("Tasks Found:", tasks.length);
  console.log(tasks);

  return tasks;
}
}

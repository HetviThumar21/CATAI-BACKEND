import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resources = [

    // =======================
// Arithmetic
// =======================

{
  title: "Arithmetic Complete Course",
  topic: "Arithmetic",
  section: "QA",
  type: "VIDEO",
  difficulty: "Beginner",
  source: "YouTube",
  url: "https://www.youtube.com/results?search_query=CAT+Arithmetic",
},

{
  title: "Arithmetic Formula Notes",
  topic: "Arithmetic",
  section: "QA",
  type: "PDF",
  difficulty: "Beginner",
  source: "MBAOS",
  url: "https://drive.google.com/",
},

{
  title: "Arithmetic Practice Set 1",
  topic: "Arithmetic",
  section: "QA",
  type: "PRACTICE",
  difficulty: "Easy",
  source: "MBAOS",
  url: "https://example.com",
},

{
  title: "CAT Arithmetic PYQs",
  topic: "Arithmetic",
  section: "QA",
  type: "PYQ",
  difficulty: "Medium",
  source: "CAT",
  url: "https://example.com",
},

{
  title: "Arithmetic Sectional Mock",
  topic: "Arithmetic",
  section: "QA",
  type: "MOCK",
  difficulty: "Medium",
  source: "MBAOS",
  url: "https://example.com",
},

// =======================
// Reading Comprehension
// =======================

{
  title: "Reading Comprehension Complete Course",
  topic: "Reading Comprehension",
  section: "VARC",
  type: "VIDEO",
  difficulty: "Medium",
  source: "YouTube",
  url: "https://www.youtube.com/results?search_query=CAT+Reading+Comprehension",
},

{
  title: "RC Notes",
  topic: "Reading Comprehension",
  section: "VARC",
  type: "PDF",
  difficulty: "Medium",
  source: "MBAOS",
  url: "https://drive.google.com/",
},

{
  title: "RC Practice Set",
  topic: "Reading Comprehension",
  section: "VARC",
  type: "PRACTICE",
  difficulty: "Medium",
  source: "MBAOS",
  url: "https://example.com",
},

];
const syllabus = {
  QA: [
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
    "Number System",
    "Probability",
    "Permutation & Combination",
    "Modern Math",
  ],

  VARC: [
    "Vocabulary",
    "Grammar",
    "Para Jumbles",
    "Odd One Out",
    "Summary Questions",
    "Critical Reasoning",
    "Inference",
    "Sentence Completion",
    "Tone of Passage",
  ],

  DILR: [
    "Linear Arrangement",
    "Circular Arrangement",
    "Blood Relations",
    "Direction Sense",
    "Games & Tournament",
    "Scheduling",
    "Selection",
    "Tables DI",
    "Bar Graph DI",
    "Pie Chart DI",
    "Line Graph DI",
    "Caselets",
    "Logical Reasoning",
    "Puzzles",
    "Venn Diagram",
  ],
};
async function main() {
  // Seed your manually defined resources first
  for (const resource of resources) {
    await prisma.studyResource.create({
      data: resource,
    });
  }

  // Generate additional resources automatically
  for (const [section, topics] of Object.entries(syllabus)) {
    for (const topic of topics) {
      const generated = [
        {
          title: `${topic} Complete Lecture`,
          topic,
          section,
          type: "VIDEO",
          difficulty: "Medium",
          source: "YouTube",
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " CAT")}`,
        },
        {
          title: `${topic} PDF Notes`,
          topic,
          section,
          type: "PDF",
          difficulty: "Medium",
          source: "MBAOS",
          url: `https://www.google.com/search?q=${encodeURIComponent(topic + " pdf")}`,
        },
        {
          title: `${topic} Practice Set`,
          topic,
          section,
          type: "PRACTICE",
          difficulty: "Medium",
          source: "MBAOS",
          url: `https://www.google.com/search?q=${encodeURIComponent(topic + " practice questions")}`,
        },
        {
          title: `${topic} Sectional Mock`,
          topic,
          section,
          type: "MOCK",
          difficulty: "Medium",
          source: "MBAOS",
          url: `https://www.google.com/search?q=${encodeURIComponent(topic + " mock test")}`,
        },
        {
          title: `${topic} Previous Year Questions`,
          topic,
          section,
          type: "PYQ",
          difficulty: "Medium",
          source: "CAT",
          url: `https://www.google.com/search?q=${encodeURIComponent(topic + " previous year questions")}`,
        },
      ];

      for (const item of generated) {
        await prisma.studyResource.create({
          data: item,
        });
      }
    }
  }

  console.log("Study Resources Seeded Successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
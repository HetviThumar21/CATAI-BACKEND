import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exams = [
  "CAT",
  "XAT",
  "NMAT",
  "SNAP",
  "CMAT",
  "MAT",
  "ATMA",
  "GMAT",
  "GRE",
];

const sectionMap: Record<string, string[]> = {
  CAT: ["VARC", "DILR", "QA"],
  XAT: ["VA", "DM", "QA", "GK"],
  NMAT: ["Language", "Logical", "Quant"],
  SNAP: ["English", "Reasoning", "Quant"],
  CMAT: ["Language", "Quant", "Reasoning", "GK"],
  MAT: ["Language", "Math", "Reasoning"],
  ATMA: ["Verbal", "Quant", "Analytical"],
  GMAT: ["Verbal", "Quant", "DI"],
  GRE: ["Verbal", "Quant", "AWA"],
};

async function main() {
  await prisma.mockLibrary.deleteMany();

  for (const exam of exams) {
    // Full mocks
    for (let i = 1; i <= 15; i++) {
      const mock = await prisma.mockLibrary.create({
  data: {
    exam,
    category: "FULL",
    title: `${exam} Mock ${i}`,
    difficulty: i <= 5 ? "Easy" : i <= 10 ? "Medium" : "Hard",
    duration: 120,
    totalQuestions: 66,
  },
});
for (let q = 1; q <= 66; q++) {
  await prisma.mockQuestion.create({
    data: {
      mockId: mock.id,

      question: `${exam} Mock ${i} - Question ${q}`,

      optionA: "Option A",
      optionB: "Option B",
      optionC: "Option C",
      optionD: "Option D",

      correctAnswer: "A",

      explanation: "Explanation",

      difficulty:
        q <= 22
          ? "Easy"
          : q <= 44
          ? "Medium"
          : "Hard",
    },
  });
}
    }

    // Sectionals
    for (const section of sectionMap[exam]) {
      for (let i = 1; i <= 10; i++) {
        await prisma.mockLibrary.create({
          data: {
            exam,
            category: "SECTIONAL",
            section,
            title: `${section} Practice ${i}`,
            difficulty: i <= 3 ? "Easy" : i <= 7 ? "Medium" : "Hard",
            duration: 40,
            totalQuestions: 22,
          },
        });
      }
    }

    // Topics
    for (const section of sectionMap[exam]) {
      for (let i = 1; i <= 10; i++) {
        await prisma.mockLibrary.create({
          data: {
            exam,
            category: "TOPIC",
            section,
            topic: `${section} Topic ${i}`,
            title: `${section} Topic Test ${i}`,
            difficulty: i <= 3 ? "Easy" : i <= 7 ? "Medium" : "Hard",
            duration: 25,
            totalQuestions: 15,
          },
        });
      }
    }
  }

  console.log("Mock Library Seeded Successfully");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
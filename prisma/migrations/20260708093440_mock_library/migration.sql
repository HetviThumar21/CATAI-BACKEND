-- CreateTable
CREATE TABLE "MockLibrary" (
    "id" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "section" TEXT,
    "topic" TEXT,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockQuestion" (
    "id" TEXT NOT NULL,
    "mockId" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT,
    "marks" DOUBLE PRECISION NOT NULL,
    "negativeMarks" DOUBLE PRECISION NOT NULL,
    "difficulty" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mockId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "correct" INTEGER NOT NULL,
    "wrong" INTEGER NOT NULL,
    "skipped" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MockQuestion" ADD CONSTRAINT "MockQuestion_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockAttempt" ADD CONSTRAINT "MockAttempt_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

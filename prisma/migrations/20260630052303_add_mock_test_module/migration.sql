-- CreateTable
CREATE TABLE "MockTest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "overallPercentile" DOUBLE PRECISION NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "varcScore" DOUBLE PRECISION NOT NULL,
    "dilrScore" DOUBLE PRECISION NOT NULL,
    "qaScore" DOUBLE PRECISION NOT NULL,
    "varcPercentile" DOUBLE PRECISION NOT NULL,
    "dilrPercentile" DOUBLE PRECISION NOT NULL,
    "qaPercentile" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "attemptedQuestions" INTEGER,
    "correctQuestions" INTEGER,
    "wrongQuestions" INTEGER,
    "timeTaken" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MockTest" ADD CONSTRAINT "MockTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

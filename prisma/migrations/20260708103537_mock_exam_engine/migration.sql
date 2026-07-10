/*
  Warnings:

  - You are about to drop the column `createdAt` on the `MockAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `timeTaken` on the `MockAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `exam` on the `MockQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `MockQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `MockQuestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MockAttempt" DROP CONSTRAINT "MockAttempt_mockId_fkey";

-- DropForeignKey
ALTER TABLE "MockQuestion" DROP CONSTRAINT "MockQuestion_mockId_fkey";

-- AlterTable
ALTER TABLE "MockAttempt" DROP COLUMN "createdAt",
DROP COLUMN "timeTaken",
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "percentile" SET DEFAULT 0,
ALTER COLUMN "correct" SET DEFAULT 0,
ALTER COLUMN "wrong" SET DEFAULT 0,
ALTER COLUMN "skipped" SET DEFAULT 0,
ALTER COLUMN "accuracy" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "MockQuestion" DROP COLUMN "exam",
DROP COLUMN "section",
DROP COLUMN "topic",
ALTER COLUMN "marks" SET DEFAULT 3,
ALTER COLUMN "negativeMarks" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "MockQuestion" ADD CONSTRAINT "MockQuestion_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockAttempt" ADD CONSTRAINT "MockAttempt_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

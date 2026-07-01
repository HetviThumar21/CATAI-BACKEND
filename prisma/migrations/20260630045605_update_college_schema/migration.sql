/*
  Warnings:

  - You are about to drop the `college` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cutoff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cutoff" DROP CONSTRAINT "cutoff_collegeid_fkey";

-- DropTable
DROP TABLE "college";

-- DropTable
DROP TABLE "cutoff";

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "establishedYear" INTEGER,
    "nirfRank" INTEGER,
    "fees" DOUBLE PRECISION,
    "avgPackage" DOUBLE PRECISION,
    "highestPackage" DOUBLE PRECISION,
    "officialWebsite" TEXT,
    "seats" INTEGER,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeCutoff" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "gender" TEXT,
    "academicBackground" TEXT,
    "overallPercentile" DOUBLE PRECISION NOT NULL,
    "varcCutoff" DOUBLE PRECISION,
    "dilrCutoff" DOUBLE PRECISION,
    "qaCutoff" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollegeCutoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticeQuestion" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "questionUrl" TEXT NOT NULL,
    "explanationUrl" TEXT NOT NULL,

    CONSTRAINT "PracticeQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyResource" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "StudyResource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollegeCutoff" ADD CONSTRAINT "CollegeCutoff_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "role" AS ENUM ('student', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'student',
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentprofile" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "tenthpercentage" DOUBLE PRECISION,
    "twelfthpercentage" DOUBLE PRECISION,
    "graduationscore" DOUBLE PRECISION,
    "graduationstream" TEXT,
    "isexperienced" BOOLEAN NOT NULL DEFAULT false,
    "experiencemonths" INTEGER,
    "targetpercentile" DOUBLE PRECISION,
    "targetcolleges" TEXT,
    "weakareas" TEXT,
    "dailystudyhours" INTEGER,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileevaluation" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "profilescore" DOUBLE PRECISION NOT NULL,
    "strengthanalysis" TEXT NOT NULL,
    "weaknessanalysis" TEXT NOT NULL,
    "improvementsuggestions" TEXT NOT NULL,
    "collegesuitability" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profileevaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studyplan" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "targetexam" TEXT NOT NULL,
    "targetpercentile" DOUBLE PRECISION NOT NULL,
    "examdate" TIMESTAMP(3) NOT NULL,
    "roadmap" TEXT NOT NULL,
    "monthlyplan" TEXT NOT NULL,
    "weeklyplan" TEXT NOT NULL,
    "dailytasks" TEXT NOT NULL,
    "revisionplan" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studyplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "college" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "college_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cutoff" (
    "id" TEXT NOT NULL,
    "collegeid" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "percentile" DOUBLE PRECISION NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cutoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminprompt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prompttext" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminprompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "studentprofile_userid_key" ON "studentprofile"("userid");

-- AddForeignKey
ALTER TABLE "studentprofile" ADD CONSTRAINT "studentprofile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileevaluation" ADD CONSTRAINT "profileevaluation_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studyplan" ADD CONSTRAINT "studyplan_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cutoff" ADD CONSTRAINT "cutoff_collegeid_fkey" FOREIGN KEY ("collegeid") REFERENCES "college"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

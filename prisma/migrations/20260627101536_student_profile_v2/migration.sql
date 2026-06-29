-- AlterTable
ALTER TABLE "studentprofile" ADD COLUMN     "attemptyear" INTEGER,
ADD COLUMN     "educationstage" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "internshipcount" INTEGER,
ADD COLUMN     "leadershipexperience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reservationcategory" TEXT;

/*
  Warnings:

  - You are about to drop the column `subject` on the `StudyResource` table. All the data in the column will be lost.
  - Added the required column `section` to the `StudyResource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudyResource" DROP COLUMN "subject",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "source" TEXT;

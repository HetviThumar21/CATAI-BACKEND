/*
  Warnings:

  - You are about to drop the column `improvementsuggestions` on the `profileevaluation` table. All the data in the column will be lost.
  - You are about to drop the column `profilescore` on the `profileevaluation` table. All the data in the column will be lost.
  - You are about to drop the column `strengthanalysis` on the `profileevaluation` table. All the data in the column will be lost.
  - You are about to drop the column `weaknessanalysis` on the `profileevaluation` table. All the data in the column will be lost.
  - Added the required column `academicanalysis` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `achievementsanalysis` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airecommendations` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examreadiness` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gapanalysis` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallscore` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilesummary` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roadmap` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workexperienceanalysis` to the `profileevaluation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `collegesuitability` on the `profileevaluation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "profileevaluation" DROP COLUMN "improvementsuggestions",
DROP COLUMN "profilescore",
DROP COLUMN "strengthanalysis",
DROP COLUMN "weaknessanalysis",
ADD COLUMN     "academicanalysis" TEXT NOT NULL,
ADD COLUMN     "achievementsanalysis" TEXT NOT NULL,
ADD COLUMN     "airecommendations" TEXT NOT NULL,
ADD COLUMN     "examreadiness" TEXT NOT NULL,
ADD COLUMN     "gapanalysis" TEXT NOT NULL,
ADD COLUMN     "overallscore" INTEGER NOT NULL,
ADD COLUMN     "profilesummary" TEXT NOT NULL,
ADD COLUMN     "roadmap" TEXT NOT NULL,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workexperienceanalysis" TEXT NOT NULL,
DROP COLUMN "collegesuitability",
ADD COLUMN     "collegesuitability" JSONB NOT NULL;

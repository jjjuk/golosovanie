/*
  Warnings:

  - You are about to drop the column `eventNameName` on the `EventStartTime` table. All the data in the column will be lost.
  - You are about to drop the column `eventStartTimeStartTime` on the `Vote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventStartTime" DROP CONSTRAINT "EventStartTime_eventNameName_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_eventStartTimeStartTime_fkey";

-- AlterTable
ALTER TABLE "EventStartTime" DROP COLUMN "eventNameName";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "eventStartTimeStartTime";

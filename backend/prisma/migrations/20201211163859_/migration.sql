/*
  Warnings:

  - You are about to drop the column `nameId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTimeId` on the `Event` table. All the data in the column will be lost.
  - The migration will change the primary key for the `EventName` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventName` table. All the data in the column will be lost.
  - The migration will change the primary key for the `EventStartTime` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventStartTime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_nameId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_startTimeId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "nameId",
DROP COLUMN "startTimeId";

-- AlterTable
ALTER TABLE "EventName" DROP CONSTRAINT "EventName_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "EventStartTime" DROP CONSTRAINT "EventStartTime_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("name")REFERENCES "EventName"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("startTime")REFERENCES "EventStartTime"("startTime") ON DELETE CASCADE ON UPDATE CASCADE;

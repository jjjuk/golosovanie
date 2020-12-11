/*
  Warnings:

  - The migration will change the primary key for the `EventName` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `EventStartTime` table. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `nameId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_name_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_startTime_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "nameId" INTEGER NOT NULL,
ADD COLUMN     "startTimeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventName" DROP CONSTRAINT "EventName_pkey",
ADD COLUMN "id" SERIAL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EventStartTime" DROP CONSTRAINT "EventStartTime_pkey",
ADD COLUMN "id" SERIAL,
ADD PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("nameId")REFERENCES "EventName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("startTimeId")REFERENCES "EventStartTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

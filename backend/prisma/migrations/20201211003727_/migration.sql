/*
  Warnings:

  - The migration will change the primary key for the `EventName` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventName` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventName" DROP CONSTRAINT "EventName_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "EventStartTime" (
    "startTime" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EventStartTime.startTime_unique" ON "EventStartTime"("startTime");

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("startTime")REFERENCES "EventStartTime"("startTime") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,startTime,pollId]` on the table `Event`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "unique_event";

-- CreateIndex
CREATE UNIQUE INDEX "unique_event" ON "Event"("name", "startTime", "pollId");

/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,startTime]` on the table `Event`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_event" ON "Event"("name", "startTime");

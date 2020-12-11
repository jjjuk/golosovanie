/*
  Warnings:

  - Added the required column `pollId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "pollId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY("pollId")REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

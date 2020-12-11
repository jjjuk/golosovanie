/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "eventId" INTEGER;

-- DropTable
DROP TABLE "_EventToUser";

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("eventId")REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `color` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `online` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
DROP COLUMN "online",
ALTER COLUMN "password" SET NOT NULL;

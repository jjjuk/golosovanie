-- AlterTable
ALTER TABLE "EventStartTime" ADD COLUMN     "eventNameName" TEXT;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "eventStartTimeStartTime" TEXT;

-- AddForeignKey
ALTER TABLE "EventStartTime" ADD FOREIGN KEY("eventNameName")REFERENCES "EventName"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY("eventStartTimeStartTime")REFERENCES "EventStartTime"("startTime") ON DELETE SET NULL ON UPDATE CASCADE;

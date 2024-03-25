/*
  Warnings:

  - You are about to drop the column `post_id` on the `Draft` table. All the data in the column will be lost.
  - You are about to drop the column `pubDate` on the `Draft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Draft" DROP COLUMN "post_id",
DROP COLUMN "pubDate",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pubDate_included" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "draftId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "Draft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `user_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `advertisement_id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `news_source_id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `selected_fields` to the `News_source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `News_source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `draft_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_source_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_advertisement_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_news_source_id_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_post_id_fkey";

-- AlterTable
ALTER TABLE "News_source" ADD COLUMN     "content" TEXT,
ADD COLUMN     "creator" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "pubDate" TIMESTAMP(3),
ADD COLUMN     "selected_fields" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "user_id",
ADD COLUMN     "draft_id" INTEGER NOT NULL,
ADD COLUMN     "news_source_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "advertisement_id",
DROP COLUMN "news_source_id",
DROP COLUMN "post_id";

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_News_sourceToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_News_sourceToTag_AB_unique" ON "_News_sourceToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_News_sourceToTag_B_index" ON "_News_sourceToTag"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "Draft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_news_source_id_fkey" FOREIGN KEY ("news_source_id") REFERENCES "News_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_News_sourceToTag" ADD CONSTRAINT "_News_sourceToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "News_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_News_sourceToTag" ADD CONSTRAINT "_News_sourceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

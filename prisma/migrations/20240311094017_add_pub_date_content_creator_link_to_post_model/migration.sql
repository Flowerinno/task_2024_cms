/*
  Warnings:

  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_news_source_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "body",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "creator" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "pubDate" TIMESTAMP(3),
ALTER COLUMN "news_source_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_news_source_id_fkey" FOREIGN KEY ("news_source_id") REFERENCES "News_source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

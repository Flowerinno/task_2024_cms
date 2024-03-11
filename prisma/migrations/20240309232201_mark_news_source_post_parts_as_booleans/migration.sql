/*
  Warnings:

  - You are about to drop the column `content` on the `News_source` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `News_source` table. All the data in the column will be lost.
  - The `creator` column on the `News_source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `link` column on the `News_source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pubDate` column on the `News_source` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "News_source" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "content_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title_included" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "creator",
ADD COLUMN     "creator" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "link",
ADD COLUMN     "link" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "pubDate",
ADD COLUMN     "pubDate" BOOLEAN NOT NULL DEFAULT false;

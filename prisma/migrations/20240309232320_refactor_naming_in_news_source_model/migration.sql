/*
  Warnings:

  - You are about to drop the column `creator` on the `News_source` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `News_source` table. All the data in the column will be lost.
  - You are about to drop the column `pubDate` on the `News_source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News_source" DROP COLUMN "creator",
DROP COLUMN "link",
DROP COLUMN "pubDate",
ADD COLUMN     "creator_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_linkable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pubDate_included" BOOLEAN NOT NULL DEFAULT false;

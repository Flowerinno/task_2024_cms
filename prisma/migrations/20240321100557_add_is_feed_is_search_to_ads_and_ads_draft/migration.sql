/*
  Warnings:

  - You are about to drop the column `is_feed` on the `News_source` table. All the data in the column will be lost.
  - You are about to drop the column `is_search` on the `News_source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advertisement" ADD COLUMN     "is_feed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_search" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AdvertisementDraft" ADD COLUMN     "is_feed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_search" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "News_source" DROP COLUMN "is_feed",
DROP COLUMN "is_search";

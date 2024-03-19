/*
  Warnings:

  - You are about to drop the column `allowed_ad_per_page` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `image_backdrop_path` on the `Advertisement` table. All the data in the column will be lost.
  - Made the column `title` on table `Advertisement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "allowed_ad_per_page",
DROP COLUMN "company",
DROP COLUMN "content",
DROP COLUMN "image_backdrop_path",
ADD COLUMN     "link" TEXT,
ADD COLUMN     "media" TEXT,
ALTER COLUMN "title" SET NOT NULL;

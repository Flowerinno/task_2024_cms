/*
  Warnings:

  - You are about to drop the column `draft_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `is_draft` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_draft_id_fkey";

-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "content" TEXT,
ADD COLUMN     "creator" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "media" TEXT,
ADD COLUMN     "pubDate" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "draft_id",
DROP COLUMN "is_draft";

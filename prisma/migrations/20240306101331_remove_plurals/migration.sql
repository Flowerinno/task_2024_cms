/*
  Warnings:

  - You are about to drop the `Drafts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Drafts" DROP CONSTRAINT "Drafts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Drafts" DROP CONSTRAINT "Drafts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_advertisement_id_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_news_source_id_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_post_id_fkey";

-- DropTable
DROP TABLE "Drafts";

-- DropTable
DROP TABLE "Posts";

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "media" TEXT,
    "user_id" INTEGER NOT NULL,
    "is_draft" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "post_id" INTEGER,
    "advertisement_id" INTEGER,
    "news_source_id" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_label_key" ON "Tag"("label");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_news_source_id_fkey" FOREIGN KEY ("news_source_id") REFERENCES "News_source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

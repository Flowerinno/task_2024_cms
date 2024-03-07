/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
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

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drafts" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "company" TEXT,
    "title" TEXT,
    "content" TEXT,
    "image_backdrop_path" TEXT,
    "allowed_ad_per_page" INTEGER,
    "post_id" INTEGER,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News_source" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,

    CONSTRAINT "News_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "post_id" INTEGER,
    "advertisement_id" INTEGER,
    "news_source_id" INTEGER,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "News_source_name_key" ON "News_source"("name");

-- CreateIndex
CREATE UNIQUE INDEX "News_source_url_key" ON "News_source"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_label_key" ON "Tags"("label");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drafts" ADD CONSTRAINT "Drafts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drafts" ADD CONSTRAINT "Drafts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_news_source_id_fkey" FOREIGN KEY ("news_source_id") REFERENCES "News_source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "News_source" ADD COLUMN     "is_feed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_search" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "feed_ads_per_page" INTEGER NOT NULL DEFAULT 1,
    "search_ads_per_page" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

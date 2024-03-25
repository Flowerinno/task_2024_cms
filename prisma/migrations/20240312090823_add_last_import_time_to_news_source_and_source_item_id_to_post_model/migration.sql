-- AlterTable
ALTER TABLE "News_source" ADD COLUMN     "last_import_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "news_source_item_id" TEXT;

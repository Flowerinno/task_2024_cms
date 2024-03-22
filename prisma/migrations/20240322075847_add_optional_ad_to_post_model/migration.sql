-- DropForeignKey
ALTER TABLE "Advertisement" DROP CONSTRAINT "Advertisement_post_id_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "advertisement_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "Advertisement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

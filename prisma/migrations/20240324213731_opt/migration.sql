-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_user_id_fkey";

-- AlterTable
ALTER TABLE "Draft" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

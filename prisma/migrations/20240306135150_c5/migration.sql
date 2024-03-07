/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_account_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- DropIndex
DROP INDEX "account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionToken",
DROP COLUMN "userId",
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "account" DROP COLUMN "providerAccountId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

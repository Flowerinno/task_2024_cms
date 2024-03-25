-- CreateTable
CREATE TABLE "AdvertisementDraft" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "ad_priority" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "media" TEXT,

    CONSTRAINT "AdvertisementDraft_pkey" PRIMARY KEY ("id")
);

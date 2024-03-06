CREATE TYPE "Role" AS ENUM (
  'ADMIN',
  'USER'
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "email" varchar UNIQUE,
  "password" varchar,
  "username" varchar,
  "is_blocked" bool DEFAULT false,
  "is_deleted" bool DEFAULT false,
  "role" Role DEFAULT 'user',
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "title" varchar,
  "body" text,
  "media" varchar,
  "user_id" integer,
  "is_draft" bool DEFAULT false,
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "tags" tags[]
);

CREATE TABLE "drafts" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "post_id" integer,
  "user_id" integer
);

CREATE TABLE "advertisement" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_active" bool DEFAULT false,
  "is_deleted" bool DEFAULT false,
  "company" varchar,
  "title" varchar,
  "content" varchar,
  "image_backdrop_path" varchar,
  "allowed_ad_per_page" integer,
  "tags" tags[],
  "post_id" integer
);

CREATE TABLE "news_source" (
  "id" integer PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "name" varchar UNIQUE,
  "is_active" bool DEFAULT false,
  "is_deleted" bool DEFAULT false,
  "url" varchar UNIQUE,
  "tags" tags[]
);

CREATE TABLE "tags" (
  "id" integer PRIMARY KEY,
  "label" varchar UNIQUE,
  "is_active" bool DEFAULT true,
  "is_deleted" bool DEFAULT false,
  "post_id" integer,
  "advertisement_id" integer,
  "news_source_id" integer
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

ALTER TABLE "drafts" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "drafts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "advertisement" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "tags" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "tags" ADD FOREIGN KEY ("advertisement_id") REFERENCES "advertisement" ("id");

ALTER TABLE "tags" ADD FOREIGN KEY ("news_source_id") REFERENCES "news_source" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

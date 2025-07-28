import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_challenges_difficulty" AS ENUM('easy', 'medium', 'hard', 'extreme');
  CREATE TABLE "challenges_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"group" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "challenges" ADD COLUMN "difficulty" "enum_challenges_difficulty" DEFAULT 'easy';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "challenges_rels" ADD CONSTRAINT "challenges_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "challenges_rels" ADD CONSTRAINT "challenges_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "challenges_rels_order_idx" ON "challenges_rels" USING btree ("order");
  CREATE INDEX "challenges_rels_parent_idx" ON "challenges_rels" USING btree ("parent_id");
  CREATE INDEX "challenges_rels_path_idx" ON "challenges_rels" USING btree ("path");
  CREATE INDEX "challenges_rels_tags_id_idx" ON "challenges_rels" USING btree ("tags_id");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "challenges_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  DROP INDEX "payload_locked_documents_rels_tags_id_idx";
  ALTER TABLE "challenges" DROP COLUMN "difficulty";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tags_id";
  DROP TYPE "public"."enum_challenges_difficulty";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "challenges_test_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task" jsonb NOT NULL,
  	"expected" jsonb NOT NULL,
  	"test" varchar NOT NULL
  );
  
  CREATE TABLE "challenges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"initial_code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "challenges_id" integer;
  ALTER TABLE "challenges_test_cases" ADD CONSTRAINT "challenges_test_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "challenges_test_cases_order_idx" ON "challenges_test_cases" USING btree ("_order");
  CREATE INDEX "challenges_test_cases_parent_id_idx" ON "challenges_test_cases" USING btree ("_parent_id");
  CREATE INDEX "challenges_updated_at_idx" ON "challenges" USING btree ("updated_at");
  CREATE INDEX "challenges_created_at_idx" ON "challenges" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_challenges_fk" FOREIGN KEY ("challenges_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_challenges_id_idx" ON "payload_locked_documents_rels" USING btree ("challenges_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges_test_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "challenges" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "challenges_test_cases" CASCADE;
  DROP TABLE "challenges" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_challenges_fk";
  
  DROP INDEX "payload_locked_documents_rels_challenges_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "challenges_id";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "challenge_user_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"challenge_id" integer NOT NULL,
  	"user_id" integer NOT NULL,
  	"solution" varchar NOT NULL,
  	"annotations" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "challenge_user_submissions_id" integer;
  ALTER TABLE "challenge_user_submissions" ADD CONSTRAINT "challenge_user_submissions_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "challenge_user_submissions" ADD CONSTRAINT "challenge_user_submissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "challenge_user_submissions_challenge_idx" ON "challenge_user_submissions" USING btree ("challenge_id");
  CREATE INDEX "challenge_user_submissions_user_idx" ON "challenge_user_submissions" USING btree ("user_id");
  CREATE INDEX "challenge_user_submissions_updated_at_idx" ON "challenge_user_submissions" USING btree ("updated_at");
  CREATE INDEX "challenge_user_submissions_created_at_idx" ON "challenge_user_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_challenge_user_submissions_fk" FOREIGN KEY ("challenge_user_submissions_id") REFERENCES "public"."challenge_user_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_challenge_user_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("challenge_user_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenge_user_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "challenge_user_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_challenge_user_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_challenge_user_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "challenge_user_submissions_id";`)
}

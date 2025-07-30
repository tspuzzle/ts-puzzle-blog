import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "author_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_author_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "tags_id" integer;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_users_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_tags_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_author_id_users_id_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_tags_fk";
  
  DROP INDEX "posts_author_idx";
  DROP INDEX "posts_rels_tags_id_idx";
  DROP INDEX "_posts_v_version_version_author_idx";
  DROP INDEX "_posts_v_rels_tags_id_idx";
  ALTER TABLE "posts" DROP COLUMN "author_id";
  ALTER TABLE "posts_rels" DROP COLUMN "tags_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_author_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "tags_id";`)
}

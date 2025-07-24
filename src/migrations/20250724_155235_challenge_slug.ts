import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges" ADD COLUMN "slug" varchar;
  ALTER TABLE "challenges" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX "challenges_slug_idx" ON "challenges" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "challenges_slug_idx";
  ALTER TABLE "challenges" DROP COLUMN "slug";
  ALTER TABLE "challenges" DROP COLUMN "slug_lock";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges" ADD COLUMN "internal_notes" varchar;
  ALTER TABLE "challenges" ADD COLUMN "internal_number" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges" DROP COLUMN "internal_notes";
  ALTER TABLE "challenges" DROP COLUMN "internal_number";`)
}

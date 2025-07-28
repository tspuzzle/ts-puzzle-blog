import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges" ALTER COLUMN "difficulty" SET NOT NULL;
  ALTER TABLE "challenges" ADD COLUMN "visible" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "challenges" ALTER COLUMN "difficulty" DROP NOT NULL;
  ALTER TABLE "challenges" DROP COLUMN "visible";`)
}

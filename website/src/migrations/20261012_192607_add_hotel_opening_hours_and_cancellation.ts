import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "hotels_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "_hotels_v_version_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "hotels" ADD COLUMN "cancellation_policy" varchar;
  ALTER TABLE "_hotels_v" ADD COLUMN "version_cancellation_policy" varchar;
  ALTER TABLE "hotels_opening_hours" ADD CONSTRAINT "hotels_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_opening_hours" ADD CONSTRAINT "_hotels_v_version_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hotels_opening_hours_order_idx" ON "hotels_opening_hours" USING btree ("_order");
  CREATE INDEX "hotels_opening_hours_parent_id_idx" ON "hotels_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_version_opening_hours_order_idx" ON "_hotels_v_version_opening_hours" USING btree ("_order");
  CREATE INDEX "_hotels_v_version_opening_hours_parent_id_idx" ON "_hotels_v_version_opening_hours" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hotels_opening_hours" CASCADE;
  DROP TABLE "_hotels_v_version_opening_hours" CASCADE;
  ALTER TABLE "hotels" DROP COLUMN "cancellation_policy";
  ALTER TABLE "_hotels_v" DROP COLUMN "version_cancellation_policy";`)
}

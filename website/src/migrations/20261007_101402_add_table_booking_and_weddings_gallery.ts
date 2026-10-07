import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "hotels_weddings_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "_hotels_v_version_weddings_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "hotels" ADD COLUMN "table_booking_url" varchar;
  ALTER TABLE "_hotels_v" ADD COLUMN "version_table_booking_url" varchar;
  ALTER TABLE "hotels_weddings_gallery" ADD CONSTRAINT "hotels_weddings_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_weddings_gallery" ADD CONSTRAINT "hotels_weddings_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_weddings_gallery" ADD CONSTRAINT "_hotels_v_version_weddings_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_weddings_gallery" ADD CONSTRAINT "_hotels_v_version_weddings_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hotels_weddings_gallery_order_idx" ON "hotels_weddings_gallery" USING btree ("_order");
  CREATE INDEX "hotels_weddings_gallery_parent_id_idx" ON "hotels_weddings_gallery" USING btree ("_parent_id");
  CREATE INDEX "hotels_weddings_gallery_image_idx" ON "hotels_weddings_gallery" USING btree ("image_id");
  CREATE INDEX "_hotels_v_version_weddings_gallery_order_idx" ON "_hotels_v_version_weddings_gallery" USING btree ("_order");
  CREATE INDEX "_hotels_v_version_weddings_gallery_parent_id_idx" ON "_hotels_v_version_weddings_gallery" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_version_weddings_gallery_image_idx" ON "_hotels_v_version_weddings_gallery" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hotels_weddings_gallery" CASCADE;
  DROP TABLE "_hotels_v_version_weddings_gallery" CASCADE;
  ALTER TABLE "hotels" DROP COLUMN "table_booking_url";
  ALTER TABLE "_hotels_v" DROP COLUMN "version_table_booking_url";`)
}

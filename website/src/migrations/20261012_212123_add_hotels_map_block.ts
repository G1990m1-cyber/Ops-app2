import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hotels_blocks_hotels_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_hotels_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotels_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotels_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_hotels_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_hotels_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_hotels_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_hotels_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TABLE "hotels_blocks_hotels_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Where to find us',
  	"intro" varchar,
  	"style_tone" "enum_hotels_blocks_hotels_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_hotels_map_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_hotels_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Where to find us',
  	"intro" varchar,
  	"style_tone" "enum__hotels_v_blocks_hotels_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_hotels_map_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hotels_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Where to find us',
  	"intro" varchar,
  	"style_tone" "enum_pages_blocks_hotels_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_hotels_map_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hotels_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Where to find us',
  	"intro" varchar,
  	"style_tone" "enum__pages_v_blocks_hotels_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_hotels_map_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "hotels_blocks_hotels_map" ADD CONSTRAINT "hotels_blocks_hotels_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hotels_map" ADD CONSTRAINT "_hotels_v_blocks_hotels_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hotels_map" ADD CONSTRAINT "pages_blocks_hotels_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hotels_map" ADD CONSTRAINT "_pages_v_blocks_hotels_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hotels_blocks_hotels_map_order_idx" ON "hotels_blocks_hotels_map" USING btree ("_order");
  CREATE INDEX "hotels_blocks_hotels_map_parent_id_idx" ON "hotels_blocks_hotels_map" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_hotels_map_path_idx" ON "hotels_blocks_hotels_map" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_hotels_map_order_idx" ON "_hotels_v_blocks_hotels_map" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_hotels_map_parent_id_idx" ON "_hotels_v_blocks_hotels_map" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_hotels_map_path_idx" ON "_hotels_v_blocks_hotels_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_hotels_map_order_idx" ON "pages_blocks_hotels_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_hotels_map_parent_id_idx" ON "pages_blocks_hotels_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hotels_map_path_idx" ON "pages_blocks_hotels_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hotels_map_order_idx" ON "_pages_v_blocks_hotels_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hotels_map_parent_id_idx" ON "_pages_v_blocks_hotels_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hotels_map_path_idx" ON "_pages_v_blocks_hotels_map" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hotels_blocks_hotels_map" CASCADE;
  DROP TABLE "_hotels_v_blocks_hotels_map" CASCADE;
  DROP TABLE "pages_blocks_hotels_map" CASCADE;
  DROP TABLE "_pages_v_blocks_hotels_map" CASCADE;
  DROP TYPE "public"."enum_hotels_blocks_hotels_map_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_hotels_map_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_hotels_map_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_hotels_map_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_hotels_map_style_tone";
  DROP TYPE "public"."enum_pages_blocks_hotels_map_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hotels_map_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hotels_map_style_spacing";`)
}

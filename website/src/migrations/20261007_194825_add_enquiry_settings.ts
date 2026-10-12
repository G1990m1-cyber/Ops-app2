import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "enquiries" ADD COLUMN "auto_reply_sent" boolean;
  ALTER TABLE "site_settings" ADD COLUMN "enquiries_fallback_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "enquiries_copy_to" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "enquiries_auto_reply" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "enquiries_auto_reply_subject" varchar DEFAULT 'Thank you for your message';
  ALTER TABLE "site_settings" ADD COLUMN "enquiries_auto_reply_message" varchar DEFAULT 'Dear {name},
  
  Thank you for getting in touch with {hotel}. We have your message and will reply as soon as we can, usually within one working day.
  
  If your enquiry is urgent, please call us on {phone}.
  
  Warm regards,
  The team at {hotel}';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "enquiries" DROP COLUMN "auto_reply_sent";
  ALTER TABLE "site_settings" DROP COLUMN "enquiries_fallback_email";
  ALTER TABLE "site_settings" DROP COLUMN "enquiries_copy_to";
  ALTER TABLE "site_settings" DROP COLUMN "enquiries_auto_reply";
  ALTER TABLE "site_settings" DROP COLUMN "enquiries_auto_reply_subject";
  ALTER TABLE "site_settings" DROP COLUMN "enquiries_auto_reply_message";`)
}

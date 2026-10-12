import * as migration_20261006_220317_initial from './20261006_220317_initial';
import * as migration_20261007_101402_add_table_booking_and_weddings_gallery from './20261007_101402_add_table_booking_and_weddings_gallery';
import * as migration_20261007_115118_add_storage_prefix_fields from './20261007_115118_add_storage_prefix_fields';
import * as migration_20261007_194825_add_enquiry_settings from './20261007_194825_add_enquiry_settings';
import * as migration_20261012_192607_add_hotel_opening_hours_and_cancellation from './20261012_192607_add_hotel_opening_hours_and_cancellation';

export const migrations = [
  {
    up: migration_20261006_220317_initial.up,
    down: migration_20261006_220317_initial.down,
    name: '20261006_220317_initial',
  },
  {
    up: migration_20261007_101402_add_table_booking_and_weddings_gallery.up,
    down: migration_20261007_101402_add_table_booking_and_weddings_gallery.down,
    name: '20261007_101402_add_table_booking_and_weddings_gallery',
  },
  {
    up: migration_20261007_115118_add_storage_prefix_fields.up,
    down: migration_20261007_115118_add_storage_prefix_fields.down,
    name: '20261007_115118_add_storage_prefix_fields',
  },
  {
    up: migration_20261007_194825_add_enquiry_settings.up,
    down: migration_20261007_194825_add_enquiry_settings.down,
    name: '20261007_194825_add_enquiry_settings',
  },
  {
    up: migration_20261012_192607_add_hotel_opening_hours_and_cancellation.up,
    down: migration_20261012_192607_add_hotel_opening_hours_and_cancellation.down,
    name: '20261012_192607_add_hotel_opening_hours_and_cancellation'
  },
];

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hotels_facilities" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum_hotels_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_hotels_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_hotels_blocks_hero_height" AS ENUM('full', 'tall', 'short');
  CREATE TYPE "public"."enum_hotels_blocks_hero_overlay" AS ENUM('gradient', 'tint40', 'tint50', 'tint60');
  CREATE TYPE "public"."enum_hotels_blocks_text_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_text_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_text_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_text_with_image_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_hotels_blocks_text_with_image_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_hotels_blocks_text_with_image_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_hotels_blocks_text_with_image_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_text_with_image_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_gallery_source" AS ENUM('custom', 'hotel');
  CREATE TYPE "public"."enum_hotels_blocks_gallery_layout" AS ENUM('masonry', 'grid', 'strip');
  CREATE TYPE "public"."enum_hotels_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_hotels_blocks_gallery_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_gallery_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_room_cards_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum_hotels_blocks_room_cards_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_room_cards_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_room_cards_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_facilities_items_icon" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum_hotels_blocks_facilities_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum_hotels_blocks_facilities_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_facilities_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_facilities_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_menus_list_types" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum_hotels_blocks_menus_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_menus_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_menus_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_events_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_events_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_events_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_offers_layout" AS ENUM('cards', 'feature');
  CREATE TYPE "public"."enum_hotels_blocks_offers_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_offers_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_offers_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_testimonials_source" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."enum_hotels_blocks_testimonials_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_testimonials_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_testimonials_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_faq_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_faq_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_faq_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_hotels_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_hotels_blocks_cta_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_cta_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_cta_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_newsletter_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_newsletter_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_newsletter_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_enquiry_form_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_enquiry_form_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_enquiry_form_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'google-maps', 'other');
  CREATE TYPE "public"."enum_hotels_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_hotels_blocks_embed_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_embed_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_hotel_grid_layout" AS ENUM('grid', 'rows');
  CREATE TYPE "public"."enum_hotels_blocks_hotel_grid_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_hotels_blocks_hotel_grid_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_hotels_blocks_hotel_grid_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_hotels_price_range" AS ENUM('£', '££', '£££');
  CREATE TYPE "public"."enum_hotels_meta_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_hotels_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hotels_v_version_facilities" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum__hotels_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__hotels_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__hotels_v_blocks_hero_height" AS ENUM('full', 'tall', 'short');
  CREATE TYPE "public"."enum__hotels_v_blocks_hero_overlay" AS ENUM('gradient', 'tint40', 'tint50', 'tint60');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_with_image_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_with_image_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_with_image_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_with_image_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_text_with_image_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_gallery_source" AS ENUM('custom', 'hotel');
  CREATE TYPE "public"."enum__hotels_v_blocks_gallery_layout" AS ENUM('masonry', 'grid', 'strip');
  CREATE TYPE "public"."enum__hotels_v_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__hotels_v_blocks_gallery_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_gallery_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_room_cards_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum__hotels_v_blocks_room_cards_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_room_cards_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_room_cards_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_facilities_items_icon" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum__hotels_v_blocks_facilities_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum__hotels_v_blocks_facilities_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_facilities_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_facilities_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_menus_list_types" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum__hotels_v_blocks_menus_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_menus_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_menus_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_events_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_events_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_events_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_offers_layout" AS ENUM('cards', 'feature');
  CREATE TYPE "public"."enum__hotels_v_blocks_offers_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_offers_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_offers_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_testimonials_source" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."enum__hotels_v_blocks_testimonials_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_testimonials_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_testimonials_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_faq_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_faq_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_faq_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__hotels_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__hotels_v_blocks_cta_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_cta_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_cta_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_newsletter_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_newsletter_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_newsletter_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'google-maps', 'other');
  CREATE TYPE "public"."enum__hotels_v_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__hotels_v_blocks_embed_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_embed_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotel_grid_layout" AS ENUM('grid', 'rows');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__hotels_v_version_price_range" AS ENUM('£', '££', '£££');
  CREATE TYPE "public"."enum__hotels_v_version_meta_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum__hotels_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_rooms_features" AS ENUM('en-suite', 'bath', 'walk-in-shower', 'king-bed', 'super-king-bed', 'twin-option', 'sofa-bed', 'dog-friendly', 'ground-floor', 'accessible', 'view', 'seating-area', 'tea-coffee', 'smart-tv', 'wifi');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_version_features" AS ENUM('en-suite', 'bath', 'walk-in-shower', 'king-bed', 'super-king-bed', 'twin-option', 'sofa-bed', 'dog-friendly', 'ground-floor', 'accessible', 'view', 'seating-area', 'tea-coffee', 'smart-tv', 'wifi');
  CREATE TYPE "public"."enum__rooms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menus_type" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum_menus_format" AS ENUM('pdf', 'structured');
  CREATE TYPE "public"."enum_menus_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menus_v_version_type" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum__menus_v_version_format" AS ENUM('pdf', 'structured');
  CREATE TYPE "public"."enum__menus_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_offers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_hero_height" AS ENUM('full', 'tall', 'short');
  CREATE TYPE "public"."enum_pages_blocks_hero_overlay" AS ENUM('gradient', 'tint40', 'tint50', 'tint60');
  CREATE TYPE "public"."enum_pages_blocks_text_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_text_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_text_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_text_with_image_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_pages_blocks_text_with_image_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_text_with_image_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_text_with_image_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_text_with_image_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_gallery_source" AS ENUM('custom', 'hotel');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('masonry', 'grid', 'strip');
  CREATE TYPE "public"."enum_pages_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_gallery_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_gallery_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_room_cards_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_room_cards_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_room_cards_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_room_cards_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_facilities_items_icon" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum_pages_blocks_facilities_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_facilities_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_facilities_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_facilities_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_menus_list_types" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum_pages_blocks_menus_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_menus_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_menus_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_events_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_events_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_events_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_offers_layout" AS ENUM('cards', 'feature');
  CREATE TYPE "public"."enum_pages_blocks_offers_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_offers_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_offers_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_source" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_faq_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_faq_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_faq_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_cta_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_cta_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_cta_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_newsletter_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_enquiry_form_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_enquiry_form_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_enquiry_form_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'google-maps', 'other');
  CREATE TYPE "public"."enum_pages_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_pages_blocks_embed_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_embed_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_hotel_grid_layout" AS ENUM('grid', 'rows');
  CREATE TYPE "public"."enum_pages_blocks_hotel_grid_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum_pages_blocks_hotel_grid_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum_pages_blocks_hotel_grid_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_meta_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_height" AS ENUM('full', 'tall', 'short');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_overlay" AS ENUM('gradient', 'tint40', 'tint50', 'tint60');
  CREATE TYPE "public"."enum__pages_v_blocks_text_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_text_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_text_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_text_with_image_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__pages_v_blocks_text_with_image_links_link_appearance" AS ENUM('primary', 'secondary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_text_with_image_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_text_with_image_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_text_with_image_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_source" AS ENUM('custom', 'hotel');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('masonry', 'grid', 'strip');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_room_cards_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_room_cards_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_room_cards_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_room_cards_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_facilities_items_icon" AS ENUM('wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'dog-friendly', 'family', 'ev-charging', 'accessible', 'meetings', 'weddings', 'river', 'self-checkin', 'fireplace', 'bikes', 'walking', 'fishing', 'tea-coffee', 'tv');
  CREATE TYPE "public"."enum__pages_v_blocks_facilities_source" AS ENUM('hotel', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_facilities_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_facilities_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_facilities_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_menus_list_types" AS ENUM('food', 'drinks', 'breakfast', 'sunday', 'afternoon-tea', 'christmas', 'specials', 'children', 'other');
  CREATE TYPE "public"."enum__pages_v_blocks_menus_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_menus_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_menus_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_events_list_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_events_list_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_events_list_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_layout" AS ENUM('cards', 'feature');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_offers_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_source" AS ENUM('auto', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_map_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_map_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_newsletter_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_enquiry_form_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_enquiry_form_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_enquiry_form_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'google-maps', 'other');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_hotel_grid_layout" AS ENUM('grid', 'rows');
  CREATE TYPE "public"."enum__pages_v_blocks_hotel_grid_style_tone" AS ENUM('cream', 'sand', 'linen', 'charcoal');
  CREATE TYPE "public"."enum__pages_v_blocks_hotel_grid_style_spacing" AS ENUM('compact', 'normal', 'generous');
  CREATE TYPE "public"."enum__pages_v_blocks_hotel_grid_style_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_version_meta_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_source" AS ENUM('google', 'tripadvisor', 'booking', 'guestbook', 'email');
  CREATE TYPE "public"."enum_enquiries_subject" AS ENUM('stay', 'dining', 'event', 'wedding', 'other');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'replied', 'closed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'manager');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_navigation_header_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_navigation_footer_columns_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_navigation_legal_links_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TYPE "public"."enum_announcement_bar_link_type" AS ENUM('reference', 'custom', 'book');
  CREATE TABLE "hotels_facilities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_hotels_facilities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "hotels_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "hotels_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_hotels_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_hotels_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "hotels_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"height" "enum_hotels_blocks_hero_height" DEFAULT 'tall',
  	"overlay" "enum_hotels_blocks_hero_overlay" DEFAULT 'gradient',
  	"show_book_now" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"narrow" boolean DEFAULT true,
  	"style_tone" "enum_hotels_blocks_text_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_text_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_text_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_text_with_image_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_hotels_blocks_text_with_image_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_hotels_blocks_text_with_image_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "hotels_blocks_text_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_hotels_blocks_text_with_image_image_position" DEFAULT 'left',
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"style_tone" "enum_hotels_blocks_text_with_image_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_text_with_image_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "hotels_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_hotels_blocks_gallery_source" DEFAULT 'custom',
  	"layout" "enum_hotels_blocks_gallery_layout" DEFAULT 'masonry',
  	"columns" "enum_hotels_blocks_gallery_columns" DEFAULT '3',
  	"style_tone" "enum_hotels_blocks_gallery_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_gallery_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_room_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms',
  	"intro" varchar,
  	"source" "enum_hotels_blocks_room_cards_source" DEFAULT 'hotel',
  	"hotel_id" integer,
  	"style_tone" "enum_hotels_blocks_room_cards_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_room_cards_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_room_cards_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_facilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_hotels_blocks_facilities_items_icon",
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "hotels_blocks_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Facilities',
  	"source" "enum_hotels_blocks_facilities_source" DEFAULT 'hotel',
  	"style_tone" "enum_hotels_blocks_facilities_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_facilities_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_facilities_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_menus_list_types" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_hotels_blocks_menus_list_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "hotels_blocks_menus_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Menus',
  	"intro" varchar,
  	"hotel_id" integer,
  	"style_tone" "enum_hotels_blocks_menus_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_menus_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_menus_list_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What''s on',
  	"intro" varchar,
  	"hotel_id" integer,
  	"limit" numeric DEFAULT 6,
  	"style_tone" "enum_hotels_blocks_events_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_events_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_events_list_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Offers',
  	"intro" varchar,
  	"hotel_id" integer,
  	"layout" "enum_hotels_blocks_offers_layout" DEFAULT 'cards',
  	"limit" numeric DEFAULT 3,
  	"style_tone" "enum_hotels_blocks_offers_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_offers_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_offers_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What our guests say',
  	"source" "enum_hotels_blocks_testimonials_source" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"style_tone" "enum_hotels_blocks_testimonials_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_testimonials_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_testimonials_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Find us',
  	"hotel_id" integer,
  	"show_directions" boolean DEFAULT true,
  	"style_tone" "enum_hotels_blocks_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_map_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "hotels_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Good to know',
  	"style_tone" "enum_hotels_blocks_faq_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_faq_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_faq_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_hotels_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_hotels_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "hotels_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"background_image_id" integer,
  	"style_tone" "enum_hotels_blocks_cta_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_cta_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_cta_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"text" varchar DEFAULT 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.',
  	"consent_text" varchar DEFAULT 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.',
  	"style_tone" "enum_hotels_blocks_newsletter_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_newsletter_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_newsletter_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Send us a message',
  	"intro" varchar,
  	"hotel_id" integer,
  	"show_stay_fields" boolean DEFAULT true,
  	"style_tone" "enum_hotels_blocks_enquiry_form_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_enquiry_form_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_enquiry_form_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"provider" "enum_hotels_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum_hotels_blocks_embed_aspect" DEFAULT '16:9',
  	"style_tone" "enum_hotels_blocks_embed_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_embed_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels_blocks_hotel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our hotels',
  	"intro" varchar,
  	"layout" "enum_hotels_blocks_hotel_grid_layout" DEFAULT 'grid',
  	"style_tone" "enum_hotels_blocks_hotel_grid_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_hotels_blocks_hotel_grid_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_hotels_blocks_hotel_grid_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "hotels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"location" varchar,
  	"tagline" varchar,
  	"hero_media_id" integer,
  	"hero_poster_id" integer,
  	"intro" jsonb,
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"address_town" varchar,
  	"address_county" varchar,
  	"address_postcode" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"map_lat" numeric,
  	"map_lng" numeric,
  	"map_directions_url" varchar,
  	"directions" jsonb,
  	"social_facebook" varchar,
  	"social_instagram" varchar,
  	"social_tripadvisor" varchar,
  	"social_x" varchar,
  	"booking_url" varchar,
  	"check_in" varchar DEFAULT '3:00pm',
  	"check_out" varchar DEFAULT '11:00am',
  	"price_range" "enum_hotels_price_range",
  	"has_weddings" boolean,
  	"weddings_intro" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_twitter_card" "enum_hotels_meta_twitter_card" DEFAULT 'summary_large_image',
  	"meta_canonical_url" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"order" numeric DEFAULT 50,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_hotels_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "hotels_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer,
  	"rooms_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_hotels_v_version_facilities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__hotels_v_version_facilities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_hotels_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__hotels_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__hotels_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"height" "enum__hotels_v_blocks_hero_height" DEFAULT 'tall',
  	"overlay" "enum__hotels_v_blocks_hero_overlay" DEFAULT 'gradient',
  	"show_book_now" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"narrow" boolean DEFAULT true,
  	"style_tone" "enum__hotels_v_blocks_text_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_text_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_text_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_text_with_image_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__hotels_v_blocks_text_with_image_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__hotels_v_blocks_text_with_image_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_text_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__hotels_v_blocks_text_with_image_image_position" DEFAULT 'left',
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"style_tone" "enum__hotels_v_blocks_text_with_image_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_text_with_image_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__hotels_v_blocks_gallery_source" DEFAULT 'custom',
  	"layout" "enum__hotels_v_blocks_gallery_layout" DEFAULT 'masonry',
  	"columns" "enum__hotels_v_blocks_gallery_columns" DEFAULT '3',
  	"style_tone" "enum__hotels_v_blocks_gallery_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_gallery_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_room_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms',
  	"intro" varchar,
  	"source" "enum__hotels_v_blocks_room_cards_source" DEFAULT 'hotel',
  	"hotel_id" integer,
  	"style_tone" "enum__hotels_v_blocks_room_cards_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_room_cards_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_room_cards_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_facilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__hotels_v_blocks_facilities_items_icon",
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Facilities',
  	"source" "enum__hotels_v_blocks_facilities_source" DEFAULT 'hotel',
  	"style_tone" "enum__hotels_v_blocks_facilities_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_facilities_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_facilities_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_menus_list_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__hotels_v_blocks_menus_list_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_hotels_v_blocks_menus_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Menus',
  	"intro" varchar,
  	"hotel_id" integer,
  	"style_tone" "enum__hotels_v_blocks_menus_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_menus_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_menus_list_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What''s on',
  	"intro" varchar,
  	"hotel_id" integer,
  	"limit" numeric DEFAULT 6,
  	"style_tone" "enum__hotels_v_blocks_events_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_events_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_events_list_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Offers',
  	"intro" varchar,
  	"hotel_id" integer,
  	"layout" "enum__hotels_v_blocks_offers_layout" DEFAULT 'cards',
  	"limit" numeric DEFAULT 3,
  	"style_tone" "enum__hotels_v_blocks_offers_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_offers_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_offers_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What our guests say',
  	"source" "enum__hotels_v_blocks_testimonials_source" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"style_tone" "enum__hotels_v_blocks_testimonials_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_testimonials_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_testimonials_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Find us',
  	"hotel_id" integer,
  	"show_directions" boolean DEFAULT true,
  	"style_tone" "enum__hotels_v_blocks_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_map_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Good to know',
  	"style_tone" "enum__hotels_v_blocks_faq_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_faq_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_faq_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__hotels_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__hotels_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"background_image_id" integer,
  	"style_tone" "enum__hotels_v_blocks_cta_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_cta_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_cta_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"text" varchar DEFAULT 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.',
  	"consent_text" varchar DEFAULT 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.',
  	"style_tone" "enum__hotels_v_blocks_newsletter_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_newsletter_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_newsletter_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Send us a message',
  	"intro" varchar,
  	"hotel_id" integer,
  	"show_stay_fields" boolean DEFAULT true,
  	"style_tone" "enum__hotels_v_blocks_enquiry_form_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_enquiry_form_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_enquiry_form_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"provider" "enum__hotels_v_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum__hotels_v_blocks_embed_aspect" DEFAULT '16:9',
  	"style_tone" "enum__hotels_v_blocks_embed_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_embed_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v_blocks_hotel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our hotels',
  	"intro" varchar,
  	"layout" "enum__hotels_v_blocks_hotel_grid_layout" DEFAULT 'grid',
  	"style_tone" "enum__hotels_v_blocks_hotel_grid_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__hotels_v_blocks_hotel_grid_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__hotels_v_blocks_hotel_grid_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hotels_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_location" varchar,
  	"version_tagline" varchar,
  	"version_hero_media_id" integer,
  	"version_hero_poster_id" integer,
  	"version_intro" jsonb,
  	"version_address_line1" varchar,
  	"version_address_line2" varchar,
  	"version_address_town" varchar,
  	"version_address_county" varchar,
  	"version_address_postcode" varchar,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_map_lat" numeric,
  	"version_map_lng" numeric,
  	"version_map_directions_url" varchar,
  	"version_directions" jsonb,
  	"version_social_facebook" varchar,
  	"version_social_instagram" varchar,
  	"version_social_tripadvisor" varchar,
  	"version_social_x" varchar,
  	"version_booking_url" varchar,
  	"version_check_in" varchar DEFAULT '3:00pm',
  	"version_check_out" varchar DEFAULT '11:00am',
  	"version_price_range" "enum__hotels_v_version_price_range",
  	"version_has_weddings" boolean,
  	"version_weddings_intro" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_twitter_card" "enum__hotels_v_version_meta_twitter_card" DEFAULT 'summary_large_image',
  	"version_meta_canonical_url" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 50,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__hotels_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_hotels_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer,
  	"rooms_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "rooms_features" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rooms_features",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rooms_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"hotel_id" integer,
  	"slug" varchar,
  	"sleeps" numeric DEFAULT 2,
  	"bed_type" varchar,
  	"from_price" numeric,
  	"short_description" varchar,
  	"description" jsonb,
  	"booking_url" varchar,
  	"order" numeric DEFAULT 50,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_rooms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_rooms_v_version_features" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__rooms_v_version_features",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_rooms_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_hotel_id" integer,
  	"version_slug" varchar,
  	"version_sleeps" numeric DEFAULT 2,
  	"version_bed_type" varchar,
  	"version_from_price" numeric,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_booking_url" varchar,
  	"version_order" numeric DEFAULT 50,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__rooms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "menus_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"dietary_v" boolean,
  	"dietary_vg" boolean,
  	"dietary_gf" boolean,
  	"dietary_df" boolean,
  	"dietary_n" boolean
  );
  
  CREATE TABLE "menus_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "menus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hotel_id" integer,
  	"type" "enum_menus_type" DEFAULT 'food',
  	"valid_from" timestamp(3) with time zone,
  	"valid_to" timestamp(3) with time zone,
  	"format" "enum_menus_format" DEFAULT 'pdf',
  	"pdf_id" integer,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menus_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_menus_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"dietary_v" boolean,
  	"dietary_vg" boolean,
  	"dietary_gf" boolean,
  	"dietary_df" boolean,
  	"dietary_n" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_menus_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_menus_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hotel_id" integer,
  	"version_type" "enum__menus_v_version_type" DEFAULT 'food',
  	"version_valid_from" timestamp(3) with time zone,
  	"version_valid_to" timestamp(3) with time zone,
  	"version_format" "enum__menus_v_version_format" DEFAULT 'pdf',
  	"version_pdf_id" integer,
  	"version_note" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menus_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hotel_id" integer,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"image_id" integer,
  	"summary" varchar,
  	"description" jsonb,
  	"price" varchar,
  	"ticket_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hotel_id" integer,
  	"version_start" timestamp(3) with time zone,
  	"version_end" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_price" varchar,
  	"version_ticket_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hotel_id" integer,
  	"image_id" integer,
  	"summary" varchar,
  	"terms" jsonb,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"promo_code" varchar,
  	"link_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_offers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_offers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hotel_id" integer,
  	"version_image_id" integer,
  	"version_summary" varchar,
  	"version_terms" jsonb,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_promo_code" varchar,
  	"version_link_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__offers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"height" "enum_pages_blocks_hero_height" DEFAULT 'tall',
  	"overlay" "enum_pages_blocks_hero_overlay" DEFAULT 'gradient',
  	"show_book_now" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"narrow" boolean DEFAULT true,
  	"style_tone" "enum_pages_blocks_text_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_text_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_text_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_with_image_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_text_with_image_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_text_with_image_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_text_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_text_with_image_image_position" DEFAULT 'left',
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"style_tone" "enum_pages_blocks_text_with_image_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_text_with_image_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_pages_blocks_gallery_source" DEFAULT 'custom',
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'masonry',
  	"columns" "enum_pages_blocks_gallery_columns" DEFAULT '3',
  	"style_tone" "enum_pages_blocks_gallery_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_gallery_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_room_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms',
  	"intro" varchar,
  	"source" "enum_pages_blocks_room_cards_source" DEFAULT 'hotel',
  	"hotel_id" integer,
  	"style_tone" "enum_pages_blocks_room_cards_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_room_cards_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_room_cards_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_facilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_facilities_items_icon",
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Facilities',
  	"source" "enum_pages_blocks_facilities_source" DEFAULT 'hotel',
  	"style_tone" "enum_pages_blocks_facilities_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_facilities_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_facilities_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menus_list_types" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_menus_list_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menus_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Menus',
  	"intro" varchar,
  	"hotel_id" integer,
  	"style_tone" "enum_pages_blocks_menus_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_menus_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_menus_list_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What''s on',
  	"intro" varchar,
  	"hotel_id" integer,
  	"limit" numeric DEFAULT 6,
  	"style_tone" "enum_pages_blocks_events_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_events_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_events_list_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Offers',
  	"intro" varchar,
  	"hotel_id" integer,
  	"layout" "enum_pages_blocks_offers_layout" DEFAULT 'cards',
  	"limit" numeric DEFAULT 3,
  	"style_tone" "enum_pages_blocks_offers_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_offers_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_offers_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What our guests say',
  	"source" "enum_pages_blocks_testimonials_source" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"style_tone" "enum_pages_blocks_testimonials_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_testimonials_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_testimonials_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Find us',
  	"hotel_id" integer,
  	"show_directions" boolean DEFAULT true,
  	"style_tone" "enum_pages_blocks_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_map_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Good to know',
  	"style_tone" "enum_pages_blocks_faq_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_faq_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_faq_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"background_image_id" integer,
  	"style_tone" "enum_pages_blocks_cta_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_cta_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_cta_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"text" varchar DEFAULT 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.',
  	"consent_text" varchar DEFAULT 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.',
  	"style_tone" "enum_pages_blocks_newsletter_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_newsletter_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_newsletter_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Send us a message',
  	"intro" varchar,
  	"hotel_id" integer,
  	"show_stay_fields" boolean DEFAULT true,
  	"style_tone" "enum_pages_blocks_enquiry_form_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_enquiry_form_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_enquiry_form_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"provider" "enum_pages_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum_pages_blocks_embed_aspect" DEFAULT '16:9',
  	"style_tone" "enum_pages_blocks_embed_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_embed_style_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hotel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our hotels',
  	"intro" varchar,
  	"layout" "enum_pages_blocks_hotel_grid_layout" DEFAULT 'grid',
  	"style_tone" "enum_pages_blocks_hotel_grid_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum_pages_blocks_hotel_grid_style_spacing" DEFAULT 'normal',
  	"style_align" "enum_pages_blocks_hotel_grid_style_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_twitter_card" "enum_pages_meta_twitter_card" DEFAULT 'summary_large_image',
  	"meta_canonical_url" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"show_in_sitemap" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer,
  	"rooms_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"poster_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"height" "enum__pages_v_blocks_hero_height" DEFAULT 'tall',
  	"overlay" "enum__pages_v_blocks_hero_overlay" DEFAULT 'gradient',
  	"show_book_now" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"narrow" boolean DEFAULT true,
  	"style_tone" "enum__pages_v_blocks_text_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_text_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_text_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_with_image_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_text_with_image_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_text_with_image_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_text_with_image_image_position" DEFAULT 'left',
  	"eyebrow" varchar,
  	"rich_text" jsonb,
  	"style_tone" "enum__pages_v_blocks_text_with_image_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_text_with_image_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__pages_v_blocks_gallery_source" DEFAULT 'custom',
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'masonry',
  	"columns" "enum__pages_v_blocks_gallery_columns" DEFAULT '3',
  	"style_tone" "enum__pages_v_blocks_gallery_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_gallery_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_room_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms',
  	"intro" varchar,
  	"source" "enum__pages_v_blocks_room_cards_source" DEFAULT 'hotel',
  	"hotel_id" integer,
  	"style_tone" "enum__pages_v_blocks_room_cards_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_room_cards_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_room_cards_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_facilities_items_icon",
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_facilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Facilities',
  	"source" "enum__pages_v_blocks_facilities_source" DEFAULT 'hotel',
  	"style_tone" "enum__pages_v_blocks_facilities_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_facilities_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_facilities_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menus_list_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_menus_list_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menus_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Menus',
  	"intro" varchar,
  	"hotel_id" integer,
  	"style_tone" "enum__pages_v_blocks_menus_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_menus_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_menus_list_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What''s on',
  	"intro" varchar,
  	"hotel_id" integer,
  	"limit" numeric DEFAULT 6,
  	"style_tone" "enum__pages_v_blocks_events_list_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_events_list_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_events_list_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Offers',
  	"intro" varchar,
  	"hotel_id" integer,
  	"layout" "enum__pages_v_blocks_offers_layout" DEFAULT 'cards',
  	"limit" numeric DEFAULT 3,
  	"style_tone" "enum__pages_v_blocks_offers_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_offers_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_offers_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What our guests say',
  	"source" "enum__pages_v_blocks_testimonials_source" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"style_tone" "enum__pages_v_blocks_testimonials_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_testimonials_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_testimonials_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Find us',
  	"hotel_id" integer,
  	"show_directions" boolean DEFAULT true,
  	"style_tone" "enum__pages_v_blocks_map_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_map_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Good to know',
  	"style_tone" "enum__pages_v_blocks_faq_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_faq_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_faq_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"background_image_id" integer,
  	"style_tone" "enum__pages_v_blocks_cta_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_cta_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_cta_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Stay in the loop',
  	"text" varchar DEFAULT 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.',
  	"consent_text" varchar DEFAULT 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.',
  	"style_tone" "enum__pages_v_blocks_newsletter_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_newsletter_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_newsletter_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Send us a message',
  	"intro" varchar,
  	"hotel_id" integer,
  	"show_stay_fields" boolean DEFAULT true,
  	"style_tone" "enum__pages_v_blocks_enquiry_form_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_enquiry_form_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_enquiry_form_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"provider" "enum__pages_v_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum__pages_v_blocks_embed_aspect" DEFAULT '16:9',
  	"style_tone" "enum__pages_v_blocks_embed_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_embed_style_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hotel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Our hotels',
  	"intro" varchar,
  	"layout" "enum__pages_v_blocks_hotel_grid_layout" DEFAULT 'grid',
  	"style_tone" "enum__pages_v_blocks_hotel_grid_style_tone" DEFAULT 'cream',
  	"style_spacing" "enum__pages_v_blocks_hotel_grid_style_spacing" DEFAULT 'normal',
  	"style_align" "enum__pages_v_blocks_hotel_grid_style_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_twitter_card" "enum__pages_v_version_meta_twitter_card" DEFAULT 'summary_large_image',
  	"version_meta_canonical_url" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_show_in_sitemap" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer,
  	"rooms_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"created_by_id" integer,
  	"blurhash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"source" "enum_testimonials_source" DEFAULT 'google',
  	"hotel_id" integer,
  	"rating" numeric DEFAULT 5,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"subject" "enum_enquiries_subject",
  	"arrival" timestamp(3) with time zone,
  	"departure" timestamp(3) with time zone,
  	"guests" numeric,
  	"message" varchar NOT NULL,
  	"hotel_id" integer,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"notes" varchar,
  	"source_path" varchar,
  	"email_sent" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'manager' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"hotels_id" integer
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"hotels_id" integer,
  	"rooms_id" integer,
  	"menus_id" integer,
  	"events_id" integer,
  	"offers_id" integer,
  	"pages_id" integer,
  	"media_id" integer,
  	"testimonials_id" integer,
  	"enquiries_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'GR Hotels' NOT NULL,
  	"tagline" varchar DEFAULT 'Characterful hotels and pubs with rooms across Britain',
  	"logo_id" integer,
  	"logo_light_id" integer,
  	"seo_title_suffix" varchar DEFAULT 'GR Hotels',
  	"seo_default_description" varchar,
  	"seo_default_image_id" integer,
  	"seo_twitter_handle" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"contact_company_line" varchar,
  	"social_facebook" varchar,
  	"social_instagram" varchar,
  	"social_linkedin" varchar,
  	"social_x" varchar,
  	"booking_picker_title" varchar DEFAULT 'Where would you like to stay?',
  	"booking_picker_intro" varchar DEFAULT 'Choose a hotel and we will take you to its booking page.',
  	"booking_utm_source" varchar DEFAULT 'grhotels.co.uk',
  	"booking_utm_medium" varchar DEFAULT 'website',
  	"cookies_title" varchar DEFAULT 'A word about cookies',
  	"cookies_text" varchar DEFAULT 'We use cookies to understand how the site is used and to measure our advertising. Analytics only run if you accept.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_header_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"footer_note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer
  );
  
  CREATE TABLE "announcement_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"text" varchar,
  	"has_link" boolean,
  	"link_type" "enum_announcement_bar_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_book_hotel_id" integer,
  	"link_label" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_bar_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"hotels_id" integer
  );
  
  ALTER TABLE "hotels_facilities" ADD CONSTRAINT "hotels_facilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_gallery" ADD CONSTRAINT "hotels_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_gallery" ADD CONSTRAINT "hotels_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hero_links" ADD CONSTRAINT "hotels_blocks_hero_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hero_links" ADD CONSTRAINT "hotels_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hero" ADD CONSTRAINT "hotels_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hero" ADD CONSTRAINT "hotels_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hero" ADD CONSTRAINT "hotels_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_text" ADD CONSTRAINT "hotels_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_text_with_image_links" ADD CONSTRAINT "hotels_blocks_text_with_image_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_text_with_image_links" ADD CONSTRAINT "hotels_blocks_text_with_image_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_text_with_image" ADD CONSTRAINT "hotels_blocks_text_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_text_with_image" ADD CONSTRAINT "hotels_blocks_text_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_gallery_images" ADD CONSTRAINT "hotels_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_gallery_images" ADD CONSTRAINT "hotels_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_gallery" ADD CONSTRAINT "hotels_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_room_cards" ADD CONSTRAINT "hotels_blocks_room_cards_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_room_cards" ADD CONSTRAINT "hotels_blocks_room_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_facilities_items" ADD CONSTRAINT "hotels_blocks_facilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_facilities" ADD CONSTRAINT "hotels_blocks_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_menus_list_types" ADD CONSTRAINT "hotels_blocks_menus_list_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hotels_blocks_menus_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_menus_list" ADD CONSTRAINT "hotels_blocks_menus_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_menus_list" ADD CONSTRAINT "hotels_blocks_menus_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_events_list" ADD CONSTRAINT "hotels_blocks_events_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_events_list" ADD CONSTRAINT "hotels_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_offers" ADD CONSTRAINT "hotels_blocks_offers_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_offers" ADD CONSTRAINT "hotels_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_testimonials" ADD CONSTRAINT "hotels_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_map" ADD CONSTRAINT "hotels_blocks_map_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_map" ADD CONSTRAINT "hotels_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_faq_items" ADD CONSTRAINT "hotels_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_faq" ADD CONSTRAINT "hotels_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_cta_links" ADD CONSTRAINT "hotels_blocks_cta_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_cta_links" ADD CONSTRAINT "hotels_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_cta" ADD CONSTRAINT "hotels_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_cta" ADD CONSTRAINT "hotels_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_newsletter" ADD CONSTRAINT "hotels_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_enquiry_form" ADD CONSTRAINT "hotels_blocks_enquiry_form_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_blocks_enquiry_form" ADD CONSTRAINT "hotels_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_embed" ADD CONSTRAINT "hotels_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_blocks_hotel_grid" ADD CONSTRAINT "hotels_blocks_hotel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_hero_poster_id_media_id_fk" FOREIGN KEY ("hero_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_rels" ADD CONSTRAINT "hotels_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_rels" ADD CONSTRAINT "hotels_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_rels" ADD CONSTRAINT "hotels_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_rels" ADD CONSTRAINT "hotels_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_rels" ADD CONSTRAINT "hotels_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_facilities" ADD CONSTRAINT "_hotels_v_version_facilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_gallery" ADD CONSTRAINT "_hotels_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_version_gallery" ADD CONSTRAINT "_hotels_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hero_links" ADD CONSTRAINT "_hotels_v_blocks_hero_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hero_links" ADD CONSTRAINT "_hotels_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hero" ADD CONSTRAINT "_hotels_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hero" ADD CONSTRAINT "_hotels_v_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hero" ADD CONSTRAINT "_hotels_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_text" ADD CONSTRAINT "_hotels_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_text_with_image_links" ADD CONSTRAINT "_hotels_v_blocks_text_with_image_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_text_with_image_links" ADD CONSTRAINT "_hotels_v_blocks_text_with_image_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_text_with_image" ADD CONSTRAINT "_hotels_v_blocks_text_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_text_with_image" ADD CONSTRAINT "_hotels_v_blocks_text_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_gallery_images" ADD CONSTRAINT "_hotels_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_gallery_images" ADD CONSTRAINT "_hotels_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_gallery" ADD CONSTRAINT "_hotels_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_room_cards" ADD CONSTRAINT "_hotels_v_blocks_room_cards_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_room_cards" ADD CONSTRAINT "_hotels_v_blocks_room_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_facilities_items" ADD CONSTRAINT "_hotels_v_blocks_facilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_facilities" ADD CONSTRAINT "_hotels_v_blocks_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_menus_list_types" ADD CONSTRAINT "_hotels_v_blocks_menus_list_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hotels_v_blocks_menus_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_menus_list" ADD CONSTRAINT "_hotels_v_blocks_menus_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_menus_list" ADD CONSTRAINT "_hotels_v_blocks_menus_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_events_list" ADD CONSTRAINT "_hotels_v_blocks_events_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_events_list" ADD CONSTRAINT "_hotels_v_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_offers" ADD CONSTRAINT "_hotels_v_blocks_offers_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_offers" ADD CONSTRAINT "_hotels_v_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_testimonials" ADD CONSTRAINT "_hotels_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_map" ADD CONSTRAINT "_hotels_v_blocks_map_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_map" ADD CONSTRAINT "_hotels_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_faq_items" ADD CONSTRAINT "_hotels_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_faq" ADD CONSTRAINT "_hotels_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_cta_links" ADD CONSTRAINT "_hotels_v_blocks_cta_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_cta_links" ADD CONSTRAINT "_hotels_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_cta" ADD CONSTRAINT "_hotels_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_cta" ADD CONSTRAINT "_hotels_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_newsletter" ADD CONSTRAINT "_hotels_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_enquiry_form" ADD CONSTRAINT "_hotels_v_blocks_enquiry_form_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_enquiry_form" ADD CONSTRAINT "_hotels_v_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_embed" ADD CONSTRAINT "_hotels_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_blocks_hotel_grid" ADD CONSTRAINT "_hotels_v_blocks_hotel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v" ADD CONSTRAINT "_hotels_v_parent_id_hotels_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v" ADD CONSTRAINT "_hotels_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v" ADD CONSTRAINT "_hotels_v_version_hero_poster_id_media_id_fk" FOREIGN KEY ("version_hero_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v" ADD CONSTRAINT "_hotels_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hotels_v_rels" ADD CONSTRAINT "_hotels_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hotels_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_rels" ADD CONSTRAINT "_hotels_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_rels" ADD CONSTRAINT "_hotels_v_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_rels" ADD CONSTRAINT "_hotels_v_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hotels_v_rels" ADD CONSTRAINT "_hotels_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_features" ADD CONSTRAINT "rooms_features_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_features" ADD CONSTRAINT "_rooms_v_version_features_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_parent_id_rooms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_hotel_id_hotels_id_fk" FOREIGN KEY ("version_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus_sections_items" ADD CONSTRAINT "menus_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus_sections" ADD CONSTRAINT "menus_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menus" ADD CONSTRAINT "menus_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v_version_sections_items" ADD CONSTRAINT "_menus_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menus_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menus_v_version_sections" ADD CONSTRAINT "_menus_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menus_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_parent_id_menus_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_version_hotel_id_hotels_id_fk" FOREIGN KEY ("version_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menus_v" ADD CONSTRAINT "_menus_v_version_pdf_id_media_id_fk" FOREIGN KEY ("version_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_hotel_id_hotels_id_fk" FOREIGN KEY ("version_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_hotel_id_hotels_id_fk" FOREIGN KEY ("version_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text" ADD CONSTRAINT "pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_links" ADD CONSTRAINT "pages_blocks_text_with_image_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_links" ADD CONSTRAINT "pages_blocks_text_with_image_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image" ADD CONSTRAINT "pages_blocks_text_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image" ADD CONSTRAINT "pages_blocks_text_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_room_cards" ADD CONSTRAINT "pages_blocks_room_cards_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_room_cards" ADD CONSTRAINT "pages_blocks_room_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facilities_items" ADD CONSTRAINT "pages_blocks_facilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_facilities" ADD CONSTRAINT "pages_blocks_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menus_list_types" ADD CONSTRAINT "pages_blocks_menus_list_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_menus_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menus_list" ADD CONSTRAINT "pages_blocks_menus_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menus_list" ADD CONSTRAINT "pages_blocks_menus_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_list" ADD CONSTRAINT "pages_blocks_events_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_events_list" ADD CONSTRAINT "pages_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers" ADD CONSTRAINT "pages_blocks_offers_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers" ADD CONSTRAINT "pages_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enquiry_form" ADD CONSTRAINT "pages_blocks_enquiry_form_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_enquiry_form" ADD CONSTRAINT "pages_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hotel_grid" ADD CONSTRAINT "pages_blocks_hotel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text" ADD CONSTRAINT "_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_with_image_links" ADD CONSTRAINT "_pages_v_blocks_text_with_image_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_with_image_links" ADD CONSTRAINT "_pages_v_blocks_text_with_image_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_with_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_with_image" ADD CONSTRAINT "_pages_v_blocks_text_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_with_image" ADD CONSTRAINT "_pages_v_blocks_text_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_room_cards" ADD CONSTRAINT "_pages_v_blocks_room_cards_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_room_cards" ADD CONSTRAINT "_pages_v_blocks_room_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facilities_items" ADD CONSTRAINT "_pages_v_blocks_facilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_facilities" ADD CONSTRAINT "_pages_v_blocks_facilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menus_list_types" ADD CONSTRAINT "_pages_v_blocks_menus_list_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_menus_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menus_list" ADD CONSTRAINT "_pages_v_blocks_menus_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menus_list" ADD CONSTRAINT "_pages_v_blocks_menus_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_list" ADD CONSTRAINT "_pages_v_blocks_events_list_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_list" ADD CONSTRAINT "_pages_v_blocks_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers" ADD CONSTRAINT "_pages_v_blocks_offers_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers" ADD CONSTRAINT "_pages_v_blocks_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enquiry_form" ADD CONSTRAINT "_pages_v_blocks_enquiry_form_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enquiry_form" ADD CONSTRAINT "_pages_v_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hotel_grid" ADD CONSTRAINT "_pages_v_blocks_hotel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_hotel_id_hotels_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_image_id_media_id_fk" FOREIGN KEY ("seo_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal_links" ADD CONSTRAINT "navigation_legal_links_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_legal_links" ADD CONSTRAINT "navigation_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar" ADD CONSTRAINT "announcement_bar_link_book_hotel_id_hotels_id_fk" FOREIGN KEY ("link_book_hotel_id") REFERENCES "public"."hotels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bar_rels" ADD CONSTRAINT "announcement_bar_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hotels_facilities_order_idx" ON "hotels_facilities" USING btree ("order");
  CREATE INDEX "hotels_facilities_parent_idx" ON "hotels_facilities" USING btree ("parent_id");
  CREATE INDEX "hotels_gallery_order_idx" ON "hotels_gallery" USING btree ("_order");
  CREATE INDEX "hotels_gallery_parent_id_idx" ON "hotels_gallery" USING btree ("_parent_id");
  CREATE INDEX "hotels_gallery_image_idx" ON "hotels_gallery" USING btree ("image_id");
  CREATE INDEX "hotels_blocks_hero_links_order_idx" ON "hotels_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "hotels_blocks_hero_links_parent_id_idx" ON "hotels_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_hero_links_link_link_book_hotel_idx" ON "hotels_blocks_hero_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "hotels_blocks_hero_order_idx" ON "hotels_blocks_hero" USING btree ("_order");
  CREATE INDEX "hotels_blocks_hero_parent_id_idx" ON "hotels_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_hero_path_idx" ON "hotels_blocks_hero" USING btree ("_path");
  CREATE INDEX "hotels_blocks_hero_media_idx" ON "hotels_blocks_hero" USING btree ("media_id");
  CREATE INDEX "hotels_blocks_hero_poster_idx" ON "hotels_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "hotels_blocks_text_order_idx" ON "hotels_blocks_text" USING btree ("_order");
  CREATE INDEX "hotels_blocks_text_parent_id_idx" ON "hotels_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_text_path_idx" ON "hotels_blocks_text" USING btree ("_path");
  CREATE INDEX "hotels_blocks_text_with_image_links_order_idx" ON "hotels_blocks_text_with_image_links" USING btree ("_order");
  CREATE INDEX "hotels_blocks_text_with_image_links_parent_id_idx" ON "hotels_blocks_text_with_image_links" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_text_with_image_links_link_link_book_hotel_idx" ON "hotels_blocks_text_with_image_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "hotels_blocks_text_with_image_order_idx" ON "hotels_blocks_text_with_image" USING btree ("_order");
  CREATE INDEX "hotels_blocks_text_with_image_parent_id_idx" ON "hotels_blocks_text_with_image" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_text_with_image_path_idx" ON "hotels_blocks_text_with_image" USING btree ("_path");
  CREATE INDEX "hotels_blocks_text_with_image_image_idx" ON "hotels_blocks_text_with_image" USING btree ("image_id");
  CREATE INDEX "hotels_blocks_gallery_images_order_idx" ON "hotels_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "hotels_blocks_gallery_images_parent_id_idx" ON "hotels_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_gallery_images_image_idx" ON "hotels_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "hotels_blocks_gallery_order_idx" ON "hotels_blocks_gallery" USING btree ("_order");
  CREATE INDEX "hotels_blocks_gallery_parent_id_idx" ON "hotels_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_gallery_path_idx" ON "hotels_blocks_gallery" USING btree ("_path");
  CREATE INDEX "hotels_blocks_room_cards_order_idx" ON "hotels_blocks_room_cards" USING btree ("_order");
  CREATE INDEX "hotels_blocks_room_cards_parent_id_idx" ON "hotels_blocks_room_cards" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_room_cards_path_idx" ON "hotels_blocks_room_cards" USING btree ("_path");
  CREATE INDEX "hotels_blocks_room_cards_hotel_idx" ON "hotels_blocks_room_cards" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_facilities_items_order_idx" ON "hotels_blocks_facilities_items" USING btree ("_order");
  CREATE INDEX "hotels_blocks_facilities_items_parent_id_idx" ON "hotels_blocks_facilities_items" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_facilities_order_idx" ON "hotels_blocks_facilities" USING btree ("_order");
  CREATE INDEX "hotels_blocks_facilities_parent_id_idx" ON "hotels_blocks_facilities" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_facilities_path_idx" ON "hotels_blocks_facilities" USING btree ("_path");
  CREATE INDEX "hotels_blocks_menus_list_types_order_idx" ON "hotels_blocks_menus_list_types" USING btree ("order");
  CREATE INDEX "hotels_blocks_menus_list_types_parent_idx" ON "hotels_blocks_menus_list_types" USING btree ("parent_id");
  CREATE INDEX "hotels_blocks_menus_list_order_idx" ON "hotels_blocks_menus_list" USING btree ("_order");
  CREATE INDEX "hotels_blocks_menus_list_parent_id_idx" ON "hotels_blocks_menus_list" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_menus_list_path_idx" ON "hotels_blocks_menus_list" USING btree ("_path");
  CREATE INDEX "hotels_blocks_menus_list_hotel_idx" ON "hotels_blocks_menus_list" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_events_list_order_idx" ON "hotels_blocks_events_list" USING btree ("_order");
  CREATE INDEX "hotels_blocks_events_list_parent_id_idx" ON "hotels_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_events_list_path_idx" ON "hotels_blocks_events_list" USING btree ("_path");
  CREATE INDEX "hotels_blocks_events_list_hotel_idx" ON "hotels_blocks_events_list" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_offers_order_idx" ON "hotels_blocks_offers" USING btree ("_order");
  CREATE INDEX "hotels_blocks_offers_parent_id_idx" ON "hotels_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_offers_path_idx" ON "hotels_blocks_offers" USING btree ("_path");
  CREATE INDEX "hotels_blocks_offers_hotel_idx" ON "hotels_blocks_offers" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_testimonials_order_idx" ON "hotels_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "hotels_blocks_testimonials_parent_id_idx" ON "hotels_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_testimonials_path_idx" ON "hotels_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "hotels_blocks_map_order_idx" ON "hotels_blocks_map" USING btree ("_order");
  CREATE INDEX "hotels_blocks_map_parent_id_idx" ON "hotels_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_map_path_idx" ON "hotels_blocks_map" USING btree ("_path");
  CREATE INDEX "hotels_blocks_map_hotel_idx" ON "hotels_blocks_map" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_faq_items_order_idx" ON "hotels_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "hotels_blocks_faq_items_parent_id_idx" ON "hotels_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_faq_order_idx" ON "hotels_blocks_faq" USING btree ("_order");
  CREATE INDEX "hotels_blocks_faq_parent_id_idx" ON "hotels_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_faq_path_idx" ON "hotels_blocks_faq" USING btree ("_path");
  CREATE INDEX "hotels_blocks_cta_links_order_idx" ON "hotels_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "hotels_blocks_cta_links_parent_id_idx" ON "hotels_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_cta_links_link_link_book_hotel_idx" ON "hotels_blocks_cta_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "hotels_blocks_cta_order_idx" ON "hotels_blocks_cta" USING btree ("_order");
  CREATE INDEX "hotels_blocks_cta_parent_id_idx" ON "hotels_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_cta_path_idx" ON "hotels_blocks_cta" USING btree ("_path");
  CREATE INDEX "hotels_blocks_cta_background_image_idx" ON "hotels_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "hotels_blocks_newsletter_order_idx" ON "hotels_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "hotels_blocks_newsletter_parent_id_idx" ON "hotels_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_newsletter_path_idx" ON "hotels_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "hotels_blocks_enquiry_form_order_idx" ON "hotels_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "hotels_blocks_enquiry_form_parent_id_idx" ON "hotels_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_enquiry_form_path_idx" ON "hotels_blocks_enquiry_form" USING btree ("_path");
  CREATE INDEX "hotels_blocks_enquiry_form_hotel_idx" ON "hotels_blocks_enquiry_form" USING btree ("hotel_id");
  CREATE INDEX "hotels_blocks_embed_order_idx" ON "hotels_blocks_embed" USING btree ("_order");
  CREATE INDEX "hotels_blocks_embed_parent_id_idx" ON "hotels_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_embed_path_idx" ON "hotels_blocks_embed" USING btree ("_path");
  CREATE INDEX "hotels_blocks_hotel_grid_order_idx" ON "hotels_blocks_hotel_grid" USING btree ("_order");
  CREATE INDEX "hotels_blocks_hotel_grid_parent_id_idx" ON "hotels_blocks_hotel_grid" USING btree ("_parent_id");
  CREATE INDEX "hotels_blocks_hotel_grid_path_idx" ON "hotels_blocks_hotel_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "hotels_slug_idx" ON "hotels" USING btree ("slug");
  CREATE INDEX "hotels_hero_media_idx" ON "hotels" USING btree ("hero_media_id");
  CREATE INDEX "hotels_hero_poster_idx" ON "hotels" USING btree ("hero_poster_id");
  CREATE INDEX "hotels_meta_meta_image_idx" ON "hotels" USING btree ("meta_image_id");
  CREATE INDEX "hotels_updated_at_idx" ON "hotels" USING btree ("updated_at");
  CREATE INDEX "hotels_created_at_idx" ON "hotels" USING btree ("created_at");
  CREATE INDEX "hotels__status_idx" ON "hotels" USING btree ("_status");
  CREATE INDEX "hotels_rels_order_idx" ON "hotels_rels" USING btree ("order");
  CREATE INDEX "hotels_rels_parent_idx" ON "hotels_rels" USING btree ("parent_id");
  CREATE INDEX "hotels_rels_path_idx" ON "hotels_rels" USING btree ("path");
  CREATE INDEX "hotels_rels_pages_id_idx" ON "hotels_rels" USING btree ("pages_id");
  CREATE INDEX "hotels_rels_hotels_id_idx" ON "hotels_rels" USING btree ("hotels_id");
  CREATE INDEX "hotels_rels_rooms_id_idx" ON "hotels_rels" USING btree ("rooms_id");
  CREATE INDEX "hotels_rels_testimonials_id_idx" ON "hotels_rels" USING btree ("testimonials_id");
  CREATE INDEX "_hotels_v_version_facilities_order_idx" ON "_hotels_v_version_facilities" USING btree ("order");
  CREATE INDEX "_hotels_v_version_facilities_parent_idx" ON "_hotels_v_version_facilities" USING btree ("parent_id");
  CREATE INDEX "_hotels_v_version_gallery_order_idx" ON "_hotels_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_hotels_v_version_gallery_parent_id_idx" ON "_hotels_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_version_gallery_image_idx" ON "_hotels_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_hotels_v_blocks_hero_links_order_idx" ON "_hotels_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_hero_links_parent_id_idx" ON "_hotels_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_hero_links_link_link_book_hotel_idx" ON "_hotels_v_blocks_hero_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_hotels_v_blocks_hero_order_idx" ON "_hotels_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_hero_parent_id_idx" ON "_hotels_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_hero_path_idx" ON "_hotels_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_hero_media_idx" ON "_hotels_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_hotels_v_blocks_hero_poster_idx" ON "_hotels_v_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "_hotels_v_blocks_text_order_idx" ON "_hotels_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_text_parent_id_idx" ON "_hotels_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_text_path_idx" ON "_hotels_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_text_with_image_links_order_idx" ON "_hotels_v_blocks_text_with_image_links" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_text_with_image_links_parent_id_idx" ON "_hotels_v_blocks_text_with_image_links" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_text_with_image_links_link_link_book_ho_idx" ON "_hotels_v_blocks_text_with_image_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_hotels_v_blocks_text_with_image_order_idx" ON "_hotels_v_blocks_text_with_image" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_text_with_image_parent_id_idx" ON "_hotels_v_blocks_text_with_image" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_text_with_image_path_idx" ON "_hotels_v_blocks_text_with_image" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_text_with_image_image_idx" ON "_hotels_v_blocks_text_with_image" USING btree ("image_id");
  CREATE INDEX "_hotels_v_blocks_gallery_images_order_idx" ON "_hotels_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_gallery_images_parent_id_idx" ON "_hotels_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_gallery_images_image_idx" ON "_hotels_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_hotels_v_blocks_gallery_order_idx" ON "_hotels_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_gallery_parent_id_idx" ON "_hotels_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_gallery_path_idx" ON "_hotels_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_room_cards_order_idx" ON "_hotels_v_blocks_room_cards" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_room_cards_parent_id_idx" ON "_hotels_v_blocks_room_cards" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_room_cards_path_idx" ON "_hotels_v_blocks_room_cards" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_room_cards_hotel_idx" ON "_hotels_v_blocks_room_cards" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_facilities_items_order_idx" ON "_hotels_v_blocks_facilities_items" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_facilities_items_parent_id_idx" ON "_hotels_v_blocks_facilities_items" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_facilities_order_idx" ON "_hotels_v_blocks_facilities" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_facilities_parent_id_idx" ON "_hotels_v_blocks_facilities" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_facilities_path_idx" ON "_hotels_v_blocks_facilities" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_menus_list_types_order_idx" ON "_hotels_v_blocks_menus_list_types" USING btree ("order");
  CREATE INDEX "_hotels_v_blocks_menus_list_types_parent_idx" ON "_hotels_v_blocks_menus_list_types" USING btree ("parent_id");
  CREATE INDEX "_hotels_v_blocks_menus_list_order_idx" ON "_hotels_v_blocks_menus_list" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_menus_list_parent_id_idx" ON "_hotels_v_blocks_menus_list" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_menus_list_path_idx" ON "_hotels_v_blocks_menus_list" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_menus_list_hotel_idx" ON "_hotels_v_blocks_menus_list" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_events_list_order_idx" ON "_hotels_v_blocks_events_list" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_events_list_parent_id_idx" ON "_hotels_v_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_events_list_path_idx" ON "_hotels_v_blocks_events_list" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_events_list_hotel_idx" ON "_hotels_v_blocks_events_list" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_offers_order_idx" ON "_hotels_v_blocks_offers" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_offers_parent_id_idx" ON "_hotels_v_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_offers_path_idx" ON "_hotels_v_blocks_offers" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_offers_hotel_idx" ON "_hotels_v_blocks_offers" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_testimonials_order_idx" ON "_hotels_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_testimonials_parent_id_idx" ON "_hotels_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_testimonials_path_idx" ON "_hotels_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_map_order_idx" ON "_hotels_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_map_parent_id_idx" ON "_hotels_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_map_path_idx" ON "_hotels_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_map_hotel_idx" ON "_hotels_v_blocks_map" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_faq_items_order_idx" ON "_hotels_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_faq_items_parent_id_idx" ON "_hotels_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_faq_order_idx" ON "_hotels_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_faq_parent_id_idx" ON "_hotels_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_faq_path_idx" ON "_hotels_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_cta_links_order_idx" ON "_hotels_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_cta_links_parent_id_idx" ON "_hotels_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_cta_links_link_link_book_hotel_idx" ON "_hotels_v_blocks_cta_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_hotels_v_blocks_cta_order_idx" ON "_hotels_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_cta_parent_id_idx" ON "_hotels_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_cta_path_idx" ON "_hotels_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_cta_background_image_idx" ON "_hotels_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_hotels_v_blocks_newsletter_order_idx" ON "_hotels_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_newsletter_parent_id_idx" ON "_hotels_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_newsletter_path_idx" ON "_hotels_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_enquiry_form_order_idx" ON "_hotels_v_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_enquiry_form_parent_id_idx" ON "_hotels_v_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_enquiry_form_path_idx" ON "_hotels_v_blocks_enquiry_form" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_enquiry_form_hotel_idx" ON "_hotels_v_blocks_enquiry_form" USING btree ("hotel_id");
  CREATE INDEX "_hotels_v_blocks_embed_order_idx" ON "_hotels_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_embed_parent_id_idx" ON "_hotels_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_embed_path_idx" ON "_hotels_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_hotels_v_blocks_hotel_grid_order_idx" ON "_hotels_v_blocks_hotel_grid" USING btree ("_order");
  CREATE INDEX "_hotels_v_blocks_hotel_grid_parent_id_idx" ON "_hotels_v_blocks_hotel_grid" USING btree ("_parent_id");
  CREATE INDEX "_hotels_v_blocks_hotel_grid_path_idx" ON "_hotels_v_blocks_hotel_grid" USING btree ("_path");
  CREATE INDEX "_hotels_v_parent_idx" ON "_hotels_v" USING btree ("parent_id");
  CREATE INDEX "_hotels_v_version_version_slug_idx" ON "_hotels_v" USING btree ("version_slug");
  CREATE INDEX "_hotels_v_version_version_hero_media_idx" ON "_hotels_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_hotels_v_version_version_hero_poster_idx" ON "_hotels_v" USING btree ("version_hero_poster_id");
  CREATE INDEX "_hotels_v_version_meta_version_meta_image_idx" ON "_hotels_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_hotels_v_version_version_updated_at_idx" ON "_hotels_v" USING btree ("version_updated_at");
  CREATE INDEX "_hotels_v_version_version_created_at_idx" ON "_hotels_v" USING btree ("version_created_at");
  CREATE INDEX "_hotels_v_version_version__status_idx" ON "_hotels_v" USING btree ("version__status");
  CREATE INDEX "_hotels_v_created_at_idx" ON "_hotels_v" USING btree ("created_at");
  CREATE INDEX "_hotels_v_updated_at_idx" ON "_hotels_v" USING btree ("updated_at");
  CREATE INDEX "_hotels_v_latest_idx" ON "_hotels_v" USING btree ("latest");
  CREATE INDEX "_hotels_v_autosave_idx" ON "_hotels_v" USING btree ("autosave");
  CREATE INDEX "_hotels_v_rels_order_idx" ON "_hotels_v_rels" USING btree ("order");
  CREATE INDEX "_hotels_v_rels_parent_idx" ON "_hotels_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hotels_v_rels_path_idx" ON "_hotels_v_rels" USING btree ("path");
  CREATE INDEX "_hotels_v_rels_pages_id_idx" ON "_hotels_v_rels" USING btree ("pages_id");
  CREATE INDEX "_hotels_v_rels_hotels_id_idx" ON "_hotels_v_rels" USING btree ("hotels_id");
  CREATE INDEX "_hotels_v_rels_rooms_id_idx" ON "_hotels_v_rels" USING btree ("rooms_id");
  CREATE INDEX "_hotels_v_rels_testimonials_id_idx" ON "_hotels_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "rooms_features_order_idx" ON "rooms_features" USING btree ("order");
  CREATE INDEX "rooms_features_parent_idx" ON "rooms_features" USING btree ("parent_id");
  CREATE INDEX "rooms_gallery_order_idx" ON "rooms_gallery" USING btree ("_order");
  CREATE INDEX "rooms_gallery_parent_id_idx" ON "rooms_gallery" USING btree ("_parent_id");
  CREATE INDEX "rooms_gallery_image_idx" ON "rooms_gallery" USING btree ("image_id");
  CREATE INDEX "rooms_hotel_idx" ON "rooms" USING btree ("hotel_id");
  CREATE INDEX "rooms_slug_idx" ON "rooms" USING btree ("slug");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms__status_idx" ON "rooms" USING btree ("_status");
  CREATE INDEX "_rooms_v_version_features_order_idx" ON "_rooms_v_version_features" USING btree ("order");
  CREATE INDEX "_rooms_v_version_features_parent_idx" ON "_rooms_v_version_features" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_gallery_order_idx" ON "_rooms_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_gallery_parent_id_idx" ON "_rooms_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_gallery_image_idx" ON "_rooms_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_rooms_v_parent_idx" ON "_rooms_v" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_version_hotel_idx" ON "_rooms_v" USING btree ("version_hotel_id");
  CREATE INDEX "_rooms_v_version_version_slug_idx" ON "_rooms_v" USING btree ("version_slug");
  CREATE INDEX "_rooms_v_version_version_updated_at_idx" ON "_rooms_v" USING btree ("version_updated_at");
  CREATE INDEX "_rooms_v_version_version_created_at_idx" ON "_rooms_v" USING btree ("version_created_at");
  CREATE INDEX "_rooms_v_version_version__status_idx" ON "_rooms_v" USING btree ("version__status");
  CREATE INDEX "_rooms_v_created_at_idx" ON "_rooms_v" USING btree ("created_at");
  CREATE INDEX "_rooms_v_updated_at_idx" ON "_rooms_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_v_latest_idx" ON "_rooms_v" USING btree ("latest");
  CREATE INDEX "menus_sections_items_order_idx" ON "menus_sections_items" USING btree ("_order");
  CREATE INDEX "menus_sections_items_parent_id_idx" ON "menus_sections_items" USING btree ("_parent_id");
  CREATE INDEX "menus_sections_order_idx" ON "menus_sections" USING btree ("_order");
  CREATE INDEX "menus_sections_parent_id_idx" ON "menus_sections" USING btree ("_parent_id");
  CREATE INDEX "menus_hotel_idx" ON "menus" USING btree ("hotel_id");
  CREATE INDEX "menus_pdf_idx" ON "menus" USING btree ("pdf_id");
  CREATE INDEX "menus_updated_at_idx" ON "menus" USING btree ("updated_at");
  CREATE INDEX "menus_created_at_idx" ON "menus" USING btree ("created_at");
  CREATE INDEX "menus__status_idx" ON "menus" USING btree ("_status");
  CREATE INDEX "_menus_v_version_sections_items_order_idx" ON "_menus_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_menus_v_version_sections_items_parent_id_idx" ON "_menus_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_menus_v_version_sections_order_idx" ON "_menus_v_version_sections" USING btree ("_order");
  CREATE INDEX "_menus_v_version_sections_parent_id_idx" ON "_menus_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_menus_v_parent_idx" ON "_menus_v" USING btree ("parent_id");
  CREATE INDEX "_menus_v_version_version_hotel_idx" ON "_menus_v" USING btree ("version_hotel_id");
  CREATE INDEX "_menus_v_version_version_pdf_idx" ON "_menus_v" USING btree ("version_pdf_id");
  CREATE INDEX "_menus_v_version_version_updated_at_idx" ON "_menus_v" USING btree ("version_updated_at");
  CREATE INDEX "_menus_v_version_version_created_at_idx" ON "_menus_v" USING btree ("version_created_at");
  CREATE INDEX "_menus_v_version_version__status_idx" ON "_menus_v" USING btree ("version__status");
  CREATE INDEX "_menus_v_created_at_idx" ON "_menus_v" USING btree ("created_at");
  CREATE INDEX "_menus_v_updated_at_idx" ON "_menus_v" USING btree ("updated_at");
  CREATE INDEX "_menus_v_latest_idx" ON "_menus_v" USING btree ("latest");
  CREATE INDEX "events_hotel_idx" ON "events" USING btree ("hotel_id");
  CREATE INDEX "events_start_idx" ON "events" USING btree ("start");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_hotel_idx" ON "_events_v" USING btree ("version_hotel_id");
  CREATE INDEX "_events_v_version_version_start_idx" ON "_events_v" USING btree ("version_start");
  CREATE INDEX "_events_v_version_version_image_idx" ON "_events_v" USING btree ("version_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "offers_hotel_idx" ON "offers" USING btree ("hotel_id");
  CREATE INDEX "offers_image_idx" ON "offers" USING btree ("image_id");
  CREATE INDEX "offers_end_date_idx" ON "offers" USING btree ("end_date");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "offers__status_idx" ON "offers" USING btree ("_status");
  CREATE INDEX "_offers_v_parent_idx" ON "_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_hotel_idx" ON "_offers_v" USING btree ("version_hotel_id");
  CREATE INDEX "_offers_v_version_version_image_idx" ON "_offers_v" USING btree ("version_image_id");
  CREATE INDEX "_offers_v_version_version_end_date_idx" ON "_offers_v" USING btree ("version_end_date");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_version_version__status_idx" ON "_offers_v" USING btree ("version__status");
  CREATE INDEX "_offers_v_created_at_idx" ON "_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "_offers_v" USING btree ("updated_at");
  CREATE INDEX "_offers_v_latest_idx" ON "_offers_v" USING btree ("latest");
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_book_hotel_idx" ON "pages_blocks_hero_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_hero_poster_idx" ON "pages_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_text_order_idx" ON "pages_blocks_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_parent_id_idx" ON "pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_path_idx" ON "pages_blocks_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_with_image_links_order_idx" ON "pages_blocks_text_with_image_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_with_image_links_parent_id_idx" ON "pages_blocks_text_with_image_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_with_image_links_link_link_book_hotel_idx" ON "pages_blocks_text_with_image_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "pages_blocks_text_with_image_order_idx" ON "pages_blocks_text_with_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_with_image_parent_id_idx" ON "pages_blocks_text_with_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_with_image_path_idx" ON "pages_blocks_text_with_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_with_image_image_idx" ON "pages_blocks_text_with_image" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_room_cards_order_idx" ON "pages_blocks_room_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_room_cards_parent_id_idx" ON "pages_blocks_room_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_room_cards_path_idx" ON "pages_blocks_room_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_room_cards_hotel_idx" ON "pages_blocks_room_cards" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_facilities_items_order_idx" ON "pages_blocks_facilities_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_facilities_items_parent_id_idx" ON "pages_blocks_facilities_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facilities_order_idx" ON "pages_blocks_facilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_facilities_parent_id_idx" ON "pages_blocks_facilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_facilities_path_idx" ON "pages_blocks_facilities" USING btree ("_path");
  CREATE INDEX "pages_blocks_menus_list_types_order_idx" ON "pages_blocks_menus_list_types" USING btree ("order");
  CREATE INDEX "pages_blocks_menus_list_types_parent_idx" ON "pages_blocks_menus_list_types" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_menus_list_order_idx" ON "pages_blocks_menus_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_menus_list_parent_id_idx" ON "pages_blocks_menus_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menus_list_path_idx" ON "pages_blocks_menus_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_menus_list_hotel_idx" ON "pages_blocks_menus_list" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_events_list_order_idx" ON "pages_blocks_events_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_list_parent_id_idx" ON "pages_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_list_path_idx" ON "pages_blocks_events_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_events_list_hotel_idx" ON "pages_blocks_events_list" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_offers_order_idx" ON "pages_blocks_offers" USING btree ("_order");
  CREATE INDEX "pages_blocks_offers_parent_id_idx" ON "pages_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offers_path_idx" ON "pages_blocks_offers" USING btree ("_path");
  CREATE INDEX "pages_blocks_offers_hotel_idx" ON "pages_blocks_offers" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_hotel_idx" ON "pages_blocks_map" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_link_link_book_hotel_idx" ON "pages_blocks_cta_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_enquiry_form_order_idx" ON "pages_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_enquiry_form_parent_id_idx" ON "pages_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enquiry_form_path_idx" ON "pages_blocks_enquiry_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_enquiry_form_hotel_idx" ON "pages_blocks_enquiry_form" USING btree ("hotel_id");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_hotel_grid_order_idx" ON "pages_blocks_hotel_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_hotel_grid_parent_id_idx" ON "pages_blocks_hotel_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hotel_grid_path_idx" ON "pages_blocks_hotel_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_hotels_id_idx" ON "pages_rels" USING btree ("hotels_id");
  CREATE INDEX "pages_rels_rooms_id_idx" ON "pages_rels" USING btree ("rooms_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_link_link_book_hotel_idx" ON "_pages_v_blocks_hero_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_poster_idx" ON "_pages_v_blocks_hero" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_text_order_idx" ON "_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_parent_id_idx" ON "_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_path_idx" ON "_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_with_image_links_order_idx" ON "_pages_v_blocks_text_with_image_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_with_image_links_parent_id_idx" ON "_pages_v_blocks_text_with_image_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_with_image_links_link_link_book_hot_idx" ON "_pages_v_blocks_text_with_image_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_pages_v_blocks_text_with_image_order_idx" ON "_pages_v_blocks_text_with_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_with_image_parent_id_idx" ON "_pages_v_blocks_text_with_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_with_image_path_idx" ON "_pages_v_blocks_text_with_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_with_image_image_idx" ON "_pages_v_blocks_text_with_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_room_cards_order_idx" ON "_pages_v_blocks_room_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_room_cards_parent_id_idx" ON "_pages_v_blocks_room_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_room_cards_path_idx" ON "_pages_v_blocks_room_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_room_cards_hotel_idx" ON "_pages_v_blocks_room_cards" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_facilities_items_order_idx" ON "_pages_v_blocks_facilities_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facilities_items_parent_id_idx" ON "_pages_v_blocks_facilities_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facilities_order_idx" ON "_pages_v_blocks_facilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_facilities_parent_id_idx" ON "_pages_v_blocks_facilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_facilities_path_idx" ON "_pages_v_blocks_facilities" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menus_list_types_order_idx" ON "_pages_v_blocks_menus_list_types" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_menus_list_types_parent_idx" ON "_pages_v_blocks_menus_list_types" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_menus_list_order_idx" ON "_pages_v_blocks_menus_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menus_list_parent_id_idx" ON "_pages_v_blocks_menus_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menus_list_path_idx" ON "_pages_v_blocks_menus_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menus_list_hotel_idx" ON "_pages_v_blocks_menus_list" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_events_list_order_idx" ON "_pages_v_blocks_events_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_list_parent_id_idx" ON "_pages_v_blocks_events_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_list_path_idx" ON "_pages_v_blocks_events_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_events_list_hotel_idx" ON "_pages_v_blocks_events_list" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_offers_order_idx" ON "_pages_v_blocks_offers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offers_parent_id_idx" ON "_pages_v_blocks_offers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_path_idx" ON "_pages_v_blocks_offers" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_offers_hotel_idx" ON "_pages_v_blocks_offers" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_hotel_idx" ON "_pages_v_blocks_map" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_link_link_book_hotel_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_background_image_idx" ON "_pages_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_enquiry_form_order_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enquiry_form_parent_id_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enquiry_form_path_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_enquiry_form_hotel_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("hotel_id");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hotel_grid_order_idx" ON "_pages_v_blocks_hotel_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hotel_grid_parent_id_idx" ON "_pages_v_blocks_hotel_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hotel_grid_path_idx" ON "_pages_v_blocks_hotel_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_hotels_id_idx" ON "_pages_v_rels" USING btree ("hotels_id");
  CREATE INDEX "_pages_v_rels_rooms_id_idx" ON "_pages_v_rels" USING btree ("rooms_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "media_created_by_idx" ON "media" USING btree ("created_by_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "testimonials_hotel_idx" ON "testimonials" USING btree ("hotel_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "enquiries_hotel_idx" ON "enquiries" USING btree ("hotel_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_hotels_id_idx" ON "users_rels" USING btree ("hotels_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_hotels_id_idx" ON "redirects_rels" USING btree ("hotels_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_hotels_id_idx" ON "payload_locked_documents_rels" USING btree ("hotels_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_locked_documents_rels_menus_id_idx" ON "payload_locked_documents_rels" USING btree ("menus_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_seo_seo_default_image_idx" ON "site_settings" USING btree ("seo_default_image_id");
  CREATE INDEX "navigation_header_order_idx" ON "navigation_header" USING btree ("_order");
  CREATE INDEX "navigation_header_parent_id_idx" ON "navigation_header" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_link_link_book_hotel_idx" ON "navigation_header" USING btree ("link_book_hotel_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_links_link_link_book_hotel_idx" ON "navigation_footer_columns_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "navigation_legal_links_order_idx" ON "navigation_legal_links" USING btree ("_order");
  CREATE INDEX "navigation_legal_links_parent_id_idx" ON "navigation_legal_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_legal_links_link_link_book_hotel_idx" ON "navigation_legal_links" USING btree ("link_book_hotel_id");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_pages_id_idx" ON "navigation_rels" USING btree ("pages_id");
  CREATE INDEX "navigation_rels_hotels_id_idx" ON "navigation_rels" USING btree ("hotels_id");
  CREATE INDEX "announcement_bar_link_link_book_hotel_idx" ON "announcement_bar" USING btree ("link_book_hotel_id");
  CREATE INDEX "announcement_bar_rels_order_idx" ON "announcement_bar_rels" USING btree ("order");
  CREATE INDEX "announcement_bar_rels_parent_idx" ON "announcement_bar_rels" USING btree ("parent_id");
  CREATE INDEX "announcement_bar_rels_path_idx" ON "announcement_bar_rels" USING btree ("path");
  CREATE INDEX "announcement_bar_rels_pages_id_idx" ON "announcement_bar_rels" USING btree ("pages_id");
  CREATE INDEX "announcement_bar_rels_hotels_id_idx" ON "announcement_bar_rels" USING btree ("hotels_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hotels_facilities" CASCADE;
  DROP TABLE "hotels_gallery" CASCADE;
  DROP TABLE "hotels_blocks_hero_links" CASCADE;
  DROP TABLE "hotels_blocks_hero" CASCADE;
  DROP TABLE "hotels_blocks_text" CASCADE;
  DROP TABLE "hotels_blocks_text_with_image_links" CASCADE;
  DROP TABLE "hotels_blocks_text_with_image" CASCADE;
  DROP TABLE "hotels_blocks_gallery_images" CASCADE;
  DROP TABLE "hotels_blocks_gallery" CASCADE;
  DROP TABLE "hotels_blocks_room_cards" CASCADE;
  DROP TABLE "hotels_blocks_facilities_items" CASCADE;
  DROP TABLE "hotels_blocks_facilities" CASCADE;
  DROP TABLE "hotels_blocks_menus_list_types" CASCADE;
  DROP TABLE "hotels_blocks_menus_list" CASCADE;
  DROP TABLE "hotels_blocks_events_list" CASCADE;
  DROP TABLE "hotels_blocks_offers" CASCADE;
  DROP TABLE "hotels_blocks_testimonials" CASCADE;
  DROP TABLE "hotels_blocks_map" CASCADE;
  DROP TABLE "hotels_blocks_faq_items" CASCADE;
  DROP TABLE "hotels_blocks_faq" CASCADE;
  DROP TABLE "hotels_blocks_cta_links" CASCADE;
  DROP TABLE "hotels_blocks_cta" CASCADE;
  DROP TABLE "hotels_blocks_newsletter" CASCADE;
  DROP TABLE "hotels_blocks_enquiry_form" CASCADE;
  DROP TABLE "hotels_blocks_embed" CASCADE;
  DROP TABLE "hotels_blocks_hotel_grid" CASCADE;
  DROP TABLE "hotels" CASCADE;
  DROP TABLE "hotels_rels" CASCADE;
  DROP TABLE "_hotels_v_version_facilities" CASCADE;
  DROP TABLE "_hotels_v_version_gallery" CASCADE;
  DROP TABLE "_hotels_v_blocks_hero_links" CASCADE;
  DROP TABLE "_hotels_v_blocks_hero" CASCADE;
  DROP TABLE "_hotels_v_blocks_text" CASCADE;
  DROP TABLE "_hotels_v_blocks_text_with_image_links" CASCADE;
  DROP TABLE "_hotels_v_blocks_text_with_image" CASCADE;
  DROP TABLE "_hotels_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_hotels_v_blocks_gallery" CASCADE;
  DROP TABLE "_hotels_v_blocks_room_cards" CASCADE;
  DROP TABLE "_hotels_v_blocks_facilities_items" CASCADE;
  DROP TABLE "_hotels_v_blocks_facilities" CASCADE;
  DROP TABLE "_hotels_v_blocks_menus_list_types" CASCADE;
  DROP TABLE "_hotels_v_blocks_menus_list" CASCADE;
  DROP TABLE "_hotels_v_blocks_events_list" CASCADE;
  DROP TABLE "_hotels_v_blocks_offers" CASCADE;
  DROP TABLE "_hotels_v_blocks_testimonials" CASCADE;
  DROP TABLE "_hotels_v_blocks_map" CASCADE;
  DROP TABLE "_hotels_v_blocks_faq_items" CASCADE;
  DROP TABLE "_hotels_v_blocks_faq" CASCADE;
  DROP TABLE "_hotels_v_blocks_cta_links" CASCADE;
  DROP TABLE "_hotels_v_blocks_cta" CASCADE;
  DROP TABLE "_hotels_v_blocks_newsletter" CASCADE;
  DROP TABLE "_hotels_v_blocks_enquiry_form" CASCADE;
  DROP TABLE "_hotels_v_blocks_embed" CASCADE;
  DROP TABLE "_hotels_v_blocks_hotel_grid" CASCADE;
  DROP TABLE "_hotels_v" CASCADE;
  DROP TABLE "_hotels_v_rels" CASCADE;
  DROP TABLE "rooms_features" CASCADE;
  DROP TABLE "rooms_gallery" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "_rooms_v_version_features" CASCADE;
  DROP TABLE "_rooms_v_version_gallery" CASCADE;
  DROP TABLE "_rooms_v" CASCADE;
  DROP TABLE "menus_sections_items" CASCADE;
  DROP TABLE "menus_sections" CASCADE;
  DROP TABLE "menus" CASCADE;
  DROP TABLE "_menus_v_version_sections_items" CASCADE;
  DROP TABLE "_menus_v_version_sections" CASCADE;
  DROP TABLE "_menus_v" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "_offers_v" CASCADE;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_text" CASCADE;
  DROP TABLE "pages_blocks_text_with_image_links" CASCADE;
  DROP TABLE "pages_blocks_text_with_image" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_room_cards" CASCADE;
  DROP TABLE "pages_blocks_facilities_items" CASCADE;
  DROP TABLE "pages_blocks_facilities" CASCADE;
  DROP TABLE "pages_blocks_menus_list_types" CASCADE;
  DROP TABLE "pages_blocks_menus_list" CASCADE;
  DROP TABLE "pages_blocks_events_list" CASCADE;
  DROP TABLE "pages_blocks_offers" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_enquiry_form" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages_blocks_hotel_grid" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_text" CASCADE;
  DROP TABLE "_pages_v_blocks_text_with_image_links" CASCADE;
  DROP TABLE "_pages_v_blocks_text_with_image" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_room_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_facilities_items" CASCADE;
  DROP TABLE "_pages_v_blocks_facilities" CASCADE;
  DROP TABLE "_pages_v_blocks_menus_list_types" CASCADE;
  DROP TABLE "_pages_v_blocks_menus_list" CASCADE;
  DROP TABLE "_pages_v_blocks_events_list" CASCADE;
  DROP TABLE "_pages_v_blocks_offers" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_map" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_enquiry_form" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_hotel_grid" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_header" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation_legal_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "announcement_bar" CASCADE;
  DROP TABLE "announcement_bar_rels" CASCADE;
  DROP TYPE "public"."enum_hotels_facilities";
  DROP TYPE "public"."enum_hotels_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_hotels_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_hotels_blocks_hero_height";
  DROP TYPE "public"."enum_hotels_blocks_hero_overlay";
  DROP TYPE "public"."enum_hotels_blocks_text_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_text_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_text_style_align";
  DROP TYPE "public"."enum_hotels_blocks_text_with_image_links_link_type";
  DROP TYPE "public"."enum_hotels_blocks_text_with_image_links_link_appearance";
  DROP TYPE "public"."enum_hotels_blocks_text_with_image_image_position";
  DROP TYPE "public"."enum_hotels_blocks_text_with_image_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_text_with_image_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_gallery_source";
  DROP TYPE "public"."enum_hotels_blocks_gallery_layout";
  DROP TYPE "public"."enum_hotels_blocks_gallery_columns";
  DROP TYPE "public"."enum_hotels_blocks_gallery_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_gallery_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_room_cards_source";
  DROP TYPE "public"."enum_hotels_blocks_room_cards_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_room_cards_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_room_cards_style_align";
  DROP TYPE "public"."enum_hotels_blocks_facilities_items_icon";
  DROP TYPE "public"."enum_hotels_blocks_facilities_source";
  DROP TYPE "public"."enum_hotels_blocks_facilities_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_facilities_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_facilities_style_align";
  DROP TYPE "public"."enum_hotels_blocks_menus_list_types";
  DROP TYPE "public"."enum_hotels_blocks_menus_list_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_menus_list_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_menus_list_style_align";
  DROP TYPE "public"."enum_hotels_blocks_events_list_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_events_list_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_events_list_style_align";
  DROP TYPE "public"."enum_hotels_blocks_offers_layout";
  DROP TYPE "public"."enum_hotels_blocks_offers_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_offers_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_offers_style_align";
  DROP TYPE "public"."enum_hotels_blocks_testimonials_source";
  DROP TYPE "public"."enum_hotels_blocks_testimonials_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_testimonials_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_testimonials_style_align";
  DROP TYPE "public"."enum_hotels_blocks_map_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_map_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_faq_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_faq_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_faq_style_align";
  DROP TYPE "public"."enum_hotels_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_hotels_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_hotels_blocks_cta_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_cta_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_cta_style_align";
  DROP TYPE "public"."enum_hotels_blocks_newsletter_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_newsletter_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_newsletter_style_align";
  DROP TYPE "public"."enum_hotels_blocks_enquiry_form_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_enquiry_form_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_enquiry_form_style_align";
  DROP TYPE "public"."enum_hotels_blocks_embed_provider";
  DROP TYPE "public"."enum_hotels_blocks_embed_aspect";
  DROP TYPE "public"."enum_hotels_blocks_embed_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_embed_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_hotel_grid_layout";
  DROP TYPE "public"."enum_hotels_blocks_hotel_grid_style_tone";
  DROP TYPE "public"."enum_hotels_blocks_hotel_grid_style_spacing";
  DROP TYPE "public"."enum_hotels_blocks_hotel_grid_style_align";
  DROP TYPE "public"."enum_hotels_price_range";
  DROP TYPE "public"."enum_hotels_meta_twitter_card";
  DROP TYPE "public"."enum_hotels_status";
  DROP TYPE "public"."enum__hotels_v_version_facilities";
  DROP TYPE "public"."enum__hotels_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__hotels_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__hotels_v_blocks_hero_height";
  DROP TYPE "public"."enum__hotels_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__hotels_v_blocks_text_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_text_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_text_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_text_with_image_links_link_type";
  DROP TYPE "public"."enum__hotels_v_blocks_text_with_image_links_link_appearance";
  DROP TYPE "public"."enum__hotels_v_blocks_text_with_image_image_position";
  DROP TYPE "public"."enum__hotels_v_blocks_text_with_image_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_text_with_image_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_gallery_source";
  DROP TYPE "public"."enum__hotels_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__hotels_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__hotels_v_blocks_gallery_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_gallery_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_room_cards_source";
  DROP TYPE "public"."enum__hotels_v_blocks_room_cards_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_room_cards_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_room_cards_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_facilities_items_icon";
  DROP TYPE "public"."enum__hotels_v_blocks_facilities_source";
  DROP TYPE "public"."enum__hotels_v_blocks_facilities_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_facilities_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_facilities_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_menus_list_types";
  DROP TYPE "public"."enum__hotels_v_blocks_menus_list_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_menus_list_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_menus_list_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_events_list_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_events_list_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_events_list_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_offers_layout";
  DROP TYPE "public"."enum__hotels_v_blocks_offers_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_offers_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_offers_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__hotels_v_blocks_testimonials_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_testimonials_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_testimonials_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_map_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_map_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_faq_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_faq_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_faq_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__hotels_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__hotels_v_blocks_cta_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_cta_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_cta_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_newsletter_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_newsletter_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_newsletter_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_enquiry_form_style_align";
  DROP TYPE "public"."enum__hotels_v_blocks_embed_provider";
  DROP TYPE "public"."enum__hotels_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__hotels_v_blocks_embed_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_embed_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_hotel_grid_layout";
  DROP TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_tone";
  DROP TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_spacing";
  DROP TYPE "public"."enum__hotels_v_blocks_hotel_grid_style_align";
  DROP TYPE "public"."enum__hotels_v_version_price_range";
  DROP TYPE "public"."enum__hotels_v_version_meta_twitter_card";
  DROP TYPE "public"."enum__hotels_v_version_status";
  DROP TYPE "public"."enum_rooms_features";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum__rooms_v_version_features";
  DROP TYPE "public"."enum__rooms_v_version_status";
  DROP TYPE "public"."enum_menus_type";
  DROP TYPE "public"."enum_menus_format";
  DROP TYPE "public"."enum_menus_status";
  DROP TYPE "public"."enum__menus_v_version_type";
  DROP TYPE "public"."enum__menus_v_version_format";
  DROP TYPE "public"."enum__menus_v_version_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_offers_status";
  DROP TYPE "public"."enum__offers_v_version_status";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_height";
  DROP TYPE "public"."enum_pages_blocks_hero_overlay";
  DROP TYPE "public"."enum_pages_blocks_text_style_tone";
  DROP TYPE "public"."enum_pages_blocks_text_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_text_style_align";
  DROP TYPE "public"."enum_pages_blocks_text_with_image_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_text_with_image_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_text_with_image_image_position";
  DROP TYPE "public"."enum_pages_blocks_text_with_image_style_tone";
  DROP TYPE "public"."enum_pages_blocks_text_with_image_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_gallery_source";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_style_tone";
  DROP TYPE "public"."enum_pages_blocks_gallery_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_room_cards_source";
  DROP TYPE "public"."enum_pages_blocks_room_cards_style_tone";
  DROP TYPE "public"."enum_pages_blocks_room_cards_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_room_cards_style_align";
  DROP TYPE "public"."enum_pages_blocks_facilities_items_icon";
  DROP TYPE "public"."enum_pages_blocks_facilities_source";
  DROP TYPE "public"."enum_pages_blocks_facilities_style_tone";
  DROP TYPE "public"."enum_pages_blocks_facilities_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_facilities_style_align";
  DROP TYPE "public"."enum_pages_blocks_menus_list_types";
  DROP TYPE "public"."enum_pages_blocks_menus_list_style_tone";
  DROP TYPE "public"."enum_pages_blocks_menus_list_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_menus_list_style_align";
  DROP TYPE "public"."enum_pages_blocks_events_list_style_tone";
  DROP TYPE "public"."enum_pages_blocks_events_list_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_events_list_style_align";
  DROP TYPE "public"."enum_pages_blocks_offers_layout";
  DROP TYPE "public"."enum_pages_blocks_offers_style_tone";
  DROP TYPE "public"."enum_pages_blocks_offers_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_offers_style_align";
  DROP TYPE "public"."enum_pages_blocks_testimonials_source";
  DROP TYPE "public"."enum_pages_blocks_testimonials_style_tone";
  DROP TYPE "public"."enum_pages_blocks_testimonials_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_testimonials_style_align";
  DROP TYPE "public"."enum_pages_blocks_map_style_tone";
  DROP TYPE "public"."enum_pages_blocks_map_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_style_tone";
  DROP TYPE "public"."enum_pages_blocks_faq_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_faq_style_align";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_style_tone";
  DROP TYPE "public"."enum_pages_blocks_cta_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_style_align";
  DROP TYPE "public"."enum_pages_blocks_newsletter_style_tone";
  DROP TYPE "public"."enum_pages_blocks_newsletter_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_newsletter_style_align";
  DROP TYPE "public"."enum_pages_blocks_enquiry_form_style_tone";
  DROP TYPE "public"."enum_pages_blocks_enquiry_form_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_enquiry_form_style_align";
  DROP TYPE "public"."enum_pages_blocks_embed_provider";
  DROP TYPE "public"."enum_pages_blocks_embed_aspect";
  DROP TYPE "public"."enum_pages_blocks_embed_style_tone";
  DROP TYPE "public"."enum_pages_blocks_embed_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_hotel_grid_layout";
  DROP TYPE "public"."enum_pages_blocks_hotel_grid_style_tone";
  DROP TYPE "public"."enum_pages_blocks_hotel_grid_style_spacing";
  DROP TYPE "public"."enum_pages_blocks_hotel_grid_style_align";
  DROP TYPE "public"."enum_pages_meta_twitter_card";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_height";
  DROP TYPE "public"."enum__pages_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_text_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_text_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_text_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_text_with_image_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_text_with_image_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_text_with_image_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_text_with_image_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_text_with_image_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_source";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_room_cards_source";
  DROP TYPE "public"."enum__pages_v_blocks_room_cards_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_room_cards_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_room_cards_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_facilities_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_facilities_source";
  DROP TYPE "public"."enum__pages_v_blocks_facilities_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_facilities_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_facilities_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_menus_list_types";
  DROP TYPE "public"."enum__pages_v_blocks_menus_list_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_menus_list_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_menus_list_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_events_list_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_events_list_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_events_list_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_offers_layout";
  DROP TYPE "public"."enum__pages_v_blocks_offers_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_offers_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_offers_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_map_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_map_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_faq_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_faq_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_newsletter_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_enquiry_form_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_enquiry_form_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_enquiry_form_style_align";
  DROP TYPE "public"."enum__pages_v_blocks_embed_provider";
  DROP TYPE "public"."enum__pages_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__pages_v_blocks_embed_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_embed_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hotel_grid_layout";
  DROP TYPE "public"."enum__pages_v_blocks_hotel_grid_style_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hotel_grid_style_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hotel_grid_style_align";
  DROP TYPE "public"."enum__pages_v_version_meta_twitter_card";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_testimonials_source";
  DROP TYPE "public"."enum_enquiries_subject";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_navigation_header_link_type";
  DROP TYPE "public"."enum_navigation_footer_columns_links_link_type";
  DROP TYPE "public"."enum_navigation_legal_links_link_type";
  DROP TYPE "public"."enum_announcement_bar_link_type";`)
}

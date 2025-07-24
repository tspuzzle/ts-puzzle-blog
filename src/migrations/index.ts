import * as migration_20250710_202622_init_schema from './20250710_202622_init_schema';
import * as migration_20250711_162840_change_media_block from './20250711_162840_change_media_block';
import * as migration_20250723_131531_challenge_collection from './20250723_131531_challenge_collection';
import * as migration_20250723_135615_not_required_challenge_fields from './20250723_135615_not_required_challenge_fields';
import * as migration_20250723_135808_show_description_field from './20250723_135808_show_description_field';
import * as migration_20250723_140039_hide_description from './20250723_140039_hide_description';
import * as migration_20250724_155235_challenge_slug from './20250724_155235_challenge_slug';

export const migrations = [
  {
    up: migration_20250710_202622_init_schema.up,
    down: migration_20250710_202622_init_schema.down,
    name: '20250710_202622_init_schema',
  },
  {
    up: migration_20250711_162840_change_media_block.up,
    down: migration_20250711_162840_change_media_block.down,
    name: '20250711_162840_change_media_block',
  },
  {
    up: migration_20250723_131531_challenge_collection.up,
    down: migration_20250723_131531_challenge_collection.down,
    name: '20250723_131531_challenge_collection',
  },
  {
    up: migration_20250723_135615_not_required_challenge_fields.up,
    down: migration_20250723_135615_not_required_challenge_fields.down,
    name: '20250723_135615_not_required_challenge_fields',
  },
  {
    up: migration_20250723_135808_show_description_field.up,
    down: migration_20250723_135808_show_description_field.down,
    name: '20250723_135808_show_description_field',
  },
  {
    up: migration_20250723_140039_hide_description.up,
    down: migration_20250723_140039_hide_description.down,
    name: '20250723_140039_hide_description',
  },
  {
    up: migration_20250724_155235_challenge_slug.up,
    down: migration_20250724_155235_challenge_slug.down,
    name: '20250724_155235_challenge_slug'
  },
];

import * as migration_20250710_202622_init_schema from './20250710_202622_init_schema';
import * as migration_20250711_162840_change_media_block from './20250711_162840_change_media_block';
import * as migration_20250723_131531_challenge_collection from './20250723_131531_challenge_collection';

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
    name: '20250723_131531_challenge_collection'
  },
];

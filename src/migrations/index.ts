import * as migration_20250710_202622_init_schema from './20250710_202622_init_schema';
import * as migration_20250711_162840_change_media_block from './20250711_162840_change_media_block';

export const migrations = [
  {
    up: migration_20250710_202622_init_schema.up,
    down: migration_20250710_202622_init_schema.down,
    name: '20250710_202622_init_schema',
  },
  {
    up: migration_20250711_162840_change_media_block.up,
    down: migration_20250711_162840_change_media_block.down,
    name: '20250711_162840_change_media_block'
  },
];

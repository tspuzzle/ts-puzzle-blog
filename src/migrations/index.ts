import * as migration_20250710_202622_init_schema from './20250710_202622_init_schema';
import * as migration_20250711_162840_change_media_block from './20250711_162840_change_media_block';
import * as migration_20250723_131531_challenge_collection from './20250723_131531_challenge_collection';
import * as migration_20250723_135615_not_required_challenge_fields from './20250723_135615_not_required_challenge_fields';
import * as migration_20250723_135808_show_description_field from './20250723_135808_show_description_field';
import * as migration_20250723_140039_hide_description from './20250723_140039_hide_description';
import * as migration_20250724_155235_challenge_slug from './20250724_155235_challenge_slug';
import * as migration_20250727_203151_user_auth from './20250727_203151_user_auth';
import * as migration_20250728_120201_add_tags from './20250728_120201_add_tags';
import * as migration_20250728_151727_difficultu_required from './20250728_151727_difficultu_required';
import * as migration_20250728_184842_add_role from './20250728_184842_add_role';
import * as migration_20250729_173958_user_submissions from './20250729_173958_user_submissions';
import * as migration_20250730_191359_add_post_tags from './20250730_191359_add_post_tags';
import * as migration_20250801_153115_add_actual_challenge_result from './20250801_153115_add_actual_challenge_result';
import * as migration_20250801_155240_internal_fields from './20250801_155240_internal_fields';

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
    name: '20250724_155235_challenge_slug',
  },
  {
    up: migration_20250727_203151_user_auth.up,
    down: migration_20250727_203151_user_auth.down,
    name: '20250727_203151_user_auth',
  },
  {
    up: migration_20250728_120201_add_tags.up,
    down: migration_20250728_120201_add_tags.down,
    name: '20250728_120201_add_tags',
  },
  {
    up: migration_20250728_151727_difficultu_required.up,
    down: migration_20250728_151727_difficultu_required.down,
    name: '20250728_151727_difficultu_required',
  },
  {
    up: migration_20250728_184842_add_role.up,
    down: migration_20250728_184842_add_role.down,
    name: '20250728_184842_add_role',
  },
  {
    up: migration_20250729_173958_user_submissions.up,
    down: migration_20250729_173958_user_submissions.down,
    name: '20250729_173958_user_submissions',
  },
  {
    up: migration_20250730_191359_add_post_tags.up,
    down: migration_20250730_191359_add_post_tags.down,
    name: '20250730_191359_add_post_tags',
  },
  {
    up: migration_20250801_153115_add_actual_challenge_result.up,
    down: migration_20250801_153115_add_actual_challenge_result.down,
    name: '20250801_153115_add_actual_challenge_result',
  },
  {
    up: migration_20250801_155240_internal_fields.up,
    down: migration_20250801_155240_internal_fields.down,
    name: '20250801_155240_internal_fields'
  },
];

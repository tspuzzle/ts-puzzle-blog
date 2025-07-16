import { Code } from '@/blocks/Code/config'
import {
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const limitedLexical = lexicalEditor({
  features: [
    FixedToolbarFeature(),
    ParagraphFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),
    BoldFeature(),
    ItalicFeature(),
    HorizontalRuleFeature(),
    ChecklistFeature(),

    BlocksFeature({
      blocks: [Code],
    }),
  ],
})

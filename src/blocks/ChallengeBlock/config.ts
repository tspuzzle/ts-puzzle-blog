import { limitedLexical } from '@/_admin/fields/limitedLexical'
import type { Block, Field } from 'payload'

export const challengeBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'description',
    type: 'richText',
    editor: limitedLexical,
  },
  {
    name: 'hideDescription',
    type: 'checkbox',
    label: 'Hide description',
    defaultValue: false,
  },
  {
    name: 'initialCode',
    type: 'text',
  },
  {
    name: 'testCases',
    type: 'array',
    admin: { initCollapsed: true },
    fields: [
      {
        name: 'task',
        type: 'richText',
        editor: limitedLexical,
        required: true,
      },
      {
        name: 'expected',
        type: 'richText',
        editor: limitedLexical,
        required: true,
      },
      {
        name: 'test',
        type: 'textarea',
        required: true,
      },
      {
        name: 'inferTypeFrom',
        type: 'text',
        label: "Infer type From (for example: If<true, 'a', 'b'>)",
      },
    ],
  },
]

export const ChallengeBlockBlock: Block = {
  slug: 'challengeBlock',
  interfaceName: 'ChallengeBlock',
  fields: challengeBlockFields,
}

import { limitedLexical } from '@/_admin/fields/limitedLexical'
import type { Block } from 'payload'

export const ChallengeBlockBlock: Block = {
  slug: 'challengeBlock',
  interfaceName: 'ChallengeBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: limitedLexical,
      required: true,
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
      ],
    },
  ],
}

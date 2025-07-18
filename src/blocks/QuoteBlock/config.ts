import { limitedLexical } from '@/_admin/fields/limitedLexical'
import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'quote',
      type: 'richText',
      required: true,
      editor: limitedLexical,
    },
  ],
}

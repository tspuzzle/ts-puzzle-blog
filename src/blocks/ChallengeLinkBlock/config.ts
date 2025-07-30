import type { Block } from 'payload'

export const ChallengeLinkBlock: Block = {
  slug: 'challengeLinkBlock',
  interfaceName: 'ChallengeLinkBlock',
  fields: [
    {
      name: 'challengeLink',
      type: 'relationship',
      label: 'Challenge Link',
      relationTo: ['challenges'],
      required: true,
    },
  ],
}

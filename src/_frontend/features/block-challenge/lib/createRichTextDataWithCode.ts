import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const createRichTextDataWithCode = (code: string) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,

      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,

          children: [
            {
              mode: 'normal',
              text: code,
              type: 'text',
              style: '',
              detail: 0,
              format: 16,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 16,
        },
      ],
      direction: 'ltr',
      textFormat: 16,
    },
  } as DefaultTypedEditorState
}

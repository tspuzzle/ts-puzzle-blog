'use client'
import { useTheme } from '@/_frontend/shared/providers/Theme'
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  includeLines?: boolean | null
  language?: string | null
}

const LINE_MULTIPLIER = 22

export const CodeBlock: React.FC<Props> = ({ code, includeLines, language = 'typescript' }) => {
  const { theme } = useTheme()

  const height = code.split('\n').length * LINE_MULTIPLIER || LINE_MULTIPLIER
  return (
    <div className="group border rounded overflow-x-auto relative pt-4 bg-white dark:bg-[rgb(30,30,30)]">
      <Editor
        defaultValue={code}
        language={language || 'typescript'}
        theme={theme === 'light' ? 'vs' : 'vs-dark'}
        height={height}
        options={{
          readOnly: true,
          domReadOnly: true,
          renderLineHighlight: 'none',
          contextmenu: false,
          lineNumbers: includeLines ? 'on' : 'off',
          minimap: { enabled: false },
          renderValidationDecorations: 'off',
          inlayHints: { enabled: 'off' },
          formatOnType: true,
          fontSize: 16,
          lineHeight: LINE_MULTIPLIER,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollBeyondLastLine: false,
          selectionHighlight: false,

          parameterHints: { enabled: false }, // disables parameter hints
          suggestOnTriggerCharacters: false, // disables auto-suggestions
          hover: { enabled: false }, // disables hover tooltips
          quickSuggestions: false,
          lightbulb: { enabled: 'off' as any },
          glyphMargin: false,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
            vertical: 'hidden',
            horizontal: 'hidden',
          },
        }}
      />
      <CopyButton code={code} />
    </div>
  )
}

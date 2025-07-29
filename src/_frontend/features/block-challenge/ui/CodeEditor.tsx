'use client'
import { useTheme } from '@/_frontend/shared/providers/Theme'
import { Editor } from '@monaco-editor/react'
import { useState } from 'react'

const LINE_MULTIPLIER = 24

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const { theme } = useTheme()

  const [height, setHeight] = useState(
    (value.split('\n').length - 1) * LINE_MULTIPLIER || LINE_MULTIPLIER,
  )

  return (
    <div className="bg-grey-50 text-code flex-1 bg-white dark:bg-[rgb(30,30,30)] overflow-y-scroll">
      <Editor
        //height={height}
        value={value}
        language={'typescript'}
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          formatOnType: true,
          fontSize: 16,
          lineNumbersMinChars: 2,
          //fontFamily: jetBrains.style.fontFamily,
          scrollBeyondLastLine: false,

          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
        onChange={(val) => {
          onChange(val || '')
        }}
        onMount={(editor, monaco) => {
          // https://microsoft.github.io/monaco-editor/playground.html?source=v0.52.0#example-customizing-the-appearence-exposed-colors

          // supress diagnostic warning
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [6133], // Suppress "variable is declared but never used" warning
          })
          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [6133], // Suppress "variable is declared but never used" warning
          })

          const defaultCompilerOptions =
            monaco.languages.typescript.typescriptDefaults.getCompilerOptions()

          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            ...defaultCompilerOptions,
            noImplicitAny: true,
          })

          if (editor) {
            editor.onDidChangeModelContent(() => {
              const lineCount = editor.getModel()?.getLineCount() || 0
              setHeight(lineCount * LINE_MULTIPLIER)
            })
          }

          //monaco.editor.setTheme('customTheme')
        }}
      />
    </div>
  )
}

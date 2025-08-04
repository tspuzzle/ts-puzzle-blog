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

const HIDDEN_LINE = '\nexport {};'
export function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const { theme } = useTheme()

  const [height, setHeight] = useState(
    (value.split('\n').length - 1) * LINE_MULTIPLIER || LINE_MULTIPLIER,
  )

  const content = (value || '').concat(HIDDEN_LINE)

  const lines = content.split('\n').length
  console.log(lines)
  //'export {}; \n'.concat((value || '').replace('export {}; \n', ''))

  return (
    <div className="bg-grey-50 text-code flex-1 bg-white dark:bg-[rgb(30,30,30)]">
      <Editor
        //height={height}
        value={content}
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
          onChange((val || '').replace(HIDDEN_LINE, ''))
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

          if (editor && monaco) {
            // hide the first line that contain "export {};"
            const _editor = editor as any
            _editor.setHiddenAreas([new monaco.Range(lines, 1, lines, 1)])
          }

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

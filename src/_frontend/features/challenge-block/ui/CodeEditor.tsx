'use client'
import { Textarea } from '@/_frontend/shared/ui/textarea'
import { Card, CardContent } from '@/_frontend/shared/ui/card'
import { cn } from '@/_frontend/shared/lib/cn'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      {/* Removed h-[600px] */}
      <CardContent className="flex-1 p-0">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full font-mono text-sm p-4 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </CardContent>
    </Card>
  )
}

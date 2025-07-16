import { cn } from '@/_frontend/shared/lib/cn'
import { CheckCircle2, CircleDot, XCircle } from 'lucide-react'

interface TestCaseCardProps {
  id: string
  task: string
  expected: string
  status: 'not-run' | 'failed' | 'passed'
  index: number
  isCompact: boolean
}

// Helper function to apply syntax-like highlighting
const formatCodeSnippet = (code: string) => {
  // Simple regex for numbers and specific keywords/types for demonstration
  return code
    .replace(/(\b\d+\b)/g, '<span class="text-purple-600 dark:text-purple-400">$1</span>') // Numbers
    .replace(/(\bMyReturnType\b)/g, '<span class="text-orange-600 dark:text-orange-400">$1</span>') // Specific type
    .replace(/(=>)/g, '<span class="text-gray-700 dark:text-gray-300">$1</span>') // Arrow function
}

export function TestCaseCard({ id, task, expected, status, index, isCompact }: TestCaseCardProps) {
  const statusIcon = {
    'not-run': <CircleDot className="h-4 w-4 text-gray-500" />,
    failed: <XCircle className="h-4 w-4 text-red-500" />,
    passed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  }[status]

  const statusText = {
    'not-run': 'NOT RUN',
    failed: 'FAILED',
    passed: 'PASSED',
  }[status]

  const borderColorClass = {
    'not-run': 'border-gray-200 dark:border-gray-700',
    failed: 'border-red-500',
    passed: 'border-green-500',
  }[status]

  const statusBgClass = {
    'not-run': 'bg-gray-200 dark:bg-gray-700',
    failed: 'bg-red-500',
    passed: 'bg-green-500',
  }[status]

  const statusTextClass = {
    'not-run': 'text-gray-700 dark:text-gray-300',
    failed: 'text-red-500',
    passed: 'text-green-500',
  }[status]

  return (
    <div
      className={cn(
        'w-full transition-all duration-300 relative rounded border border-l-4',
        isCompact ? 'py-1 px-2 max-w-xs' : 'pl-6', // Added max-w-xs here
        borderColorClass,
      )}
    >
      {!isCompact && (
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-5 flex items-center justify-center',
            statusBgClass,
            'text-white text-xs font-bold uppercase tracking-wider',
            'h-full', // Ensure it takes full height
          )}
          style={{ writingMode: 'sideways-lr', textOrientation: 'mixed' }} // For vertical text
        >
          {statusText}
        </div>
      )}

      <div className={cn('flex flex-row items-center justify-between p-2')}>
        <div className={cn('font-medium text-sm')}># {index + 1}</div>
        <div className="flex items-center gap-2">
          {statusIcon}
          {!isCompact && <span className={cn('text-xs', statusTextClass)}>{statusText}</span>}
        </div>
      </div>

      {!isCompact && (
        <div className="p-2 pt-0">
          <div>
            <h4 className="text-xs font-semibold m-0">Task:</h4>
            <pre
              className="whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-900 p-2 rounded-md"
              dangerouslySetInnerHTML={{ __html: formatCodeSnippet(task.trim()) }}
            />
          </div>
          <div>
            <h4 className="text-md font-semibold mb-1">Expected result:</h4>
            <pre
              className="whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-900 p-2 rounded-md"
              dangerouslySetInnerHTML={{ __html: formatCodeSnippet(expected.trim()) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

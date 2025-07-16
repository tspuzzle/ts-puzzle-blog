import { cn } from '@/_frontend/shared/lib/cn'
import { CheckCircle2, CircleDot, XCircle } from 'lucide-react'
import { TestCase, TestCaseStatus, TestCaseState } from '../model'
import RichText from '@/_frontend/shared/ui/rich-text'

type TestCaseCardProps = TestCase &
  TestCaseState & {
    index: number
    isCompact: boolean
  }

export function TestCaseCard({ task, expected, status, index, isCompact }: TestCaseCardProps) {
  const statusIcon = {
    [TestCaseStatus.NOT_RUN]: <CircleDot className="h-4 w-4 text-gray-500" />,
    [TestCaseStatus.FAILED]: <XCircle className="h-4 w-4 text-red-500" />,
    [TestCaseStatus.PASSED]: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  }[status]

  const statusText = {
    [TestCaseStatus.NOT_RUN]: 'NOT RUN',
    [TestCaseStatus.FAILED]: 'FAILED',
    [TestCaseStatus.PASSED]: 'PASSED',
  }[status]

  const borderColorClass = {
    [TestCaseStatus.NOT_RUN]: 'border-gray-200 dark:border-gray-700',
    [TestCaseStatus.FAILED]: 'border-red-500',
    [TestCaseStatus.PASSED]: 'border-green-500',
  }[status]

  const statusBgClass = {
    [TestCaseStatus.NOT_RUN]: 'bg-gray-200 dark:bg-gray-700',
    [TestCaseStatus.FAILED]: 'bg-red-500',
    [TestCaseStatus.PASSED]: 'bg-green-500',
  }[status]

  const statusTextClass = {
    [TestCaseStatus.NOT_RUN]: 'text-gray-700 dark:text-gray-300',
    [TestCaseStatus.FAILED]: 'text-red-500',
    [TestCaseStatus.PASSED]: 'text-green-500',
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

      {isCompact && (
        <div className={cn('flex flex-row items-center justify-between p-2')}>
          <div className={cn('font-medium text-sm')}># {index + 1}</div>
          <div className="flex items-center gap-2">
            {statusIcon}
            {!isCompact && <span className={cn('text-xs', statusTextClass)}>{statusText}</span>}
          </div>
        </div>
      )}

      {!isCompact && (
        <div className="p-2">
          <div>
            <h4 className="text-xs font-semibold m-0">Task:</h4>
            <RichText data={task} enableGutter={false} />
          </div>
          <div className="mt-1">
            <h4 className="text-xs font-semibold m-0">Expected result:</h4>
            <RichText data={expected} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  )
}

import { TestCaseCard } from './test-case-card'

interface TestCase {
  id: string
  task: string
  expected: string
  status: 'not-run' | 'failed' | 'passed'
}

interface TestCaseListProps {
  testCases: TestCase[]
  isCompact: boolean
}

export function TestCaseList({ testCases, isCompact }: TestCaseListProps) {
  return (
    <div className="grid gap-4">
      {testCases.map((testCase, index) => (
        <TestCaseCard
          key={testCase.id}
          id={testCase.id}
          task={testCase.task}
          expected={testCase.expected}
          status={testCase.status}
          index={index}
          isCompact={isCompact}
        />
      ))}
    </div>
  )
}

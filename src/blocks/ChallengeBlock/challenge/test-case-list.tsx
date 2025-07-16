import { TestCase, TestCaseState } from '../model'
import { TestCaseCard } from './test-case-card'

interface TestCaseListProps {
  testCases: TestCase[]
  testCaseStates: TestCaseState[]
  isCompact: boolean
}

export function TestCaseList({ testCases = [], isCompact, testCaseStates }: TestCaseListProps) {
  return (
    <div className="grid gap-4">
      {testCases.map((testCase, index) => (
        <TestCaseCard
          key={testCase.id}
          {...testCase}
          status={testCaseStates[index]?.status || 'not-run'}
          index={index}
          isCompact={isCompact}
        />
      ))}
    </div>
  )
}

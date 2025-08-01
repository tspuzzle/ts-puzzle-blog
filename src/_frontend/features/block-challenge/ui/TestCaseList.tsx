import { TestCase, TestCaseState } from '../model'
import { TestCaseCard } from './TestCaseCard'

interface TestCaseListProps {
  testCases: TestCase[]
  testCaseStates: TestCaseState[]
  isCompact: boolean
  isChecking?: boolean
}

export function TestCaseList({
  testCases = [],
  isCompact,
  testCaseStates,
  isChecking,
}: TestCaseListProps) {
  return (
    <div className="grid gap-4">
      {testCases.map((testCase, index) => (
        <TestCaseCard
          key={testCase.id}
          {...testCase}
          {...testCaseStates[index]}
          index={index}
          isCompact={isCompact}
          isChecking={isChecking}
        />
      ))}
    </div>
  )
}

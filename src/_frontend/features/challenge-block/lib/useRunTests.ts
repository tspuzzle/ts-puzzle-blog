import { ChallengeBlock } from '@/payload-types'
import { useState, useTransition } from 'react'
import { TestCaseState, TestCaseStatus } from '../model'
import { compileTypescriptCode } from '@/_frontend/shared/lib/ts-code-compiler'

export const useRunTests = ({ challengeBlock }: { challengeBlock: ChallengeBlock }) => {
  const { initialCode, testCases } = challengeBlock

  const [code, setCode] = useState(initialCode || '')

  const [testCaseStates, setTestCaseStates] = useState<TestCaseState[]>(
    (testCases || []).map((t) => ({ status: TestCaseStatus.NOT_RUN, id: t.id })),
  )

  const [isRunningTests, startTransition] = useTransition()

  const runTests = async () => {
    setTestCaseStates(() => (testCases || []).map(() => ({ status: TestCaseStatus.CHECKING })))

    startTransition(async () => {
      await Promise.all(
        (testCases || []).map((testCase, i) =>
          compileTypescriptCode(`${code};${testCase.test}`).then((result) => {
            setTestCaseStates((states) => {
              const newState = [...states]
              newState[i] = {
                status: result.success ? TestCaseStatus.PASSED : TestCaseStatus.FAILED,
              }
              return newState
            })
          }),
        ),
      )
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate delay for UI feedback
    })
  }

  return { code, setCode, isRunningTests, testCaseStates, runTests }
}

import { ChallengeBlock } from '@/payload-types'
import { useState } from 'react'
import { TestCaseState, TestCaseStatus } from '../model'
import { compileTypescriptCode } from '@/_frontend/shared/lib/ts-code-compiler'

export const useRunTests = ({ challengeBlock }: { challengeBlock: ChallengeBlock }) => {
  const { initialCode, testCases } = challengeBlock
  const [isRunningTests, setIsRunningTests] = useState(false)

  const [code, setCode] = useState(initialCode || '')

  const [testCaseStates, setTestCaseStates] = useState<TestCaseState[]>(
    (testCases || []).map((t) => ({ status: TestCaseStatus.NOT_RUN, id: t.id })),
  )

  const runTests = async () => {
    setIsRunningTests(true)
    setTestCaseStates((prev) => prev.map(() => ({ status: TestCaseStatus.CHECKING })))

    await Promise.all(
      (testCases || []).map((testCase, i) =>
        compileTypescriptCode(`${code};${testCase.test}`).then((result) => {
          setTestCaseStates((states) =>
            states.map((state, index) => {
              if (index === i) {
                return {
                  status: result.success ? TestCaseStatus.PASSED : TestCaseStatus.FAILED,
                  //error: result.success ? '' : result.errors.join('\n'),
                }
              }
              return state
            }),
          )
        }),
      ),
    )
    setIsRunningTests(false)
  }

  return { code, setCode, isRunningTests, setIsRunningTests, testCaseStates, runTests }
}

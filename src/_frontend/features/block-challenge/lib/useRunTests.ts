import { ChallengeBlock } from '@/payload-types'
import { useEffect, useState, useTransition } from 'react'
import { TestCaseState, TestCaseStatus } from '../model'
import { compileTypescriptCode } from '@/_frontend/shared/lib/ts-code-compiler'

const getLocalStorageItemKey = (challengeId: string | number) => `challenge-${challengeId}`

export const useRunTests = ({
  challengeBlock,
}: {
  challengeBlock: Omit<ChallengeBlock, 'blockType' | 'id'> & {
    id?: number | string | null | undefined
  }
}) => {
  const { initialCode, testCases } = challengeBlock

  const [code, setCode] = useState(initialCode || '')

  const [testCaseStates, setTestCaseStates] = useState<TestCaseState[]>(
    (testCases || []).map((t) => ({ status: TestCaseStatus.NOT_RUN, id: t.id })),
  )

  const [isRunningTests, startTransition] = useTransition()

  useEffect(() => {
    const rawItem = localStorage.getItem(getLocalStorageItemKey(challengeBlock.id!))
    if (rawItem) {
      try {
        const item = JSON.parse(rawItem)
        setCode(item.code)
        setTestCaseStates((testCases || []).map(() => ({ status: TestCaseStatus.PASSED })))
      } catch (e) {}
    }
  }, [challengeBlock, testCases])

  const runTests = async () => {
    setTestCaseStates(() => (testCases || []).map(() => ({ status: TestCaseStatus.CHECKING })))

    startTransition(async () => {
      const results = await Promise.all(
        (testCases || []).map((testCase, i) => compileTypescriptCode(`${code};${testCase.test}`)),
      )
      setTestCaseStates((states) => {
        return states.map((state, i) => ({
          ...state,
          status: results[i].success ? TestCaseStatus.PASSED : TestCaseStatus.FAILED,
        }))
      })

      if (results.every((result) => result.success)) {
        localStorage.setItem(
          getLocalStorageItemKey(challengeBlock.id!),
          JSON.stringify({ code, allPassed: true }),
        )
      } else {
        localStorage.removeItem(getLocalStorageItemKey(challengeBlock.id!))
      }

      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate delay for UI feedback
    })
  }

  return { code, setCode, isRunningTests, testCaseStates, runTests }
}

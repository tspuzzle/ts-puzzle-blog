import { ChallengeBlock as ChallengeBlockBase } from '@/payload-types'

export type ChallengeBlock = ChallengeBlockBase

export enum TestCaseStatus {
  NOT_RUN = 'not-run',
  PASSED = 'passed',
  FAILED = 'failed',
  CHECKING = 'checking',
}

export type TestCaseState = {
  status: TestCaseStatus
  inferredActualResult?: string | undefined | null
}

export type TestCase = ExtractArrayType<Exclude<ChallengeBlock['testCases'], null | undefined>>

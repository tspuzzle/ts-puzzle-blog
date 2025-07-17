import { ChallengeBlock } from '@/payload-types'

export enum TestCaseStatus {
  NOT_RUN = 'not-run',
  PASSED = 'passed',
  FAILED = 'failed',
}

export type TestCaseState = {
  status: TestCaseStatus
}

export type TestCase = ExtractArrayType<Exclude<ChallengeBlock['testCases'], null | undefined>>

'use client'
import { CodeEditor } from '@/_frontend/features/block-challenge/ui/CodeEditor'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/_frontend/shared/ui/resizable'
import { Code } from 'lucide-react' // Add Swords icon
import { Challenge } from '../model'
import { ChallengeDescriptionPanel } from './ChallengeDescriptionPanel'
import { useRunTests } from '@/_frontend/features/block-challenge/lib/useRunTests'
import { Button } from '@/_frontend/shared/ui/button'

export const ChallengePage = ({ challenge }: { challenge: Challenge }) => {
  const { code, setCode, testCaseStates, runTests, isRunningTests } = useRunTests({
    challengeBlock: challenge,
  })

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col mt-20">
      <div className="flex-grow overflow-hidden">
        <ResizablePanelGroup direction={'horizontal'} className="h-full w-full rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <ChallengeDescriptionPanel challenge={challenge} testCaseStates={testCaseStates} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Code className="h-5 w-5" /> Code
              </div>
              <CodeEditor value={code} onChange={setCode} className="flex-1" />
              <Button
                onClick={runTests}
                className="mt-4 w-full flex-shrink-0"
                disabled={isRunningTests}
              >
                {!isRunningTests ? 'Run' : 'Checking....'}
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

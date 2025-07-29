'use client'
import { useRunTests } from '@/_frontend/features/block-challenge/lib/useRunTests'
import { CodeEditor } from '@/_frontend/features/block-challenge/ui/CodeEditor'
import { Button } from '@/_frontend/shared/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/_frontend/shared/ui/resizable'
import { ChevronsLeft, ChevronsRight, Code } from 'lucide-react' // Add Swords icon
import { useEffect, useRef, useState } from 'react'
import { ImperativePanelGroupHandle } from 'react-resizable-panels'
import { useMeasure } from 'react-use'
import { Challenge } from '../model'
import { ChallengeDescriptionPanel } from './ChallengeDescriptionPanel'
import { ChallengePassedDialog } from './ChallengePassedDialog'
import { useSession } from 'next-auth/react'
import { ChallengeSolutionSubmission } from './ChallengeSolutionSubmission'
import { useSearchParams } from 'next/navigation'
import { is } from '@payloadcms/db-postgres/drizzle'

export const ChallengePage = ({ challenge }: { challenge: Challenge }) => {
  const searchParams = useSearchParams()
  const withSubmit = !!searchParams.get('withSubmit')

  const [currentTab, setCurrentTab] = useState('description')

  const { code, setCode, testCaseStates, runTests, isRunningTests } = useRunTests({
    challengeBlock: challenge,
    beforeRunTests: () => {
      setCurrentTab('test-cases')
    },
    afterSuccessRunTests: () => {
      setShowSuccessDialog(true)
    },
  })

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const panelGroupApiRef = useRef<ImperativePanelGroupHandle>(null)

  const [panelContainerRef, { width: panelWidth }] = useMeasure<HTMLDivElement>()
  const [panelLeftContainerRef, { width: panelLeftWidth }] = useMeasure<HTMLDivElement>()

  const [minSize, setMinSize] = useState(0)
  useEffect(() => {
    if (panelWidth !== 0) {
      const minLeftPanelPx = 100
      setMinSize((minLeftPanelPx * 100) / panelWidth)
    }
  }, [panelWidth])

  const [isCollapsedLeftPanel, setIsCollapsedLeftPanel] = useState(false)
  useEffect(() => {
    if (panelLeftWidth !== 0) {
      setIsCollapsedLeftPanel(() => panelLeftWidth < 120)
    }
  }, [panelLeftWidth])

  const { status } = useSession()

  const isAuthorisedUser = status === 'authenticated'

  useEffect(() => {
    if (isAuthorisedUser && withSubmit) {
      setShowSuccessDialog(true)
    }
  }, [withSubmit, isAuthorisedUser])

  return (
    <>
      <div className="flex h-[calc(100vh-80px)] w-full flex-col" ref={panelContainerRef}>
        <div className="flex-grow overflow-hidden">
          <ResizablePanelGroup
            direction={'horizontal'}
            className="h-full w-full rounded-lg border"
            ref={panelGroupApiRef}
          >
            <ResizablePanel defaultSize={50} minSize={minSize}>
              <ChallengeDescriptionPanel
                ref={panelLeftContainerRef}
                challenge={challenge}
                testCaseStates={testCaseStates}
                currentTab={currentTab}
                onChangeTab={(value) => {
                  if (isCollapsedLeftPanel && panelGroupApiRef.current) {
                    panelGroupApiRef.current.setLayout([50, 50])
                  }
                  setCurrentTab(value)
                }}
                isCollapsedPanel={isCollapsedLeftPanel}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex flex-col p-6">
                <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Button
                    variant={'ghost'}
                    size="clear"
                    className="-ml-3"
                    onClick={() => {
                      if (isCollapsedLeftPanel) {
                        panelGroupApiRef.current?.setLayout([50, 50])
                      } else {
                        panelGroupApiRef.current?.setLayout([minSize, 100 - minSize])
                      }
                    }}
                  >
                    {!isCollapsedLeftPanel && <ChevronsLeft className="w-4 h-4" />}
                    {isCollapsedLeftPanel && <ChevronsRight className="w-4 h-4" />}
                  </Button>
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
      {!isAuthorisedUser ? (
        <ChallengePassedDialog
          challengeSlug={challenge.slug!}
          open={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
        />
      ) : (
        <ChallengeSolutionSubmission
          open={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          solution={code}
          challengeId={challenge.id}
          afterSaveSubmission={() => setCurrentTab('solutions')}
        />
      )}
    </>
  )
}

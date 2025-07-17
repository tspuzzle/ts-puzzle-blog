'use client'
import React, { useMemo } from 'react'

import { cn } from '@/_frontend/shared/lib/cn'
import { Button } from '@/_frontend/shared/ui/button'
import { ChevronLeft, ChevronRight, Code, Eye, EyeOff, Maximize, Minimize } from 'lucide-react'
import { CodeEditor } from './CodeEditor'
import { TestCaseList } from './TestCaseList'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/_frontend/shared/ui/resizable'
import RichText from '@/_frontend/shared/ui/rich-text'
import { useCompactMode } from '../lib/useCompactMode'
import { useFullscreenMode } from '../lib/useFullscreenMode'
import { useRunTests } from '../lib/useRunTests'
import { ChallengeBlock as ChallengeBlockProps, TestCaseStatus } from '../model'

type Props = ChallengeBlockProps

export const ChallengeBlock: React.FC<Props> = (challengeBlockProps) => {
  const { description, title, testCases } = challengeBlockProps
  const [showDescription, setShowDescription] = React.useState(true)

  const { isCompactMode, setIsCompactMode, testCasesPanelRef } = useCompactMode()
  const { isFullScreen, setIsFullScreen } = useFullscreenMode()

  const { code, setCode, testCaseStates, runTests } = useRunTests({
    challengeBlock: challengeBlockProps,
  })

  const { totalCount, passedCount } = useMemo(
    () => ({
      totalCount: testCaseStates.length,
      passedCount: testCaseStates.filter((tc) => tc.status === TestCaseStatus.PASSED).length,
    }),
    [testCaseStates],
  )

  return (
    <div
      className={cn(
        'challenge-block',
        'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col rounded border ',
        isFullScreen &&
          'fixed inset-0 z-[50] h-screen max-h-screen w-screen rounded-none flex flex-col overflow-scroll',
      )}
    >
      <div className="flex flex-row items-center justify-between flex-shrink-0 p-4">
        <div className="text-xl font-bold flex items-center gap-2 text-primary m-0">
          <Code className="h-6 w-6" />
          {title}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          <span className="sr-only">{isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
        </Button>
      </div>

      {/* Task Description */}
      <div className={cn('p-4 pt-0')}>
        <div className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex-shrink-0 rounded">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="text-md font-bold m-0">Task Description</div>
            <Button
              variant="ghost"
              size="clear"
              className="mt-0 h-5 w-5"
              onClick={() => setShowDescription(!showDescription)}
            >
              {showDescription ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">
                {showDescription ? 'Hide Description' : 'Show Description'}
              </span>
            </Button>
          </div>
          {showDescription && (
            <div className={cn('p-4 pt-0', isFullScreen && 'max-h-[150px] overflow-y-scroll')}>
              <RichText data={description} enableGutter={false} />
            </div>
          )}
        </div>
      </div>

      <div className={cn(isFullScreen ? 'flex-grow min-h-[200px]' : 'h-[400px]')}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            {/* Attach ref to this inner div */}
            <div className="flex flex-col p-4 h-full">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="text-md flex justify-between items-center w-full">
                  {!isCompactMode && <span className="font-bold">Test Cases:</span>}
                  <span className="text-sm">
                    {passedCount} of {totalCount} passed
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-scroll" ref={testCasesPanelRef}>
                <TestCaseList
                  testCases={testCases || []}
                  testCaseStates={testCaseStates}
                  isCompact={isCompactMode}
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="flex flex-col h-full p-4 ">
              <div className="flex gap-2 items-center mb-4">
                <Button
                  variant="ghost"
                  size="clear"
                  onClick={() => setIsCompactMode(!isCompactMode)}
                >
                  {isCompactMode ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle Compact Mode</span>
                </Button>
                <span className="text-md font-bold flex-shrink-0">Your Code</span>
              </div>
              <CodeEditor value={code} onChange={setCode} className="flex-1" />
              <Button onClick={runTests} className="mt-4 w-full flex-shrink-0">
                Run
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

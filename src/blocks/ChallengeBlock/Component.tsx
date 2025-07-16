'use client'
import React, { useEffect } from 'react'

import type { ChallengeBlock as ChallengeBlockProps } from '@/payload-types'

type Props = ChallengeBlockProps

import { Button } from '@/_frontend/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/_frontend/shared/ui/card'
import { CodeEditor } from './challenge/code-editor'
import { TestCaseList } from './challenge/test-case-list'
import { ListCollapse, ListRestart, Code, Maximize, Minimize, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/_frontend/shared/lib/cn'

// Import Resizable components
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/_frontend/shared/ui/resizable'
import RichText from '@/_frontend/shared/ui/rich-text'

// Dummy data for the challenge (can be passed as props later if needed)
const challengeData = {
  title: 'TypeScript Type Challenge: DeepReadonly',
  description: {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text: 'Hello, it is very exciting',
              type: 'text',
              style: '',
              detail: 0,
              format: 1,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 1,
        },
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text: 'asdasd',
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
      textFormat: 1,
    },
  },
  testCases: [
    {
      id: '1',
      task: `
        interface Todo {
          title: string;
          description: string;
          completed: boolean;
          meta: {
            author: string;
          };
        }
        type Expected = {
          readonly title: string;
          readonly description: string;
          readonly completed: boolean;
          readonly meta: {
            readonly author: string;
          };
        };
        type Result = DeepReadonly<Todo>;
        type Test = Expect<Equal<Result, Expected>>;
      `,
      expected: 'type Test = true;',
      status: 'not-run',
    },
    {
      id: '2',
      task: `
        type NestedObject = {
          a: string;
          b: {
            c: number;
            d: {
              e: boolean;
            };
          };
        };
        type Expected = {
          readonly a: string;
          readonly b: {
            readonly c: number;
            readonly d: {
              readonly e: boolean;
            };
          };
        };
        type Result = DeepReadonly<NestedObject>;
        type Test = Expect<Equal<Result, Expected>>;
      `,
      expected: 'type Test = true;',
      status: 'not-run',
    },
    {
      id: '3',
      task: `
        type SimpleType = string;
        type Expected = string;
        type Result = DeepReadonly<SimpleType>;
        type Test = Expect<Equal<Result, Expected>>;
      `,
      expected: 'type Test = true;',
      status: 'not-run',
    },
    {
      id: '4',
      task: `
        type ArrayType = string[];
        type Expected = readonly string[];
        type Result = DeepReadonly<ArrayType>;
        type Test = Expect<Equal<Result, Expected>>;
      `,
      expected: 'type Test = true;',
      status: 'not-run',
    },
  ],
  initialCode: `
type DeepReadonly<T> = any; // Implement this type
  `,
}

export const ChallengeBlock: React.FC<Props> = (props) => {
  const [isCompactMode, setIsCompactMode] = React.useState(false)
  const [isFullScreen, setIsFullScreen] = React.useState(false)
  const [showDescription, setShowDescription] = React.useState(true)
  const [testCases, setTestCases] = React.useState(challengeData.testCases)
  const [code, setCode] = React.useState(challengeData.initialCode)

  const testCasesPanelRef = React.useRef<HTMLDivElement>(null) // Ref for the inner div of the test cases panel

  const passedCount = testCases.filter((tc) => tc.status === 'passed').length
  const totalCount = testCases.length

  // Function to simulate running tests (for demonstration)
  const runTests = () => {
    const updatedTestCases = testCases.map((testCase) => {
      // Simulate test logic: 50% chance of passing
      const newStatus = Math.random() > 0.5 ? 'passed' : 'failed'
      return { ...testCase, status: newStatus }
    })
    setTestCases(updatedTestCases)
  }

  useEffect(() => {
    const panelElement = testCasesPanelRef.current
    if (!panelElement) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentWidth = entry.contentRect.width
        const threshold = 150 // px

        if (currentWidth < threshold && !isCompactMode) {
          setIsCompactMode(true)
        }

        if (currentWidth >= threshold && isCompactMode) {
          setIsCompactMode(false)
        }
      }
    })

    resizeObserver.observe(panelElement)

    return () => {
      resizeObserver.unobserve(panelElement)
    }
  }, [isCompactMode]) // Re-run effect if these states change

  return (
    <Card
      className={cn(
        'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col',
        isFullScreen && 'fixed inset-0 z-[50] h-screen w-screen rounded-none ',
      )}
    >
      <div className="flex flex-row items-center justify-between flex-shrink-0 p-4">
        <div className="text-xl font-bold flex items-center gap-2 text-primary m-0">
          <Code className="h-6 w-6" />
          {challengeData.title}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          <span className="sr-only">{isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
        </Button>
      </div>

      {/* Task Description */}
      <div className="p-4">
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
            <div className="p-4 pt-0">
              <RichText data={challengeData.description} enableGutter={false} />
            </div>
          )}
        </div>
      </div>

      <div className="h-[400px] ">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            {/* Attach ref to this inner div */}
            <div className="flex flex-col p-4 h-full">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="text-md flex justify-between items-center w-full">
                  <span className="font-bold">Test Cases:</span>
                  <span className="text-sm">
                    {passedCount} of {totalCount} passed
                  </span>
                </div>
                {/*
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetTests}>
                    <ListRestart className="h-4 w-4" />
                    <span className="sr-only">Reset Tests</span>
                  </Button>
                  {!isAutoCompactActive && ( // Only show button if not in auto-compact mode
                    <Button variant="outline" size="sm" onClick={handleToggleCompactMode}>
                      <ListCollapse className="h-4 w-4" />
                      <span className="sr-only">Toggle Compact Mode</span>
                    </Button>
                  )}
                </div>
                */}
              </div>
              <div className="flex-1 overflow-y-auto" ref={testCasesPanelRef}>
                <TestCaseList testCases={testCases} isCompact={isCompactMode} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="flex flex-col h-full p-4">
              <div>
                <span className="text-lg font-bold mb-4 flex-shrink-0">Your Code</span>
              </div>
              <CodeEditor value={code} onChange={setCode} className="flex-1" />
              <Button onClick={runTests} className="mt-4 w-full flex-shrink-0">
                Run
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Card>
  )
}

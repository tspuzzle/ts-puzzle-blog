'use client'
import { TestCaseState } from '@/_frontend/features/block-challenge/model'
import { TestCaseList } from '@/_frontend/features/block-challenge/ui/TestCaseList'
import { cn } from '@/_frontend/shared/lib/cn' // Import cn utility
import RichText from '@/_frontend/shared/ui/rich-text'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_frontend/shared/ui/tabs'
import { BookOpen, FileText, FlaskConical } from 'lucide-react' // Add Swords icon
import { Challenge } from '../model'
import { BadgeDifficulty } from '@/_frontend/shared/ui/badge-difficulty'
import { BadgeTag } from '@/_frontend/shared/ui/badge-tag'
import { Tag } from '@/payload-types'
import { ChallengeSubmissions } from './ChallengeSubmissions'

export const ChallengeDescriptionPanel = ({
  challenge,
  testCaseStates,
  currentTab = 'description',
  onChangeTab,
  isCollapsedPanel,
  ref,
}: {
  challenge: Challenge
  testCaseStates: TestCaseState[]
  currentTab: string
  onChangeTab?: (tab: string) => void
  isCollapsedPanel?: boolean
  ref?: React.Ref<HTMLDivElement>
}) => {
  const tags = (challenge.tags || []) as Tag[]
  return (
    <Tabs
      value={currentTab}
      onValueChange={onChangeTab}
      className="flex flex-col h-full gap-2 p-6"
      ref={ref}
    >
      <TabsList
        className={cn(
          isCollapsedPanel
            ? 'flex flex-col h-auto bg-white dark:bg-black gap-1'
            : 'flex flex-wrap w-fit max-w-full overflow-scroll h-auto sticky top-0 z-10',
        )}
      >
        <TabsTrigger
          value="description"
          className={cn(isCollapsedPanel && 'data-[state=active]:bg-gray-50 w-full')}
        >
          {isCollapsedPanel ? (
            <FileText className="h-7 w-7 min-w-7" />
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" /> Description
            </>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="test-cases"
          className={cn(isCollapsedPanel && 'data-[state=active]:bg-gray-50 w-full')}
        >
          {isCollapsedPanel ? (
            <FlaskConical className="h-7 w-7 min-w-7" />
          ) : (
            <>
              <FlaskConical className="mr-2 h-4 w-4" /> Test Cases
            </>
          )}
        </TabsTrigger>
        {/*
        <TabsTrigger value="hints">
          <Lightbulb className="mr-2 h-4 w-4" /> Hints
        </TabsTrigger>
        */}
        <TabsTrigger value="solutions">
          {isCollapsedPanel ? (
            <BookOpen className="h-7 w-7 min-w-7" />
          ) : (
            <>
              <BookOpen className="mr-2 h-4 w-4" /> Test Cases
            </>
          )}
        </TabsTrigger>
      </TabsList>

      {!isCollapsedPanel && (
        <div className="flex-1 overflow-scroll">
          <TabsContent value="description" className="mt-6">
            <h1 className="text-4xl font-bold mb-4">{challenge.title}</h1>
            <div className="mb-6 flex flex-wrap gap-2">
              <BadgeDifficulty difficulty={challenge.difficulty} />
              {tags.map((t) => (
                <BadgeTag key={t.title}>{t.title}</BadgeTag>
              ))}
            </div>
            {challenge.description && (
              <RichText data={challenge.description} enableGutter={false} />
            )}
          </TabsContent>
          <TabsContent value="test-cases" className="mt-6">
            <TestCaseList
              testCases={challenge.testCases || []}
              testCaseStates={testCaseStates}
              isCompact={false}
            />
          </TabsContent>
          <TabsContent value="solutions" className="mt-6">
            <ChallengeSubmissions challengeId={challenge.id} />
          </TabsContent>
        </div>
      )}
    </Tabs>
  )
}

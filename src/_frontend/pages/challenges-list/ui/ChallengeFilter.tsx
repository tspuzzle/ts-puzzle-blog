import { cn } from '@/_frontend/shared/lib/cn'
import { Badge } from '@/_frontend/shared/ui/badge'
import { Button } from '@/_frontend/shared/ui/button'
import { Challenge, Tag } from '@/payload-types'
import { X, ChevronDown, ChevronUp } from 'lucide-react' // Import ChevronDown and ChevronUp
import { useState } from 'react'

const difficultyConfig = {
  easy: {
    label: 'Easy',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/30',
  },
  medium: {
    label: 'Medium',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/30',
  },
  hard: {
    label: 'Hard',
    className:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/30',
  },
  extreme: {
    label: 'Extreme',
    className:
      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/30',
  },
}

export type ChallengeFilterOptions = {
  selectedTags: string[]
  selectedDifficulties: string[]
}

export const ChallengeFilter = ({
  challenges,
  filteredChallenges,
  setFilter,
  filter,
}: {
  challenges: Challenge[]
  filteredChallenges: Challenge[]
  filter: ChallengeFilterOptions
  setFilter: React.Dispatch<React.SetStateAction<ChallengeFilterOptions>>
}) => {
  const { selectedTags, selectedDifficulties } = filter

  const [isCollapsed, setCollapsed] = useState<boolean>(true) // State to manage dropdown visibility

  const toggleDifficulty = (difficulty: string) => {
    setFilter((prev) => {
      const isSelected = prev.selectedDifficulties.includes(difficulty)
      return {
        ...prev,
        selectedDifficulties: isSelected
          ? prev.selectedDifficulties.filter((d) => d !== difficulty)
          : [...prev.selectedDifficulties, difficulty],
      }
    })
  }

  const toggleTag = (tag: string) => {
    setFilter((prev) => {
      const isSelected = prev.selectedTags.includes(tag)
      return {
        ...prev,
        selectedTags: isSelected
          ? prev.selectedTags.filter((t) => t !== tag)
          : [...prev.selectedTags, tag],
      }
    })
  }

  const clearAllFilters = () => {
    setFilter({
      selectedTags: [],
      selectedDifficulties: [],
    })
  }

  const hasActiveFilters = filter.selectedDifficulties.length > 0 || filter.selectedTags.length > 0
  const allTags = Array.from(new Set(challenges.flatMap((challenge) => challenge.tags as Tag[])))
    .map((tag) => tag.title)
    .sort()

  return (
    <div className="mb-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center justify-between ">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Filter Challenges
          </h2>
          {hasActiveFilters && (
            <>
              <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                {selectedDifficulties.length + selectedTags.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!isCollapsed)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isCollapsed ? null : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Difficulty Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Difficulty Level
                </h3>
                {selectedDifficulties.length > 0 && (
                  <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {selectedDifficulties.length} selected
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(difficultyConfig).map(([difficulty, config]) => {
                  const isSelected = selectedDifficulties.includes(difficulty)
                  const challengeCount = challenges.filter(
                    (c) => c.difficulty === difficulty,
                  ).length

                  return (
                    <button
                      key={difficulty}
                      onClick={() => toggleDifficulty(difficulty)}
                      className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105',
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
                      )}
                    >
                      <Badge
                        variant="secondary"
                        className={cn(
                          'mb-1 pointer-events-none',
                          isSelected
                            ? config.className
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
                        )}
                      >
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {challengeCount} challenges
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tag Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Technologies & Topics
                </h3>
                {selectedTags.length > 0 && (
                  <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {selectedTags.length} selected
                  </span>
                )}
              </div>
              <div className="max-h-32">
                <div className="flex flex-wrap gap-2 pr-2">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag)
                    const challengeCount = challenges.filter((c) =>
                      (c.tags as Tag[]).map((t) => t.title).includes(tag),
                    ).length

                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105',
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                        )}
                      >
                        {tag}
                        <span
                          className={cn(
                            'text-xs px-1.5 py-0.5 rounded-full',
                            isSelected
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
                          )}
                        >
                          {challengeCount}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between gap-8 flex-wrap">
                <div className="flex  items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Active filters:</span>
                  <div className="flex flex-wrap items-center gap-1">
                    {selectedDifficulties.map((difficulty) => (
                      <Badge
                        key={difficulty}
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          difficultyConfig[difficulty as keyof typeof difficultyConfig].className,
                        )}
                      >
                        {difficultyConfig[difficulty as keyof typeof difficultyConfig].label}
                      </Badge>
                    ))}
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-primary/10 border-primary/20 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">
                  {filteredChallenges.length} of {challenges.length} challenges
                </span>
              </div>
              <div></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

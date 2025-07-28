'use client'
import { Challenge, Tag } from '@/payload-types'
import { ChallengeCard } from './ChallengeCard'
import { ChallengeFilter, ChallengeFilterOptions } from './ChallengeFilter'
import { useState } from 'react'

export default function ChallengesListPage({ challenges }: { challenges: Challenge[] }) {
  const [filter, setFilter] = useState<ChallengeFilterOptions>({
    selectedTags: [],
    selectedDifficulties: [],
  })

  const filteredChallenges = challenges.filter((challenge) => {
    const { selectedDifficulties, selectedTags } = filter
    const matchesDifficulty =
      selectedDifficulties.length === 0 || selectedDifficulties.includes(challenge.difficulty!)
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => (challenge.tags as Tag[]).map((t) => t.title).includes(tag))
    return matchesDifficulty && matchesTags
  })

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:py-16 md:py-12 pt-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">TypeScript Challenges</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Test your TypeScript skills with our collection of type challenges. From beginner-friendly
          utility types to extreme advanced scenarios that will push your understanding to the
          limit.
        </p>
      </div>

      <ChallengeFilter
        challenges={challenges}
        filteredChallenges={filteredChallenges}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  )
}

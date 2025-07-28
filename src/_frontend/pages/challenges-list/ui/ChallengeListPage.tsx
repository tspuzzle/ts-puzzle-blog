import { Challenge } from '@/payload-types'
import { ChallengeCard } from './ChallengeCard'

export default function ChallengesListPage({ challenges }: { challenges: Challenge[] }) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  )
}

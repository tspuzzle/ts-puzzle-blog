import { ChallengeCard } from './ChallengeCard'

// Mock data for challenges
const challenges = [
  {
    id: '1',
    title: 'DeepReadonly',
    description:
      'Implement a generic type that makes every property of an object and its sub-objects readonly.',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Generics', 'Utility Types', 'Recursion'],
    completedBy: 1247,
    estimatedTime: '15-20 min',
  },
  {
    id: '2',
    title: 'Pick',
    description: 'Implement the built-in Pick<T, K> generic without using it.',
    difficulty: 'easy' as const,
    tags: ['TypeScript', 'Utility Types', 'Mapped Types'],
    completedBy: 3421,
    estimatedTime: '5-10 min',
  },
  {
    id: '3',
    title: 'Chainable Options',
    description:
      'Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Generics', 'Method Chaining'],
    completedBy: 892,
    estimatedTime: '20-25 min',
  },
  {
    id: '4',
    title: 'IsNever',
    description:
      'Implement a utility type IsNever<T>, which takes input type T. If T is never, return true, otherwise, return false.',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Conditional Types', 'Never Type'],
    completedBy: 756,
    estimatedTime: '10-15 min',
  },
  {
    id: '5',
    title: 'Extreme Readonly',
    description:
      'Make a Readonly type that works for deeply nested objects, arrays, functions, classes and more.',
    difficulty: 'extreme' as const,
    tags: ['TypeScript', 'Advanced Types', 'Recursion', 'Complex'],
    completedBy: 123,
    estimatedTime: '45-60 min',
  },
  {
    id: '6',
    title: 'Tuple to Union',
    description:
      'Implement a generic TupleToUnion<T> which covers the values of a tuple to its values union.',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Tuple', 'Union Types'],
    completedBy: 1089,
    estimatedTime: '10-15 min',
  },
  {
    id: '7',
    title: 'Readonly 2 duaisd diuasyd iaosd aoiduasio du aspdoa usdpo',
    description: 'Implement a generic MyReadonly2<T, K> which takes two type argument T and K.',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Utility Types', 'Keyof'],
    completedBy: 1456,
    estimatedTime: '15-20 min',
  },
  {
    id: '8',
    title: 'Deep Readonly',
    description:
      'Implement a type DeepReadonly<T> which make every parameter of an object - and its sub-objects recursively - readonly.',
    difficulty: 'easy' as const,
    tags: ['TypeScript', 'Recursion', 'Readonly'],
    completedBy: 2134,
    estimatedTime: '10-15 min',
  },
  {
    id: '9',
    title: 'Trim Left',
    description:
      'Implement TrimLeft<T> which takes an exact string type and returns a new string with the whitespace beginning removed.',
    difficulty: 'medium' as const,
    tags: ['TypeScript', 'Template Literal', 'String Manipulation'],
    completedBy: 967,
    estimatedTime: '15-20 min',
  },
  {
    id: '10',
    title: 'IsUnion',
    description:
      'Implement a type IsUnion, which takes an input type T and returns whether T resolves to a union type.',
    difficulty: 'hard' as const,
    tags: ['TypeScript', 'Union Types', 'Conditional Types', 'Advanced'],
    completedBy: 234,
    estimatedTime: '30-40 min',
  },
]

export default function ChallengesListPage() {
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

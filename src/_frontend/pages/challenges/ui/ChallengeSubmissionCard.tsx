import { Avatar, AvatarFallback, AvatarImage } from '@/_frontend/shared/ui/avatar'
import { Card } from '@/_frontend/shared/ui/card'
import { CodeBlock } from '@/_frontend/shared/ui/code-block'
import { ChallengeUserSubmission, User } from '@/payload-types'
import { Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const ChallengeSubmissionCard = ({
  submission,
  showUser,
}: {
  submission: ChallengeUserSubmission
  showUser?: boolean
}) => {
  const user = submission.user as User
  return (
    <Card className="p-4">
      <div className="flex gap-4 mb-3 items-center flex-wrap">
        {showUser && (
          <div className="flex gap-2 items-center">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={user?.image || undefined} alt="@username" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>@{user.name}</span>
          </div>
        )}
        <div className="text-gray-400 flex gap-1 items-center text-sm">
          <Calendar className="h-4 w-4" />
          {formatDistanceToNow(new Date(submission.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
      <CodeBlock code={submission.solution} />
    </Card>
  )
}

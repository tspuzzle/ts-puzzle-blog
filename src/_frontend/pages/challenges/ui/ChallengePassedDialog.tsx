import { Button } from '@/_frontend/shared/ui/button'
import { Dialog, DialogContent } from '@/_frontend/shared/ui/dialog'
import { signIn } from 'next-auth/react'
import Confetti from 'react-confetti'
import { useMeasure } from 'react-use'

export const ChallengePassedDialog = ({
  open,
  onClose,
  challengeSlug,
}: {
  open: boolean
  onClose: () => void
  challengeSlug: string
}) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  if (!open) {
    return null
  }

  const showConfetti = width > 0 && height > 0
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent ref={ref} className="p-0">
        <div className="p-10 flex flex-col gap-4">
          {showConfetti && <Confetti width={width} height={height} recycle={false} gravity={0.2} />}

          <h2 className="text-4xl font-bold">
            🎉 <span className="block">Congratulations! You have passed all the test cases!</span>
          </h2>

          <span className="text-xl">You&apos;re clearly skilled — why not show it off?</span>
          <div>
            <Button
              onClick={async () => {
                await signIn('github', { redirectTo: `/challenges/${challengeSlug}?withSubmit` })
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

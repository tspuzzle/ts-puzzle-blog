import { Alert, AlertDescription } from '@/_frontend/shared/ui/alert'
import { Button } from '@/_frontend/shared/ui/button'
import { Dialog, DialogContent } from '@/_frontend/shared/ui/dialog'
import { Textarea } from '@/_frontend/shared/ui/textarea'
import { AlertCircleIcon } from 'lucide-react'
import Confetti from 'react-confetti'
import { useForm } from 'react-hook-form'
import { useMeasure } from 'react-use'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FormControl, FormField, FormItem, Form } from '@/_frontend/shared/ui/form'
import { useTransition } from 'react'
import { submitUserChallengeSolution } from '../api/submitUserChallengeSolution'
import { useSession } from 'next-auth/react'

export const SubmitSolutionSchema = z.object({
  annotations: z.string().optional(),
})
export type SubmitSolutionSchemaType = z.infer<typeof SubmitSolutionSchema>

export const ChallengeSolutionSubmission = ({
  open,
  onClose,
  solution,
  challengeId,
  afterSaveSubmission,
}: {
  open: boolean
  onClose: () => void
  solution: string
  challengeId: number
  afterSaveSubmission: () => void
}) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const { data: session } = useSession()
  const form = useForm<SubmitSolutionSchemaType>({
    resolver: zodResolver(SubmitSolutionSchema),
    defaultValues: {
      annotations: '',
    },
  })
  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: SubmitSolutionSchemaType) => {
    startTransition(async () => {
      if (session?.user?.id) {
        await submitUserChallengeSolution({
          userId: session.user.id,
          challengeId,
          solution,
          annotations: values.annotations,
        })

        afterSaveSubmission()
        onClose()
      }
    })
  }

  if (!open) {
    return null
  }

  const showConfetti = width > 0 && height > 0
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent ref={ref} className="p-0">
        <Form {...form}>
          <form className="p-10 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            {showConfetti && (
              <Confetti width={width} height={height} recycle={false} gravity={0.2} />
            )}

            <h2 className="text-4xl font-bold">
              🎉 <span className="block">Congratulations! You have passed all the test cases!</span>
            </h2>

            <span className="text-xl">You can now submit your solution</span>
            <span>
              Add a short annotation to your solution; it will be visible to other users. We use
              Markdown for formatting.
            </span>
            <Alert variant="info">
              <AlertCircleIcon className="w-5 h-5" />
              <AlertDescription>
                <p>
                  We will save your code from the Code Editor as it is since it has passed all test
                  cases. This helps prevent any accidental changes that could cause it to fail the
                  tests.
                </p>
              </AlertDescription>
            </Alert>
            <FormField
              control={form.control}
              name="annotations"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Annotations (optional)" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button className="w-full" type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

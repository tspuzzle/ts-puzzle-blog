import { getChallenges } from '@/_frontend/pages/challenges-list/api/getChallenges'
import ChallengeListPage from '@/_frontend/pages/challenges-list/ui/ChallengeListPage'

export default async function Page() {
  const challenges = await getChallenges()
  return <ChallengeListPage challenges={challenges} />
}

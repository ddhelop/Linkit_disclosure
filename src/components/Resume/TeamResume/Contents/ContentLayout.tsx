import { TeamIntroductionResponse } from '@/lib/types'
import TeamResumeProgress from './TeamResumeProgress'

interface TeamResumContentsProps {
  data: TeamIntroductionResponse
}

export default function TeamContentLayout({ data }: TeamResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      <TeamResumeProgress data={data?.teamCompletionResponse} />
    </div>
  )
}

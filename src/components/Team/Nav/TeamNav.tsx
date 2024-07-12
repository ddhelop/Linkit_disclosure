import { TeamMiniProfileResponse } from '@/lib/types'
import TeamResumeNavProfile from './TeamNavProfile'

interface TeamResumNavProps {
  data: TeamMiniProfileResponse
}

export default function TeamNav({ data }: TeamResumNavProps) {
  return (
    <div className="flex flex-col">
      <TeamResumeNavProfile data={data} />
    </div>
  )
}

import { TeamMiniProfileResponse } from '@/lib/types'
import TeamResumeNavProfile from './TeamResumeNavProfile'

interface TeamResumNavProps {
  data: TeamMiniProfileResponse
}

export default function TeamResumeNav({ data }: TeamResumNavProps) {
  return (
    <div className="flex flex-col">
      <TeamResumeNavProfile data={data} />
    </div>
  )
}

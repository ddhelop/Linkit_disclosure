import { MyResumeResponse } from '@/lib/types'
import MyResumeNavProfile from './PrivateNavProfile'
import PrivateNavProfile from './PrivateNavProfile'
interface MyResumNavProps {
  data: MyResumeResponse
}

export default function PrivateNav({ data }: MyResumNavProps) {
  const miniProfileData = data.miniProfileResponse
  const profileId = data.profileId
  const jobAndSkillResponse = data.jobAndSkillResponse
  return (
    <div className="flex flex-col">
      <PrivateNavProfile data={miniProfileData} jobAndSkill={jobAndSkillResponse} profileId={profileId} />
    </div>
  )
}

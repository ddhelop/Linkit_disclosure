import { MyResumeResponse } from '@/lib/types'
import MyResumeNavProfile from './MyResumeNavProfile'
interface MyResumNavProps {
  data: MyResumeResponse
}

export default function MyResumNav({ data }: MyResumNavProps) {
  const miniProfileData = data.miniProfileResponse
  const name = data.memberNameResponse
  return (
    <div className="flex flex-col">
      <MyResumeNavProfile data={miniProfileData} name={name} />
    </div>
  )
}

import { MyResumeResponse } from '@/lib/types'
import MyResumeNavProfile from './MyResumeNavProfile'
interface MyResumNavProps {
  data: MyResumeResponse
}

export default function MyResumNav({ data }: MyResumNavProps) {
  const miniProfileData = data.miniProfileResponse
  return (
    <div className="flex flex-col">
      <MyResumeNavProfile data={miniProfileData} />
    </div>
  )
}

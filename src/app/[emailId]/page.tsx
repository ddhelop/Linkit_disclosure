import { getUserBasicInfo } from '@/entities/user/api/userApi'
import { notFound } from 'next/navigation'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  try {
    const userInfo = await getUserBasicInfo()

    // URL의 emailId와 실제 사용자의 emailId가 일치하는지 확인
    if (params.emailId !== userInfo.emailId) {
      return notFound()
    }

    return (
      <div>
        <h1>{userInfo.memberName}의 프로필</h1>
        {/* 프로필 컴포넌트들 추가 */}
      </div>
    )
  } catch (error) {
    return notFound()
  }
}

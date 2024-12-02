import { getUserBasicInfo } from '@/entities/user/api/userApi'
import { notFound } from 'next/navigation'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  // const userInfo = await getUserBasicInfo()

  return <div>{/* 프로필 컴포넌트들 추가 */}</div>
}

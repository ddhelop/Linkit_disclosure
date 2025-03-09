'use client'
import { handleScrap } from '@/features/profile/api/profileViewApi'
import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfileScrap({ isProfileScrap, emailId }: { isProfileScrap: boolean; emailId: string }) {
  const [isScrap, setIsScrap] = useState(isProfileScrap)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const onClickScrap = async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }

    const response = await handleScrap(emailId, isScrap)

    if (response.isSuccess) {
      setIsScrap(!isScrap)
      toast.success('스크랩 처리가 완료되었어요.')
    }
  }

  return (
    <button
      onClick={onClickScrap}
      className="flex w-[12.5rem] justify-center gap-2 rounded-full bg-white py-4 hover:border hover:border-[#4D82F3]"
    >
      {isScrap ? (
        <Image src="/common/icons/save.svg" alt="scrap" width={20} height={20} />
      ) : (
        <Image src="/common/icons/not_save.svg" alt="scrap" width={20} height={20} />
      )}
      <span className="text-sm text-[#4D82F3]">스크랩 하기</span>
    </button>
  )
}

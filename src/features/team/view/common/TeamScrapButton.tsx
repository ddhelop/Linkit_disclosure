'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { teamScrap } from '../../api/teamApi'
import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'

interface TeamScrapButtonProps {
  teamName: string
  initialIsScrap: boolean
  teamScrapCount: number
}

export const TeamScrapButton = ({ teamName, initialIsScrap, teamScrapCount }: TeamScrapButtonProps) => {
  const [isTeamScrap, setIsTeamScrap] = useState(initialIsScrap)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const { isLogin } = useAuthStore()

  const onClickTeamScrap = async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }

    if (isScrapLoading) return

    const newScrapState = !isTeamScrap

    // 즉시 UI 업데이트
    setIsTeamScrap(newScrapState)

    try {
      setIsScrapLoading(true)
      const data = await teamScrap(teamName, newScrapState)

      if (data.isSuccess) {
        toast.success('스크랩 상태가 변경되었습니다.')
      } else {
        // API 실패시 원래 상태로 롤백
        setIsTeamScrap(!newScrapState)
        toast.alert(data.message || '스크랩 상태 변경에 실패했습니다.')
      }
    } catch (error) {
      // 에러 발생시 원래 상태로 롤백
      setIsTeamScrap(!newScrapState)
      console.error('Failed to update scrap:', error)
      toast.alert('스크랩 상태 변경에 실패했습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <div
      onClick={onClickTeamScrap}
      className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
    >
      <Image
        src={isTeamScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
        alt="scrap"
        width={20}
        height={20}
      />
      <span className="text-sm font-semibold text-[#4D82F3]">{isTeamScrap ? '스크랩 취소' : '스크랩 하기'}</span>
    </div>
  )
}

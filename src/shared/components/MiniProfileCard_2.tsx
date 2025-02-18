import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { profileScrap } from '../api/commonApi'
import { Profile, Team } from '@/features/find/types/FindTypes'
import { useToast } from '../hooks/useToast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/useAuthStore'

interface MiniProfileCard2Props {
  profile: Profile
}

export default function MiniProfileCard_2({ profile }: MiniProfileCard2Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isScrap, setIsScrap] = useState(profile?.isProfileScrap ?? false)
  const [scrapCount, setScrapCount] = useState(profile?.profileScrapCount ?? 0)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const handleScrap = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isScrapLoading) return

    try {
      if (!isLogin) {
        toast.alert('로그인이 필요한 기능입니다.')
        router.push('/login')
        return
      }
      setIsScrapLoading(true)
      const response = await profileScrap(profile.emailId, !isScrap)
      if (response.ok) {
        setIsScrap(!isScrap)
        setScrapCount((prev) => (isScrap ? prev - 1 : prev + 1))
        toast.success('스크랩 상태가 변경되었습니다.')
      }
    } catch (error) {
      toast.alert('스크랩 상태 변경에 실패했습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <Link
      href={`/${profile.emailId}`}

      className=" flex min-w-[20rem] cursor-pointer flex-col rounded-xl border border-transparent bg-[#EDF3FF] p-[1.37rem] pb-7 hover:border-main lg:min-w-[16rem] "

      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      {/* 첫째줄 */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          {profile?.profileCurrentStates?.slice(0, 2).map((state, index) => (
            <div key={index} className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">
              {state?.profileStateName}
            </div>
          ))}
          {profile?.profileCurrentStates?.length > 2 && (
            <div className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">
              +{profile?.profileCurrentStates?.length - 2}
            </div>
          )}
        </div>
        {/* 스크랩 버튼 */}
        <div
          onClick={handleScrap}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer p-1"
        >
          <Image
            src={isScrap || isHovered ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            width={18}
            height={18}
            alt="save"
          />
        </div>
      </div>

      <div className="mt-[1.59rem] flex gap-3">
        <Image
          src={profile?.profileImagePath || '/common/default_profile.svg'}
          width={80}
          height={80}
          alt="profile"
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-grey90">{profile?.memberName}</span>
            <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
          </div>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">포지션</span>
            <span className="text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">{profile?.majorPosition}</span>
          </span>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">지역</span>
            <span className="pl-[0.655rem] text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">
              {profile?.regionDetail?.cityName} {profile?.regionDetail?.divisionName}
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

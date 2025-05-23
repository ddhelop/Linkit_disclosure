'use client'
import { useState } from 'react'
import { EditableContainer } from '../component/EditableContainer'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getProfileDetail } from '@/features/profile-view/api/ProfileViewApi'
import ProfileViewLinksSkeleton from './skeleton/ProfileViewLinksSkeleton'

export default function ProfileViewLinks({ emailId }: { emailId: string }) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000, // 1분 동안 캐싱 유지
  })

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return <ProfileViewLinksSkeleton />
  }

  const isMyProfile = data?.result?.isMyProfile
  const linkItems = data?.result?.profileLinkItems || []

  const socialMediaPlatforms = [
    'facebook',
    'github',
    'instagram',
    'linkedin',
    'notion',
    'tiktok',
    'twitter',
    'youtube',
    'x.com',
  ]

  const getSocialIcon = (linkPath: string) => {
    const platform = socialMediaPlatforms.find((platform) => linkPath.includes(platform))
    return platform ? `/common/icons/social/${platform}.svg` : null
  }

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/links"
      className="flex w-full flex-col gap-5 border-y border-grey20 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border"
    >
      <h1 className="font-semibold">링크</h1>

      <div className="flex flex-col gap-2">
        {/* 데이터가 없을 시 */}
        {linkItems.length === 0 &&
          (isMyProfile ? (
            <div className="flex w-full items-center text-sm text-grey60">
              수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
            </div>
          ) : (
            <div className="flex w-full items-center text-sm text-grey60">아직 추가하지 않았어요</div>
          ))}
        {linkItems.map((link) => {
          const iconPath = getSocialIcon(link.linkPath)
          return (
            <Link
              href={link.linkPath.startsWith('http') ? link.linkPath : `https://${link.linkPath}`}
              target="_blank"
              key={link.profileLinkId}
              className="relative flex cursor-pointer items-center gap-2 rounded-xl bg-grey10 px-6 py-3 hover:ring-4 hover:ring-grey40"
              onMouseEnter={() => setHoveredLink(link.profileLinkId.toString())}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {iconPath && <Image src={iconPath} alt={`${link.linkName} icon`} width={20} height={20} />}
              <p className="text-sm text-grey80">{link.linkName}</p>
              {hoveredLink === link.profileLinkId.toString() && (
                <div className="absolute left-0 top-full z-10 mt-2 rounded-md bg-gray-800 px-2 py-1 text-sm text-white opacity-100 transition-all duration-200">
                  {link.linkPath}
                </div>
              )}
              <Image src="/common/icons/share.svg" alt="share" width={20} height={20} />
            </Link>
          )
        })}
      </div>
    </EditableContainer>
  )
}

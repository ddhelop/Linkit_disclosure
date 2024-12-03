import { useState } from 'react'
import { useProfile } from '@/entities/profile/model/ProfileContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileViewLinks() {
  const { profileData } = useProfile()
  const isMyProfile = profileData?.isMyProfile
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialMediaPlatforms = [
    'facebook',
    'github',
    'instagram',
    'linkedin',
    'notion',
    'tiktok',
    'x',
    'twitter',
    'youtube',
  ]

  const getSocialIcon = (linkPath: string) => {
    const platform = socialMediaPlatforms.find((platform) => linkPath.includes(platform))
    return platform ? `/common/icons/social/${platform}.svg` : null
  }

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/link"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">링크</h1>

      <div className="flex flex-col gap-2">
        {profileData?.profileLinkItems.map((link) => {
          const iconPath = getSocialIcon(link.linkPath)
          return (
            <Link
              href={link.linkPath}
              target="_blank"
              key={link.profileLinkId}
              className="relative flex cursor-pointer items-center gap-2 rounded-xl bg-grey10 px-6 py-3 hover:ring-4 hover:ring-grey40"
              onMouseEnter={() => setHoveredLink(link.profileLinkId.toString())}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {iconPath && <Image src={iconPath} alt={`${link.linkName} icon`} width={20} height={20} />}
              <p className="text-sm text-grey80">{link.linkName}</p>
              {hoveredLink === link.profileLinkId.toString() && (
                <div className="absolute left-0 top-full mt-2 rounded-md bg-gray-800 px-2 py-1 text-sm text-white opacity-100 transition-all duration-200">
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

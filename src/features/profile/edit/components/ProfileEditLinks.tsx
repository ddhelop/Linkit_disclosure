'use client'
import { useState, useEffect } from 'react'
import { getLinkIcon } from '../lib/getLinkIcon'
import { LinkItem, saveLinks, getLinks, ProfileLinkResponse } from '../api/profileLinkApi'
import { LinkListSkeleton } from './skeletons/ListSkeletons'
import { DynamicLinkList } from '@/shared/ui/DynamicLinkList/DynamicLinkList'
import { Button } from '@/shared/ui/Button/Button'
import { useToast } from '@/shared/hooks/useToast'
import { useProfileMenuStore } from '../../store/useProfileMenuStore'

export default function ProfileEditLinks() {
  const [initialLinks, setInitialLinks] = useState<ProfileLinkResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [links, setLinks] = useState<ProfileLinkResponse[]>([])
  const { updateProfileMenu } = useProfileMenuStore()
  const toast = useToast()

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinks()
        // 받아온 데이터를 ProfileLinkResponse 형식으로 변환
        const formattedLinks = data.map((item: any) => ({
          profileLinkId: item.id,
          linkName: item.title,
          linkPath: item.url,
          linkType: 'CUSTOM',
        }))
        if (formattedLinks.length > 0) {
          updateProfileMenu({ isProfileLink: true })
        }
        setInitialLinks(formattedLinks)
        setLinks(formattedLinks)
      } catch (error) {
        console.error('Failed to fetch links:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [])

  const hasChanges = () => {
    // 링크 배열의 길이가 다르면 변경사항이 있음
    if (links.length !== initialLinks.length) return true

    // 각 링크의 title과 url을 비교
    return links.some((link, index) => {
      const initialLink = initialLinks[index]
      const currentLinkName = link?.linkName?.trim() || ''
      const currentLinkPath = link?.linkPath?.trim() || ''
      const initialLinkName = initialLink?.linkName?.trim() || ''
      const initialLinkPath = initialLink?.linkPath?.trim() || ''

      return currentLinkName !== initialLinkName || currentLinkPath !== initialLinkPath
    })
  }

  const handleSave = async () => {
    const validLinks = links.filter((link) => {
      return link.linkName.trim() !== '' && link.linkPath.trim() !== ''
    })

    setIsSubmitting(true)
    try {
      await saveLinks(validLinks)
      setInitialLinks(validLinks) // 저장 성공 시 initialLinks 업데이트
      if (validLinks.length > 0) {
        updateProfileMenu({ isProfileLink: true })
      } else {
        updateProfileMenu({ isProfileLink: false })
      }
      toast.success('링크가 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('Failed to save links:', error)
      toast.alert('링크 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <LinkListSkeleton />
      </div>
    )
  }

  return (
    <>
      <DynamicLinkList initialLinks={links} getLinkIcon={getLinkIcon} onChange={setLinks} type="profile" />
      <div className="mt-4 flex justify-end">
        <Button
          mode="main"
          // animationMode="main"
          onClick={handleSave}
          disabled={isSubmitting || !hasChanges()}
          className="rounded-xl font-semibold hover:opacity-90"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span>저장 중...</span>
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </div>
    </>
  )
}

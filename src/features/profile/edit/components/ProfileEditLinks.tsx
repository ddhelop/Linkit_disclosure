'use client'
import { useState, useEffect } from 'react'
import { getLinkIcon } from '../lib/getLinkIcon'
import { LinkItem, saveLinks, getLinks } from '../api/profileLinkApi'
import { LinkListSkeleton } from './skeletons/ListSkeletons'
import { DynamicLinkList } from '@/shared/ui/DynamicLinkList/DynamicLinkList'
import { Button } from '@/shared/ui/Button/Button'

export default function ProfileEditLinks() {
  const [initialLinks, setInitialLinks] = useState<LinkItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [links, setLinks] = useState<LinkItem[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinks()
        setInitialLinks(data)
        setLinks(data)
      } catch (error) {
        console.error('Failed to fetch links:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [])

  const handleSave = async () => {
    const validLinks = links.filter((link) => {
      return link.title.trim() !== '' && link.url.trim() !== ''
    })

    if (validLinks.length === 0) {
      alert('저장할 링크 데이터가 없습니다.')
      return
    }

    setIsSubmitting(true)
    try {
      await saveLinks(validLinks)
      alert('링크가 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('Failed to save links:', error)
      alert('링크 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasValidLinks = () => {
    return links.some((link) => link.title.trim() !== '' && link.url.trim() !== '')
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
      <DynamicLinkList initialLinks={initialLinks} getLinkIcon={getLinkIcon} onChange={setLinks} />
      <div className="mt-4 flex justify-end">
        <Button mode="main2" animationMode="main" onClick={handleSave} disabled={isSubmitting || !hasValidLinks()}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </>
  )
}

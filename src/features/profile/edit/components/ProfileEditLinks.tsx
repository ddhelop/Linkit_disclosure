'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getLinkIcon } from '../lib/getLinkIcon'
import { LinkItem, saveLinks, getLinks } from '../api/profileLinkApi'

export default function ProfileEditLinks() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinks()
        setLinks(data)
      } catch (error) {
        console.error('Failed to fetch links:', error)
      }
    }

    fetchLinks()
  }, [])

  const addLink = () => {
    setLinks([...links, { id: Date.now(), title: '', url: '' }])
  }

  const deleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const updateLink = (id: number, field: 'title' | 'url', value: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      await saveLinks(links)
      alert('링크가 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('Failed to save links:', error)
      alert('링크 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Button mode="main2" animationMode="main" className="w-full" onClick={addLink}>
          링크 추가하기
        </Button>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <div key={link.id} className="mt-3 flex gap-2">
              <Input
                placeholder="직접입력 (5자 내외)"
                value={link.title}
                onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                maxLength={10}
              />
              <div className="relative w-full">
                {getLinkIcon(link.url) && (
                  <Image
                    src={getLinkIcon(link.url)!}
                    alt="social icon"
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                )}
                <Input
                  placeholder="링크를 입력해주세요."
                  className={`w-full ${getLinkIcon(link.url) ? 'pl-10' : ''}`}
                  value={link.url}
                  onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                />
              </div>
              <Image
                src="/common/icons/delete_x.svg"
                alt="close"
                width={24}
                height={24}
                className="ml-4 cursor-pointer"
                onClick={() => deleteLink(link.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button mode="main2" animationMode="main" onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </>
  )
}

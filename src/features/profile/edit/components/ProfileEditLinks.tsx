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
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          {links.length === 0 ? (
            <div className="mt-5 flex w-full flex-col items-center bg-white px-[1.62rem] py-6">
              <p className="text-sm text-grey70">
                아직 추가된 링크가 없어요! 추가하기 버튼을 눌러 링크를 추가해 보세요
              </p>
              <Button
                mode="custom"
                animationMode="main"
                className="mt-5 rounded-full border border-grey40 bg-white px-6 py-2 text-grey80"
                onClick={addLink}
              >
                + 추가하기
              </Button>
            </div>
          ) : (
            links.map((link) => (
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
            ))
          )}
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

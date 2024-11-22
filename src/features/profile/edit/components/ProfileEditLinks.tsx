'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState } from 'react'
import { getLinkIcon } from '../lib/getLinkIcon'
import type { LinkItem } from '../model/types'

export default function ProfileEditLinks() {
  const [links, setLinks] = useState<LinkItem[]>([])

  const addLink = () => {
    setLinks([...links, { id: Date.now(), title: '', url: '' }])
  }

  const deleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const updateLink = (id: number, field: 'title' | 'url', value: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        {/* 추가하기 버튼 */}
        <Button mode="main2" animationMode="main" className="w-full" onClick={addLink}>
          링크 추가하기
        </Button>

        {/* 링크 목록 */}
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
        <Button mode="main2" animationMode="main">
          저장하기
        </Button>
      </div>
    </>
  )
}

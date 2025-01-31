import { ProfileLinkResponse } from '@/features/profile/edit/api/profileLinkApi'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export interface LinkItem {
  id: number
  name: string
  path: string
}

interface DynamicLinkListProps {
  initialLinks?: any[]
  getLinkIcon?: (url: string) => string | null
  addButtonText?: string
  emptyMessage?: string
  onChange?: (links: any[]) => void
  type?: 'profile' | 'product'
}

export function DynamicLinkList({
  initialLinks = [],
  getLinkIcon,
  addButtonText = '+ 추가하기',
  emptyMessage = '아직 추가된 링크가 없어요! 추가하기 버튼을 눌러 링크를 추가해 보세요',
  onChange,
  type = 'product',
}: DynamicLinkListProps) {
  // 내부적으로 통일된 형식의 LinkItem으로 변환하여 사용
  const convertToLinkItem = (link: any): LinkItem => {
    if (type === 'profile') {
      return {
        id: link.profileLinkId,
        name: link.linkName,
        path: link.linkPath,
      }
    }
    return {
      id: link.productLinkId,
      name: link.productLinkName,
      path: link.productLinkPath,
    }
  }

  // 외부로 내보낼 때는 원래 형식으로 변환
  const convertFromLinkItem = (link: LinkItem) => {
    if (type === 'profile') {
      return {
        profileLinkId: link.id,
        linkName: link.name,
        linkPath: link.path,
        linkType: 'CUSTOM', // 프로필 링크의 경우 필요한 기본값
      }
    }
    return {
      productLinkId: link.id,
      productLinkName: link.name,
      productLinkPath: link.path,
    }
  }

  const [links, setLinks] = useState<LinkItem[]>(initialLinks.map(convertToLinkItem))
  const [showForm, setShowForm] = useState(initialLinks.length > 0)

  useEffect(() => {
    if (initialLinks.length > 0) {
      setLinks(initialLinks.map(convertToLinkItem))
      setShowForm(true)
    }
  }, [initialLinks])

  const startAddingLinks = () => {
    setShowForm(true)
    const newLinks = [{ id: Date.now(), name: '', path: '' }]
    setLinks(newLinks)
    onChange?.(newLinks.map(convertFromLinkItem))
  }

  const addLink = () => {
    const newLinks = [...links, { id: Date.now(), name: '', path: '' }]
    setLinks(newLinks)
    onChange?.(newLinks.map(convertFromLinkItem))
  }

  const deleteLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id)
    setLinks(updatedLinks)
    onChange?.(updatedLinks.map(convertFromLinkItem))

    if (updatedLinks.length === 0) {
      setShowForm(false)
    }
  }

  const updateLink = (id: number, field: 'name' | 'path', value: string) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    setLinks(updatedLinks)
    onChange?.(updatedLinks.map(convertFromLinkItem))
  }

  if (!showForm) {
    return (
      <div className="flex w-full flex-col items-center rounded-xl bg-grey10 px-[1.62rem] py-6">
        <p className="text-sm text-grey70">{emptyMessage}</p>
        <Button
          mode="custom"
          className="mt-5 rounded-full border border-grey40 bg-white px-6 py-2 text-grey70 hover:bg-grey10"
          onClick={startAddingLinks}
        >
          {addButtonText}
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl bg-grey10 p-6">
        {links.map((link) => (
          <div key={link.id} className="mt-3 flex gap-2">
            <Input
              placeholder="직접입력 (5자 내외)"
              value={link.name}
              onChange={(e) => updateLink(link.id, 'name', e.target.value)}
              maxLength={10}
            />
            <div className="relative w-full">
              {getLinkIcon && getLinkIcon(link.path) && (
                <Image
                  src={getLinkIcon(link.path)!}
                  alt="social icon"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              )}
              <Input
                placeholder="링크를 입력해주세요."
                className={`w-full ${getLinkIcon && getLinkIcon(link.path) ? 'pl-10' : ''}`}
                value={link.path}
                onChange={(e) => updateLink(link.id, 'path', e.target.value)}
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
        <div className="flex justify-center">
          <Button
            mode="custom"
            className="mt-5 w-fit rounded-full border border-grey40 bg-white px-6 py-2 text-grey80 hover:bg-grey10"
            onClick={addLink}
          >
            {addButtonText}
          </Button>
        </div>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'

export interface PortfolioLink {
  id: number
  projectLinkName: string
  projectLinkUrl: string
}

interface PortfolioLinkListProps {
  initialLinks?: PortfolioLink[]
  addButtonText?: string
  onChange?: (links: PortfolioLink[]) => void
}

export function PortfolioLinkList({
  initialLinks = [],
  addButtonText = '+ 링크 추가하기',
  onChange,
}: PortfolioLinkListProps) {
  const [links, setLinks] = useState<PortfolioLink[]>(
    initialLinks.length > 0 ? initialLinks : [{ id: Date.now(), projectLinkName: '', projectLinkUrl: '' }],
  )

  useEffect(() => {
    setLinks(initialLinks.length > 0 ? initialLinks : [{ id: Date.now(), projectLinkName: '', projectLinkUrl: '' }])
  }, [initialLinks])

  const addLink = () => {
    const newLinks = [...links, { id: Date.now(), projectLinkName: '', projectLinkUrl: '' }]
    setLinks(newLinks)
    onChange?.(newLinks)
  }

  const deleteLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id)
    // 모든 링크가 삭제되면 빈 링크 하나 추가
    const finalLinks =
      updatedLinks.length === 0 ? [{ id: Date.now(), projectLinkName: '', projectLinkUrl: '' }] : updatedLinks
    setLinks(finalLinks)
    onChange?.(finalLinks)
  }

  const updateLink = (id: number, field: 'projectLinkName' | 'projectLinkUrl', value: string) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    setLinks(updatedLinks)
    if (updatedLinks.some((link) => link.projectLinkName.trim() !== '' && link.projectLinkUrl.trim() !== '')) {
      onChange?.(updatedLinks)
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl ">
      {links.map((link) => (
        <div key={link.id} className="mt-3 flex flex-col gap-2 md:flex-row">
          <Input
            placeholder="직접입력 (5자 내외)"
            value={link.projectLinkName}
            onChange={(e) => updateLink(link.id, 'projectLinkName', e.target.value)}
            maxLength={5}
            className="w-full border-grey40 md:w-[200px]"
          />
          <div className="flex flex-1 gap-2">
            <Input
              placeholder="링크를 입력해 주세요"
              className="w-full border-grey40"
              value={link.projectLinkUrl}
              onChange={(e) => updateLink(link.id, 'projectLinkUrl', e.target.value)}
            />
            <Image
              src="/common/icons/delete_x.svg"
              alt="close"
              width={24}
              height={24}
              className="ml-4 cursor-pointer"
              onClick={() => deleteLink(link.id)}
            />
          </div>
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
  )
}

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export interface LinkItem {
  productLinkId: number
  productLinkName: string
  productLinkPath: string
}

interface DynamicLinkListProps {
  initialLinks?: LinkItem[]
  getLinkIcon?: (url: string) => string | null
  addButtonText?: string
  emptyMessage?: string
  onChange?: (links: LinkItem[]) => void
}

export function DynamicLinkList({
  initialLinks = [],
  getLinkIcon,
  addButtonText = '+ 추가하기',
  emptyMessage = '아직 추가된 링크가 없어요! 추가하기 버튼을 눌러 링크를 추가해 보세요',
  onChange,
}: DynamicLinkListProps) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)
  const [showForm, setShowForm] = useState(initialLinks.length > 0)

  useEffect(() => {
    if (initialLinks.length > 0) {
      setLinks(initialLinks)
      setShowForm(true)
    }
  }, [initialLinks])

  const startAddingLinks = () => {
    setShowForm(true)
    const newLinks = [{ productLinkId: Date.now(), productLinkName: '', productLinkPath: '' }]
    setLinks(newLinks)
    onChange?.(newLinks)
  }

  const addLink = () => {
    const newLinks = [...links, { productLinkId: Date.now(), productLinkName: '', productLinkPath: '' }]
    setLinks(newLinks)
    onChange?.(newLinks)
  }

  const deleteLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.productLinkId !== id)
    setLinks(updatedLinks)
    onChange?.(updatedLinks)

    if (updatedLinks.length === 0) {
      setShowForm(false)
    }
  }

  const updateLink = (id: number, field: 'productLinkName' | 'productLinkPath', value: string) => {
    const updatedLinks = links.map((link) => (link.productLinkId === id ? { ...link, [field]: value } : link))
    setLinks(updatedLinks)
    onChange?.(updatedLinks)
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
          <div key={link.productLinkId} className="mt-3 flex gap-2">
            <Input
              placeholder="직접입력 (5자 내외)"
              value={link.productLinkName}
              onChange={(e) => updateLink(link.productLinkId, 'productLinkName', e.target.value)}
              maxLength={10}
            />
            <div className="relative w-full">
              {getLinkIcon && getLinkIcon(link.productLinkPath) && (
                <Image
                  src={getLinkIcon(link.productLinkPath)!}
                  alt="social icon"
                  width={20}
                  height={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              )}
              <Input
                placeholder="링크를 입력해주세요."
                className={`w-full ${getLinkIcon && getLinkIcon(link.productLinkPath) ? 'pl-10' : ''}`}
                value={link.productLinkPath}
                onChange={(e) => updateLink(link.productLinkId, 'productLinkPath', e.target.value)}
              />
            </div>
            <Image
              src="/common/icons/delete_x.svg"
              alt="close"
              width={24}
              height={24}
              className="ml-4 cursor-pointer"
              onClick={() => deleteLink(link.productLinkId)}
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

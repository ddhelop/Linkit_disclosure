'use client'

import { useToast } from '@/shared/hooks/useToast'
import Image from 'next/image'

interface ShareLinkButtonProps {
  url?: string
  className?: string
  iconSize?: number
  showText?: boolean
  text?: string
}

export default function ShareLinkButton({
  url,
  className = '',
  iconSize = 16,
  showText = true,
  text = '공유하기',
}: ShareLinkButtonProps) {
  const toast = useToast()

  const handleCopyLink = () => {
    const linkToCopy = url || window.location.href

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        toast.success('링크 복사 완료!')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
        toast.alert('링크 복사에 실패했습니다.')
      })
  }

  return (
    <div
      className={`flex cursor-pointer items-center gap-1 rounded-lg p-2 hover:bg-grey10 ${className}`}
      onClick={handleCopyLink}
    >
      <Image src="/common/icons/icn_link.svg" alt="링크" width={iconSize} height={iconSize} />
      {showText && <p className="text-xs text-[#4D82F3]">{text}</p>}
    </div>
  )
}

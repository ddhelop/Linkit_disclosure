'use client'
import { useEffect, useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'
import { createPortal } from 'react-dom'

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  if (!isOpen) return null

  // 클라이언트 사이드에서만 포털 사용
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="relative h-full w-full bg-white md:h-auto md:w-auto md:rounded-xl">
        <button onClick={onClose} className="absolute right-6 top-6 cursor-pointer" aria-label="Close modal">
          <Image src="/common/icons/delete_icon.svg" alt="close" width={24} height={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

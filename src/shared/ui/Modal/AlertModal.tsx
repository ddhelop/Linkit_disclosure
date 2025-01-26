'use client'

import { useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'

interface AlertModalProps {
  isOpen: boolean
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onCancel: () => void
  onConfirm: () => void
  onCancelAction?: () => void
}

export default function AlertModal({
  isOpen,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
  onCancelAction,
}: AlertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [modalRef],
    handler: onCancel,
    isEnabled: isOpen,
  })

  const handleCancel = () => {
    onCancel()
    onCancelAction?.()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="w-[22.5rem] rounded-xl bg-white p-6">
        <div className="flex flex-col items-center">
          <Image src="/common/icons/warning.svg" alt="alert" width={44} height={44} />
          <h2 className="mt-4 text-center text-lg font-bold text-grey100">{title}</h2>
          <p className="mt-2 whitespace-pre-line text-center text-sm text-grey60">{description}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg bg-grey20 py-3 text-sm text-grey90 hover:bg-grey30"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#FFE1E1] py-3 text-sm text-[#FF4747] hover:bg-[#FFD1D1]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

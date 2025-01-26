'use client'

import { useEffect, useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'

interface EmailIdChangeModalProps {
  isOpen: boolean
  onClose: () => void
  initialEmailId: string
  onSubmit: (newEmailId: string) => void
}

export default function EmailIdChangeModal({ isOpen, onClose, initialEmailId, onSubmit }: EmailIdChangeModalProps) {
  const [emailId, setEmailId] = useState(initialEmailId)
  const modalRef = useRef<HTMLDivElement>(null)
  const isChanged = emailId !== initialEmailId

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setEmailId(initialEmailId)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialEmailId])

  const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값을 그대로 사용
    const value = e.target.value
    setEmailId(value)
  }

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: true,
    shouldListenEscape: true,
  })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-[90%] max-w-[510px] rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center font-semibold text-grey90">변경할 유저 아이디를 입력해 주세요</h2>

        <span className="text-sm font-normal text-grey80">새로운 유저 아이디</span>
        <Input
          value={emailId}
          onChange={handleEmailIdChange}
          className="mb-4 mt-3 w-full"
          placeholder="새로운 유저 아이디를 입력해 주세요"
        />
        <Button
          onClick={() => onSubmit(emailId)}
          disabled={!isChanged}
          mode={isChanged ? 'black' : 'custom'}
          className="w-full py-[0.82rem]"
        >
          유저 아이디 변경하기
        </Button>
      </div>
    </div>
  )
}

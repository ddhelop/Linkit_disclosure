'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'

interface EmailChangeModalProps {
  isOpen: boolean
  onClose: () => void
  initialEmail: string
  onSubmit: (newEmail: string, verificationCode: string) => void
}

export default function EmailChangeModal({ isOpen, onClose, initialEmail, onSubmit }: EmailChangeModalProps) {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setEmail('')
      setVerificationCode('')
      setIsCodeSent(false)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleSendVerificationCode = () => {
    // TODO: API call to send verification code
    setIsCodeSent(true)
  }

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
        <h2 className="mb-6 text-center font-semibold">변경할 이메일을 인증해 주세요</h2>

        <div className="mb-6">
          <span className="text-sm font-normal text-grey80">새로운 이메일</span>
          <div className="mt-3 flex gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              placeholder="새로운 이메일을 입력해 주세요"
            />
            <Button onClick={handleSendVerificationCode} mode="black" className="whitespace-nowrap px-4">
              인증코드 보내기
            </Button>
          </div>
        </div>

        {isCodeSent && (
          <div className="mb-6">
            <span className="text-sm font-normal text-grey80">인증코드</span>
            <div className="mt-3">
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full"
                placeholder="새로운 이메일로 전송된 6자리 숫자 코드를 입력해 주세요"
              />
            </div>
            <div className="mt-2 text-xs text-grey60">
              <p>• 인증코드는 10분 동안 유효합니다</p>
              <p>• 인증코드 전송에 문제가 있을 경우, 새로고침 후 다시 시도해 주세요</p>
            </div>
          </div>
        )}

        <Button
          onClick={() => onSubmit(email, verificationCode)}
          disabled={!email || (isCodeSent && !verificationCode)}
          mode={email && (!isCodeSent || verificationCode) ? 'black' : 'custom'}
          className="w-full py-[0.82rem]"
        >
          이메일 변경하기
        </Button>
      </div>
    </div>
  )
}

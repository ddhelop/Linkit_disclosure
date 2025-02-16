'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import { requestEmailAuthentication, verifyEmailAndChange } from '../../api/emailAuthentication'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface EmailChangeModalProps {
  isOpen: boolean
  onClose: () => void
  initialEmail: string
  onSubmit: (newEmail: string, verificationCode: string) => void
}

export default function EmailChangeModal({ isOpen, onClose, initialEmail, onSubmit }: EmailChangeModalProps) {
  const [email, setEmail] = useState(initialEmail)
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const isChanged = email !== initialEmail

  // 타이머 관리
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerRunning(false)
      setIsCodeSent(false)
      setTimeLeft(180)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isTimerRunning, timeLeft])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setEmail(initialEmail)
      setVerificationCode('')
      setIsCodeSent(false)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialEmail])

  // useOnClickOutside 훅 추가
  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  const handleSendVerificationCode = async () => {
    try {
      setIsLoading(true)
      await requestEmailAuthentication(email)
      setIsCodeSent(true)
      setTimeLeft(180)
      setIsTimerRunning(true)
    } catch (error) {
      console.error('Failed to send verification code:', error)
      // TODO: 에러 처리
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await verifyEmailAndChange(email, verificationCode)
      onSubmit(email, verificationCode)
    } catch (error) {
      console.error('Failed to verify email:', error)
      // TODO: 에러 처리
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="pointer-events-auto fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="w-[90%] max-w-[510px] rounded-xl bg-white p-6">
        <h2 className="mb-6 text-center font-semibold">변경할 이메일을 인증해 주세요</h2>

        <div className="mb-6">
          <span className="text-sm font-normal text-grey80">새로운 이메일</span>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              placeholder="새로운 이메일을 입력해 주세요"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendVerificationCode}
              disabled={!isChanged || isTimerRunning || isLoading}
              mode="custom"
              animationMode="main"
              className="min-w-[120px] whitespace-nowrap rounded-lg bg-[#D3E1FE] px-2 text-sm font-semibold text-main"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-main border-t-transparent" />
                </div>
              ) : isTimerRunning ? (
                `재전송 ${formatTime(timeLeft)}`
              ) : (
                '인증코드 보내기'
              )}
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
                disabled={isLoading}
              />
            </div>
            <div className="mt-2 text-xs text-grey60">
              <p>• 인증코드는 10분 동안 유효합니다</p>
              <p>• 인증코드 전송에 문제가 있을 경우, 새로고침 후 다시 시도해 주세요</p>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!isCodeSent || !verificationCode || isLoading}
          mode={isCodeSent && verificationCode ? 'black' : 'custom'}
          className="w-full py-[0.82rem]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            '이메일 변경하기'
          )}
        </Button>
      </div>
    </div>
  )
}

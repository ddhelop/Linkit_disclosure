'use client'

import { useEffect, useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber'

interface PhoneChangeModalProps {
  isOpen: boolean
  onClose: () => void
  initialPhone: string
  onSubmit: (newPhone: string) => void
}

export default function PhoneChangeModal({ isOpen, onClose, initialPhone, onSubmit }: PhoneChangeModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(formatPhoneNumber(initialPhone))
  const modalRef = useRef<HTMLDivElement>(null)
  const isChanged = phoneNumber !== formatPhoneNumber(initialPhone)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setPhoneNumber(formatPhoneNumber(initialPhone))
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialPhone])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const value = e.target.value.replace(/[^0-9]/g, '')

    // 빈 값이거나 숫자만 있는 경우 허용
    if (value === '' || /^\d+$/.test(value)) {
      setPhoneNumber(formatPhoneNumber(value))
    }
  }

  useOnClickOutside(modalRef, onClose)

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
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="w-[90%] max-w-[510px] rounded-xl bg-white p-6">
        <h2 className="mb-6 text-center font-semibold text-grey90">변경할 전화번호를 입력해 주세요</h2>

        <span className="text-sm font-normal text-grey80">새로운 전화번호</span>
        <Input
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="mb-4 mt-3 w-full"
          placeholder="새로운 전화번호를 입력해 주세요"
        />
        <Button
          onClick={() => onSubmit(phoneNumber)}
          disabled={!isChanged}
          mode={isChanged ? 'black' : 'custom'}
          className="w-full py-[0.82rem]"
        >
          전화번호 변경하기
        </Button>
      </div>
    </div>
  )
}

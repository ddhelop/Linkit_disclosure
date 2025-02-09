'use client'

import { useEffect, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { useRef } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import { validateName } from '@/shared/utils/validation'

interface NameChangeModalProps {
  isOpen: boolean
  onClose: () => void
  initialName: string
  onSubmit: (newName: string) => void
}

export default function NameChangeModal({ isOpen, onClose, initialName, onSubmit }: NameChangeModalProps) {
  const [newName, setNewName] = useState(initialName)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const isChanged = newName !== initialName

  useEffect(() => {
    setNewName(initialName)
  }, [initialName])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: true,
    shouldListenEscape: true,
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const validation = validateName(newValue)

    setNewName(newValue)
    setError(validation.errorMessage)
  }

  const handleSubmit = () => {
    const validation = validateName(newName)
    if (!validation.isValid) {
      setError(validation.errorMessage)
      return
    }
    onSubmit(newName)
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
        <h2 className="mb-6 text-center font-semibold text-grey90">변경할 이름을 입력해 주세요</h2>

        <span className="text-sm font-normal text-grey80">새로운 이름</span>
        <Input
          value={newName}
          onChange={handleNameChange}
          className="mb-4 mt-3 w-full"
          placeholder="새로운 이름을 입력해 주세요"
          error={!!error}
        />
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="flex w-full gap-2">
          <Button
            onClick={onClose}
            mode="custom"
            className="w-full rounded-xl bg-grey30 py-[0.82rem] text-grey80 hover:bg-grey40"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isChanged || !!error}
            mode={isChanged && !error ? 'main' : 'custom'}
            className="w-full py-[0.82rem]"
          >
            이름 변경하기
          </Button>
        </div>
      </div>
    </div>
  )
}

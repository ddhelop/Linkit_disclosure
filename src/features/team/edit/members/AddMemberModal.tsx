'use client'

import { useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="flex w-[31.8rem] flex-col gap-5 rounded-2xl bg-white p-6">
        <h3 className="text-center font-semibold text-grey90">추가할 팀원의 이메일을 입력해 주세요</h3>
        <Input placeholder="추가할 팀원의 이메일을 입력해 주세요" />
        <p className="text-xs font-normal text-grey60">
          초대를 보내면 초대 받은 팀원이 이메일을 통해 링킷에 가입하고 팀원으로 등록됩니다
        </p>
        <Button mode="black" animationMode="black" className="w-full rounded-lg py-[0.83rem]">
          이메일로 초대 보내기
        </Button>
      </div>
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import Select from '@/shared/ui/Select/Select'
import { useEmailValidation } from '@/shared/lib/hooks/useEmailValidations'
import { inviteTeamMember } from '../../api/teamApi'
import { useToast } from '@/shared/hooks/useToast'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  teamName: string
  onMemberUpdate: () => void
}

export function AddMemberModal({ isOpen, onClose, teamName, onMemberUpdate }: AddMemberModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const { email, setEmail, isValid } = useEmailValidation()
  const [role, setRole] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const isFormValid = isValid && role !== ''

  const handleClose = () => {
    setEmail('')
    setRole('')
    onClose()
  }

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return

    try {
      setIsSubmitting(true)
      await inviteTeamMember(
        {
          teamMemberInvitationEmail: email,
          teamMemberType: role === 'TEAM_MANAGER' ? 'TEAM_MANAGER' : 'TEAM_VIEWER',
        },
        teamName,
      )
      toast.success('팀원 초대가 성공적으로 전송되었습니다.')
      onMemberUpdate()
      handleClose()
    } catch (error) {
      const errorMessage = error instanceof Error && error.message ? error.message : '알 수 없는 오류가 발생했습니다.'
      toast.alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  useOnClickOutside({
    refs: [modalRef],
    handler: handleClose,
    isEnabled: isOpen,
    shouldListenEscape: true,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="flex w-[40.25rem] flex-col gap-5 rounded-2xl bg-white p-6">
        <h3 className="text-center font-semibold text-grey90">추가할 팀원의 이메일을 입력해 주세요</h3>
        <div className="flex gap-3">
          <Input
            placeholder="추가할 팀원의 이메일을 입력해 주세요"
            className="w-[80%]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <Select
            options={[
              { label: '뷰어', value: 'TEAM_VIEWER' },
              { label: '관리자', value: 'TEAM_MANAGER' },
            ]}
            value={role}
            onChange={setRole}
            className="w-[20%]"
            disabled={isSubmitting}
          />
        </div>
        <p className="text-xs font-normal text-grey60">
          초대를 보내면 초대 받은 팀원이 이메일을 통해 링킷에 가입하고 팀원으로 등록됩니다.
        </p>
        <Button
          mode="main"
          animationMode="main"
          className="w-full rounded-lg py-[0.83rem]"
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              초대 중...
            </div>
          ) : (
            '이메일로 초대 보내기'
          )}
        </Button>
      </div>
    </div>
  )
}

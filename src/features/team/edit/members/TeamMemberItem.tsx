'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { useToast } from '@/shared/hooks/useToast'
import { updateMemberType, removeMember } from '../../api/teamApi'

interface TeamMemberItemProps {
  profileImagePath?: string
  name: string
  position: string
  memberType: 'TEAM_OWNER' | 'TEAM_MANAGER' | 'TEAM_VIEWER'
  isPending?: boolean
  emailId?: string
  teamCode: string
  onMemberUpdate?: () => void
  myRole: {
    isTeamOwner: boolean
    isTeamManager: boolean
  }
}

export function TeamMemberItem({
  profileImagePath,
  name,
  position,
  memberType,
  isPending,
  emailId,
  teamCode,
  onMemberUpdate,
  myRole,
}: TeamMemberItemProps) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  console.log(emailId)

  const canManageRole = myRole.isTeamOwner || (myRole.isTeamManager && memberType === 'TEAM_VIEWER')
  const canDelete = myRole.isTeamOwner || (myRole.isTeamManager && memberType === 'TEAM_VIEWER')

  const getButtonStyle = (type: 'manager' | 'viewer' | 'delete') => {
    const isDisabled = (() => {
      if (type === 'delete') {
        return !canDelete && !isPending
      }
      if (isPending) return true
      if (memberType === 'TEAM_OWNER') return true
      if (!canManageRole) return true
      if (type === 'manager' && memberType === 'TEAM_MANAGER') return true
      if (type === 'viewer' && memberType === 'TEAM_VIEWER') return true
      return false
    })()

    return `flex w-full items-center px-4 py-2 text-sm ${
      isDisabled ? 'cursor-not-allowed text-grey40' : type === 'delete' ? 'text-[#FF345F]' : 'text-grey80'
    } hover:bg-grey20`
  }

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setShowMenu(false),
    isEnabled: showMenu,
  })

  const handleUpdateMemberType = async (emailId: string, newType: string) => {
    try {
      await updateMemberType(teamCode, emailId, newType)
      toast.success('팀원 권한이 변경되었습니다.')
      setShowMenu(false)
      onMemberUpdate?.()
    } catch (error) {
      console.error('Error updating member type:', error)
      toast.alert('팀원 권한 변경에 실패했습니다.')
    }
  }

  const handleRemoveMember = async (emailId: string) => {
    try {
      await removeMember(teamCode, emailId, isPending || false)
      toast.success('팀원이 삭제되었습니다.')
      setShowMenu(false)
      onMemberUpdate?.()
    } catch (error) {
      console.error('Error removing member:', error)
      toast.alert('팀원 삭제에 실패했습니다.')
    }
  }

  const renderMenuItems = () => {
    return (
      <>
        <button
          className={getButtonStyle('manager')}
          onClick={() =>
            !isPending &&
            canManageRole &&
            emailId &&
            memberType !== 'TEAM_MANAGER' &&
            handleUpdateMemberType(emailId, 'TEAM_MANAGER')
          }
          disabled={isPending || !canManageRole || memberType === 'TEAM_OWNER' || memberType === 'TEAM_MANAGER'}
        >
          관리자로 설정
        </button>
        <button
          className={getButtonStyle('viewer')}
          onClick={() =>
            !isPending &&
            canManageRole &&
            emailId &&
            memberType !== 'TEAM_VIEWER' &&
            handleUpdateMemberType(emailId, 'TEAM_VIEWER')
          }
          disabled={isPending || !canManageRole || memberType === 'TEAM_OWNER' || memberType === 'TEAM_VIEWER'}
        >
          뷰어로 설정
        </button>
        <button
          className={getButtonStyle('delete')}
          onClick={() => emailId && handleRemoveMember(emailId)}
          disabled={!isPending && (!canDelete || memberType === 'TEAM_OWNER')}
        >
          삭제하기
        </button>
      </>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-9 py-5">
      <div className="flex items-center gap-5">
        <div className="relative h-[52px] w-[52px] rounded-lg">
          <Image
            src={profileImagePath || '/common/default_profile.svg'}
            fill
            alt="profile"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex gap-2">
          <span className="flex font-semibold text-grey80">{isPending ? emailId : name}</span>
          {!isPending && (
            <>
              <span className="text-sm text-grey50">|</span>
              <span className="flex text-sm text-grey80">{position}</span>
            </>
          )}
          <span className="text-sm text-grey50">
            {isPending
              ? '(대기중)'
              : memberType === 'TEAM_OWNER'
                ? '(오너)'
                : memberType === 'TEAM_MANAGER'
                  ? '(관리자)'
                  : '(멤버)'}
          </span>
        </div>
      </div>
      {(myRole.isTeamOwner || myRole.isTeamManager) && (
        <div className="relative">
          <div ref={buttonRef} onClick={() => setShowMenu(!showMenu)} className="cursor-pointer">
            <Image src="/common/icons/more_row.svg" width={24} height={24} alt="menu" />
          </div>

          {showMenu && (
            <div ref={menuRef} className="absolute left-0 top-8 z-10 min-w-[120px] rounded-lg bg-white py-2 shadow-lg">
              {renderMenuItems()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { leaveTeam } from '../../api/teamApi'
import { useToast } from '@/shared/hooks/useToast'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface TeamDropdownMenuProps {
  teamCode: string
  onDeleteTeam: () => void
}

export const TeamDropdownMenu = ({ teamCode, onDeleteTeam }: TeamDropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  useOnClickOutside({
    refs: [dropdownRef],
    handler: () => setIsDropdownOpen(false),
    isEnabled: isDropdownOpen,
  })

  const handleLeaveTeam = async () => {
    try {
      const response = await leaveTeam(teamCode)
      if (response.isSuccess) {
        toast.success('팀 나가기가 완료되었습니다.')
      } else {
        toast.alert(response.message || '팀 나가기에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to leave team:', error)
    }
  }

  const handleDeleteTeam = () => {
    setIsDropdownOpen(false)
    onDeleteTeam()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src="/common/icons/dropdown_icon.svg"
        alt="menu"
        width={16}
        height={16}
        className="cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      {isDropdownOpen && (
        <div className="absolute left-0 top-6 z-10 w-[6rem] rounded-lg border border-grey30 bg-white py-2 shadow-lg">
          <div
            className="flex cursor-pointer items-center gap-2 px-3 py-1 text-xs text-[#FF345F] hover:bg-grey10"
            onClick={handleLeaveTeam}
          >
            팀 나가기
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 px-3 py-1 text-xs text-grey80 hover:bg-grey10"
            onClick={handleDeleteTeam}
          >
            팀 삭제하기
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { TeamMemberItem } from './TeamMemberItem'
import { AddMemberModal } from './AddMemberModal'
import { Button } from '@/shared/ui/Button/Button'
import { useState, useEffect } from 'react'

import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import Image from 'next/image'
import { getTeamMembers } from '../../api/teamViewApi'

export default function TeamEditMembersList({ teamName }: { teamName: string }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [members, setMembers] = useState<{
    accepted: any[]
    pending: any[]
    isTeamOwner: boolean
    isTeamManager: boolean
  }>({ accepted: [], pending: [], isTeamOwner: false, isTeamManager: false })

  const fetchMembers = async () => {
    try {
      const response = await getTeamMembers(teamName)
      setMembers({
        accepted: response.result.acceptedTeamMemberItems,
        pending: response.result.pendingTeamMemberItems,
        isTeamOwner: response.result.isTeamOwner,
        isTeamManager: response.result.isTeamManager,
      })
    } catch (error) {
      console.error('Failed to fetch team members:', error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [teamName])

  return (
    <div className="flex w-full flex-col gap-5">
      <Button
        animationMode="main"
        mode="main2"
        size="custom"
        onClick={() => setShowAddModal(true)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
      >
        <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
        추가하기
      </Button>

      <AddMemberModal
        teamName={teamName}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onMemberUpdate={fetchMembers}
      />

      {members.accepted.length > 0 ? (
        <>
          {members.accepted.map((member, index) => (
            <TeamMemberItem
              key={`accepted-${index}`}
              profileImagePath={member.profileImagePath}
              name={member.memberName}
              position={member.majorPosition}
              memberType={member.teamMemberType}
              teamCode={teamName}
              emailId={member.emailId}
              majorPosition={member.majorPosition}
              onMemberUpdate={fetchMembers}
              myRole={{
                isTeamOwner: members.isTeamOwner,
                isTeamManager: members.isTeamManager,
              }}
            />
          ))}

          {members.pending.map((member, index) => (
            <TeamMemberItem
              key={`pending-${index}`}
              name={member.teamMemberInvitationEmail}
              position=""
              memberType={member.teamMemberType}
              isPending={true}
              emailId={member.teamMemberInvitationEmail}
              majorPosition={member.majorPosition}
              teamCode={teamName}
              onMemberUpdate={fetchMembers}
              myRole={{
                isTeamOwner: members.isTeamOwner,
                isTeamManager: members.isTeamManager,
              }}
            />
          ))}
        </>
      ) : (
        <NotContentsUi />
      )}
    </div>
  )
}

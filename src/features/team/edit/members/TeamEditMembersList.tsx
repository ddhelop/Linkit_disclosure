'use client'

import { TeamMemberItem } from './TeamMemberItem'
import { AddMemberModal } from './AddMemberModal'
import { Button } from '@/shared/ui/Button/Button'
import { useState, useEffect } from 'react'
import { getTeamMembers } from '../../api/teamApi'

export default function TeamEditMembersList({ teamName }: { teamName: string }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [members, setMembers] = useState<{
    accepted: any[]
    pending: any[]
  }>({ accepted: [], pending: [] })

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getTeamMembers(teamName)
        setMembers({
          accepted: response.result.acceptedTeamMemberItems,
          pending: response.result.pendingTeamMemberItems,
        })
      } catch (error) {
        console.error('Failed to fetch team members:', error)
      }
    }

    fetchMembers()
  }, [teamName])

  return (
    <div className="flex w-full flex-col gap-5">
      <Button
        mode="main2"
        animationMode="main"
        className="mt-5 w-full rounded-[0.69rem] py-2"
        onClick={() => setShowAddModal(true)}
      >
        + 추가하기
      </Button>

      <AddMemberModal teamName={teamName} isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

      {members.accepted.map((member, index) => (
        <TeamMemberItem
          key={`accepted-${index}`}
          profileImagePath={member.profileImagePath}
          name={member.memberName}
          position={member.majorPosition}
          memberType={member.teamMemberType}
        />
      ))}

      {members.pending.map((member, index) => (
        <TeamMemberItem
          key={`pending-${index}`}
          name={member.teamMemberInvitationEmail}
          position=""
          memberType={member.teamMemberType}
          isPending={true}
          email={member.teamMemberInvitationEmail}
        />
      ))}
    </div>
  )
}

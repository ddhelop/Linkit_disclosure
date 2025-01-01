'use client'

import { useEffect, useState } from 'react'

import { getTeamMembers } from '../../api/teamViewApi'
import { TeamMember } from '../../types/teamView.types'
import MyTeamViewMemberComponent from './MyTeamViewMemberComponent'

export default function TeamViewMembers({ params }: { params: { teamName: string } }) {
  const [members, setMembers] = useState<TeamMember[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamMembers(params.teamName)
      console.log(data)
      setMembers(data.result.profileInformMenus)
    }
    fetchData()
  }, [params.teamName])

  return (
    <>
      <div className="mt-[3rem] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <MyTeamViewMemberComponent key={index} member={member} />
        ))}
      </div>
    </>
  )
}

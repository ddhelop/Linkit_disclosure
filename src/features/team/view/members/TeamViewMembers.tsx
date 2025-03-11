'use client'

import { useQuery } from '@tanstack/react-query'
import MyTeamViewMemberComponent from './MyTeamViewMemberComponent'
import { getTeamMembers } from '../../api/teamApi'

export default function TeamViewMembers({ params }: { params: { teamName: string } }) {
  const { data } = useQuery({
    queryKey: ['teamMembers', params.teamName],
    queryFn: () => getTeamMembers(params.teamName),
  })
  const members = data?.result.acceptedTeamMemberItems

  return (
    <>
      <div className="mt-[3rem] grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {members?.map((member, index) => <MyTeamViewMemberComponent key={index} member={member} />)}
      </div>
    </>
  )
}

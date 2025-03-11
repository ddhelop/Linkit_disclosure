'use client'

import { useQuery } from '@tanstack/react-query'
import MyTeamViewMemberComponent from './MyTeamViewMemberComponent'
import { getTeamMembers } from '../../api/teamApi'
import Link from 'next/link'
import Image from 'next/image'

export default function TeamViewMembers({ params }: { params: { teamName: string } }) {
  const { data } = useQuery({
    queryKey: ['teamMembers', params.teamName],
    queryFn: () => getTeamMembers(params.teamName),
  })
  const members = data?.result.acceptedTeamMemberItems

  return (
    <>
      {/* 팀 로그 제목 및 수정하기 */}
      {data?.result.isTeamManager && (
        <div className="mt-7 flex w-full items-center justify-between">
          <h3 className="text-xl text-grey80">팀 구성원</h3>
          <Link
            href={`/team/${params.teamName}/edit/members`}
            className="flex items-center gap-2 rounded-full bg-grey80 px-6 py-3 text-sm text-white hover:brightness-125"
          >
            <Image src={'/common/icons/white_pencil.svg'} alt="pencil" width={16} height={16} />
            <span>수정하기</span>
          </Link>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ">
        {members?.map((member, index) => <MyTeamViewMemberComponent key={index} member={member} />)}
      </div>
    </>
  )
}

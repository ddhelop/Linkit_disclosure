'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TeamMemberData } from '@/lib/types'
import { PostTeamMember } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'

interface TeamMemberProps {
  data: TeamMemberData[]
}

export default function TeamMember({ data }: TeamMemberProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(Array.isArray(data) ? data : [])
  const { register, handleSubmit, reset } = useForm<TeamMemberData>()
  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleFormSubmit: SubmitHandler<TeamMemberData> = async (formData) => {
    const newMember: TeamMemberData = {
      teamMemberName: formData.teamMemberName,
      teamMemberRole: formData.teamMemberRole,
      teamMemberIntroductionText: formData.teamMemberIntroductionText,
    }

    setTeamMembers([...teamMembers, newMember])
    setIsEditing(false)
    reset()

    try {
      const response = await PostTeamMember(accessToken, [...teamMembers, newMember])
      if (response.ok) {
        alert('저장되었습니다.')
      } else {
        // Handle error response
        console.error('Error:', response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 소개</span>
      </div>

      {teamMembers.length > 0
        ? teamMembers.map((member, index) => (
            <div key={index} className="mt-[0.94rem] flex items-center justify-between border border-grey30 p-5">
              <div className="flex flex-col">
                <p className="text-sm text-grey60">(주)링킷</p>
                <p className="pt-[0.44rem]">
                  {member.teamMemberName} | {member.teamMemberRole}
                </p>
                <div className="flex pt-[0.44rem]">
                  <div className="text-sm text-grey60">{member.teamMemberIntroductionText}</div>
                </div>
              </div>
              <div className="flex">
                <Image src="/assets/icons/pencil.svg" width={27} height={27} alt="edit" className="cursor-pointer" />
                <Image src="/assets/icons/delete.svg" width={27} height={27} alt="delete" className="cursor-pointer" />
              </div>
            </div>
          ))
        : !isEditing && <div className="pt-4 text-grey60">팀원을 등록하지 않았어요.</div>}

      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mb-4 mt-[1.56rem] flex flex-col gap-[0.81rem] rounded-lg border border-grey40 bg-grey10 p-3"
        >
          {/* 이름 */}
          <div className="flex gap-[0.81rem]">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">이름</p>
              <input
                {...register('teamMemberName')}
                className="w-[13.25rem] rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
                placeholder="이름"
              />
            </div>
            {/* 직무/역할 */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">직무/역할</p>
              <input
                {...register('teamMemberRole')}
                className="w-[13.25rem] rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
                placeholder="직무/역할"
              />
            </div>
          </div>

          {/* 팀원 소개 */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-normal">팀원 소개</p>
            <textarea
              {...register('teamMemberIntroductionText')}
              className="h-[6.25rem] w-full resize-none rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
              placeholder="팀원 소개"
            />
          </div>

          <div className="flex w-full justify-end gap-2">
            <button
              className="rounded-[0.25rem] bg-grey60 px-4 py-2 text-[#fff]"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              취소하기
            </button>
            <button className="rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]" type="submit">
              저장하기
            </button>
          </div>
        </form>
      ) : (
        !isEditing && (
          <div className="flex w-full justify-end gap-2">
            <button
              className="mt-3 rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]"
              onClick={() => setIsEditing(true)}
            >
              추가하기
            </button>
          </div>
        )
      )}
    </div>
  )
}

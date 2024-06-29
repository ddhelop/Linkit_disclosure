'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TeamMemberData } from '@/lib/types'
import { PostTeamMember } from '@/lib/action'

interface TeamMemberProps {
  data: TeamMemberData[]
}

export default function TeamMember({ data }: TeamMemberProps) {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(Array.isArray(data) ? data : [])
  const { register, handleSubmit, reset } = useForm<TeamMemberData>()

  const handleFormSubmit: SubmitHandler<TeamMemberData> = (formData) => {
    const newMember: TeamMemberData = {
      teamMemberName: formData.teamMemberName,
      teamMemberRole: formData.teamMemberRole,
      teamMemberIntroductionText: formData.teamMemberIntroductionText,
    }
    setTeamMembers([...teamMembers, newMember])
    reset()
    setIsFormVisible(false)
  }

  const handleSaveClick = async () => {
    const accessToken = localStorage.getItem('accessToken') || ''
    try {
      const response = await PostTeamMember(accessToken, teamMembers)
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

  const handleEditClick = () => setIsFormVisible(true)

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 소개</span>
      </div>

      {teamMembers.map((member, index) => (
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
      ))}

      {isFormVisible && (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-[1.56rem] flex w-full flex-col gap-[0.81rem] rounded-2xl border border-[#2563EB] p-6"
        >
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-normal text-grey100">이름 *</label>
              <input
                type="text"
                {...register('teamMemberName', { required: true })}
                className="mt-2 rounded-md border border-grey50 px-[0.88rem] py-[0.25rem] shadow-sm placeholder:text-sm focus:outline-none"
                placeholder="예: 주서영"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey100">직무/역할 *</label>
              <input
                type="text"
                {...register('teamMemberRole', { required: true })}
                className="mt-2 rounded-md border border-grey50 px-[0.88rem] py-[0.25rem] shadow-sm placeholder:text-sm focus:outline-none"
                placeholder="예: 마케팅"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-grey100">팀원 소개 *</label>
            <textarea
              {...register('teamMemberIntroductionText', { required: true })}
              className="mt-1 block w-full resize-none rounded-md border border-grey50 p-[0.62rem] shadow-sm focus:outline-none "
              rows={3}
              placeholder="예시: 어쩌고 저쩌고 어쩌고 저쩌고"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="rounded bg-[#2563EB] px-4 py-2 text-[#fff]">
              수정완료
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 flex justify-end pb-4">
        <button onClick={handleEditClick} className="rounded bg-[#2563EB] px-4 py-2 text-[#fff]">
          추가하기
        </button>
        <button onClick={handleSaveClick} className="ml-2 rounded bg-[#2563EB] px-4 py-2 text-[#fff]">
          저장하기
        </button>
      </div>
    </div>
  )
}

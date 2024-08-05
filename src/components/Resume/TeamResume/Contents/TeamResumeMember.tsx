'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TeamMemberData } from '@/lib/types'
import { PostTeamMember, DeleteTeamMember, PutTeamMember } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { Button } from '@/components/common/Button'
import Input from '@/components/common/component/Basic/Input'
import Textarea from '@/components/common/component/Basic/TextArea'

export default function TeamResumeMember({ data }: { data: TeamMemberData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(Array.isArray(data) ? data : [])
  const { register, handleSubmit, reset, setValue } = useForm<TeamMemberData>()
  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleFormSubmit: SubmitHandler<TeamMemberData> = async (formData) => {
    if (editIndex !== null) {
      const updatedMember = { ...formData, id: teamMembers[editIndex].id }

      try {
        const response = await PutTeamMember(accessToken, updatedMember, updatedMember.id)
        if (response.ok) {
          alert('수정되었습니다.')
          setTeamMembers(teamMembers.map((member, index) => (index === editIndex ? updatedMember : member)))
          setIsEditing(false)
          setEditIndex(null)
          reset()
        } else {
          console.error('Error:', response)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      const newMember: TeamMemberData = {
        ...formData,
        id: teamMembers.length, // 임시 ID 할당
      }

      try {
        const response = await PostTeamMember(accessToken, [...teamMembers, newMember])
        if (response.ok) {
          alert('저장되었습니다.')
          setTeamMembers([...teamMembers, newMember])
          setIsEditing(false)
          reset()
        } else {
          console.error('Error:', response)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleEdit = (index: number) => {
    const member = teamMembers[index]
    setValue('teamMemberName', member.teamMemberName)
    setValue('teamMemberRole', member.teamMemberRole)
    setValue('teamMemberIntroductionText', member.teamMemberIntroductionText)
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')
    if (!isConfirmed) return

    try {
      const response = await DeleteTeamMember(accessToken, id)
      if (response.ok) {
        setTeamMembers((prevMembers) => prevMembers.filter((member) => member.id !== id))
      } else {
        console.error('Error:', response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditIndex(null)
    reset()
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 소개</span>
      </div>

      {teamMembers.length > 0
        ? teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="mt-[0.94rem] flex flex-col items-center rounded-lg border border-grey30 p-5"
            >
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-grey60">{member.teamName}</p>
                  <p className="pt-[0.44rem]">
                    {member.teamMemberName} | {member.teamMemberRole}
                  </p>
                  <div className="flex pt-[0.44rem]">
                    <div className="text-sm text-grey60">{member.teamMemberIntroductionText}</div>
                  </div>
                </div>
                <div className="flex">
                  <Image
                    src="/assets/icons/pencil.svg"
                    width={27}
                    height={27}
                    alt="edit"
                    className="cursor-pointer"
                    onClick={() => handleEdit(index)}
                  />
                  <Image
                    src="/assets/icons/delete.svg"
                    width={27}
                    height={27}
                    alt="delete"
                    className="cursor-pointer"
                    onClick={() => handleDelete(member.id)}
                  />
                </div>
              </div>
              {isEditing && editIndex === index && (
                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="mb-4 mt-[1.56rem] flex w-full flex-col gap-[0.81rem] rounded-lg border border-grey40 bg-grey10 p-3"
                >
                  {/* 이름 */}
                  <div className="flex gap-[0.81rem]">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-normal">이름</p>
                      <Input
                        {...register('teamMemberName')}
                        // className="w-[13.25rem] rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
                        placeholder="이름"
                      />
                    </div>
                    {/* 직무/역할 */}
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-normal">직무/역할</p>
                      <Input
                        {...register('teamMemberRole')}
                        // className="w-[13.25rem] rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
                        placeholder="직무/역할"
                      />
                    </div>
                  </div>

                  {/* 팀원 소개 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal">팀원 소개</p>
                    <Textarea
                      {...register('teamMemberIntroductionText')}
                      className="h-[6.25rem]"
                      placeholder="팀원 소개"
                    />
                  </div>

                  <div className="flex w-full justify-end gap-2">
                    <Button animationMode="sub" mode="sub" type="button" onClick={handleCancel}>
                      취소하기
                    </Button>
                    <Button animationMode="main" mode="main" type="submit">
                      수정하기
                    </Button>
                  </div>
                </form>
              )}
            </div>
          ))
        : !isEditing && <div className="pt-4 text-grey60">팀원을 등록하지 않았어요.</div>}

      {isEditing && editIndex === null && (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mb-4 mt-[1.56rem] flex flex-col gap-[0.81rem] rounded-lg border border-grey40 bg-grey10 p-3"
        >
          {/* 이름 */}
          <div className="flex gap-[0.81rem]">
            <div className="flex flex-col ">
              <p className="text-sm font-normal">이름</p>
              <Input
                {...register('teamMemberName')}
                className="w-[13.25rem] rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 outline-none"
                placeholder="이름"
              />
            </div>
            {/* 직무/역할 */}
            <div className="flex flex-col ">
              <p className="text-sm font-normal">직무/역할</p>
              <Input {...register('teamMemberRole')} className="" placeholder="직무/역할" />
            </div>
          </div>

          {/* 팀원 소개 */}
          <div className="flex flex-col ">
            <p className="text-sm font-normal">팀원 소개</p>
            <Textarea {...register('teamMemberIntroductionText')} className="h-[6.25rem] " placeholder="팀원 소개" />
          </div>

          <div className="flex w-full justify-end gap-2">
            <Button animationMode="sub" mode="sub" type="button" onClick={() => setIsEditing(false)}>
              취소하기
            </Button>
            <Button animationMode="main" type="submit">
              저장하기
            </Button>
          </div>
        </form>
      )}

      {!isEditing && (
        <div className="mt-4 flex w-full justify-end gap-2">
          <Button animationMode="main" onClick={() => setIsEditing(true)}>
            추가하기
          </Button>
        </div>
      )}
    </div>
  )
}

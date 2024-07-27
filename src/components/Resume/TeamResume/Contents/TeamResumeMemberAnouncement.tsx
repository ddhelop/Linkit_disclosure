// TeamResumeMemberAnnouncement.tsx
'use client'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { useForm, SubmitHandler } from 'react-hook-form'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamMemberAnnouncement, PutTeamMemberAnnouncement, DeleteTeamMemberAnnouncement } from '@/lib/action'
import { TeamAnnouncementMemberInterface, TeamMemberAnnouncementResponse } from '@/lib/types'
import SkillModal from '@/components/common/component/filter/\bSkillModal'
import { SkillOptions } from '@/lib/data'
import { Button } from '@/components/common/Button'

interface TeamResumeMemberAnnouncementProps {
  data: TeamMemberAnnouncementResponse[]
}

interface FormInputs {
  selectedRole: string
  mainBusiness: string
  skills: string[]
  applicationProcess: string
  inputValue: string
}

export default function TeamResumeMemberAnnouncement({ data = [] }: TeamResumeMemberAnnouncementProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [announcements, setAnnouncements] = useState<TeamMemberAnnouncementResponse[]>(data || [])
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  const { register, handleSubmit, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      selectedRole: '',
      mainBusiness: '',
      skills: [],
      applicationProcess: '',
      inputValue: '',
    },
  })

  const watchSelectedRole = watch('selectedRole', '')
  const watchMainBusiness = watch('mainBusiness', '')
  const watchApplicationProcess = watch('applicationProcess', '')

  const isSubmitDisabled = !watchSelectedRole || !watchMainBusiness || !skills.length || !watchApplicationProcess

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const TeamData: TeamAnnouncementMemberInterface = {
      jobRoleName: formData.selectedRole,
      mainBusiness: formData.mainBusiness,
      skillNames: skills,
      applicationProcess: formData.applicationProcess,
    }

    try {
      let response
      if (editingAnnouncementId !== null) {
        response = await PutTeamMemberAnnouncement(accessToken, TeamData, editingAnnouncementId)
        if (response.ok) {
          setAnnouncements(
            announcements.map((announcement) =>
              announcement.id === editingAnnouncementId ? { ...announcement, ...TeamData } : announcement,
            ),
          )
        }
      } else {
        response = await PostTeamMemberAnnouncement(accessToken, TeamData)
        if (response.ok) {
          setAnnouncements([...announcements, { ...TeamData, id: Date.now(), teamName: '팀 이름' }])
        }
      }

      if (response.ok) {
        alert('팀원 공고가 성공적으로 저장되었습니다.')
        resetForm()
      } else {
        alert('저장 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('API 요청 실패:', error)
      alert('저장 중 오류가 발생했습니다.')
    }

    setIsFormVisible(false)
  }

  const handleRoleClick = (role: string) => {
    setValue('selectedRole', role)
  }

  const handleEditAnnouncement = (announcement: TeamMemberAnnouncementResponse) => {
    setEditingAnnouncementId(announcement.id)
    setValue('selectedRole', announcement.jobRoleName)
    setValue('mainBusiness', announcement.mainBusiness)
    setSkills(announcement.skillNames)
    setValue('applicationProcess', announcement.applicationProcess)
    setIsFormVisible(true)
  }

  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm('팀원 공고를 삭제하시겠습니까?')) return

    try {
      const response = await DeleteTeamMemberAnnouncement(accessToken, id)
      if (response.ok) {
        setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('API 요청 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const resetForm = () => {
    setEditingAnnouncementId(null)
    reset()
    setSkills([])
  }

  return (
    <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>

      <div className="w-full text-sm ">
        <span className="w-auto bg-grey10 px-[0.81rem] py-1">필요로 하는 팀원에 대한 공고 내용을 추가해주세요!</span>
      </div>

      <div className="flex flex-col gap-2">
        {announcements?.map((announcement) => (
          <div
            key={announcement.id}
            className="flex w-full justify-between rounded-[0.63rem] border border-grey30 p-[1.25rem]"
          >
            <div className="flex w-auto flex-col">
              <p className="text-sm text-grey60">{announcement.teamName}</p>
              <p className="whitespace-pre-wrap pt-[0.44rem] font-semibold text-grey100">{announcement.mainBusiness}</p>

              <div className="flex flex-wrap gap-2">
                {announcement.skillNames.map((skill, index) => (
                  <div
                    key={index}
                    className="mt-[0.88rem] rounded-[0.31rem] border border-grey40 px-3 py-2 text-center text-sm text-grey60"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              <Image
                src="/assets/icons/pencil.svg"
                width={27}
                height={27}
                alt="edit"
                className="cursor-pointer"
                onClick={() => handleEditAnnouncement(announcement)}
              />
              <Image
                src="/assets/icons/delete.svg"
                width={27}
                height={27}
                alt="delete"
                className="cursor-pointer"
                onClick={() => handleDeleteAnnouncement(announcement.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 rounded border border-grey30 bg-grey10 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex font-normal text-grey100">
                역할 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <div className="mt-2 flex flex-wrap gap-2 ">
                {['기획·경영', '개발·데이터', '마케팅·광고', '디자인'].map((role, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`rounded border px-4 py-2 ${
                      watch('selectedRole') === role
                        ? 'border border-[#2563EB] bg-[#D3E1FE66] bg-[#E0E7FF] bg-opacity-40 font-semibold text-[#2563EB]'
                        : 'border-grey40 bg-[#fff] text-grey60'
                    }`}
                    onClick={() => handleRoleClick(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <label className="flex font-normal text-grey100">
                주요 업무 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <textarea
                {...register('mainBusiness')}
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] shadow-sm outline-none"
                rows={3}
                placeholder="주요 업무"
              />
            </div>

            <label className="mt-8 flex font-normal text-grey100">
              요구 역량 <p className="pl-1 font-normal text-[#2563EB]">*</p>
            </label>
            {skills.length !== 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
                    className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
                  >
                    <span className="text-[#2563EB]">{skill}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSkills(skills.filter((s) => s !== skill))
                      }}
                      className="ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[#2563EB]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-2 flex w-[14rem] items-center justify-between rounded-lg border border-grey40 bg-white px-4  py-3 text-grey60 hover:bg-grey10"
              >
                <p>요구 역량 선택</p>
                <Image src="/assets/icons/search.svg" width={20} height={20} alt="plus" />
              </button>
            </div>

            <div className="pt-8">
              <label className=" flex font-normal text-grey100">
                지원 절차 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <textarea
                {...register('applicationProcess')}
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] shadow-sm outline-none"
                rows={3}
                placeholder="지원 절차"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 pb-4">
            <Button
              type="button"
              animationMode="sub"
              onClick={() => {
                setIsFormVisible(false)
                resetForm()
              }}
              mode="sub"
            >
              취소하기
            </Button>
            <Button animationMode="main" type="submit" disabled={isSubmitDisabled}>
              {editingAnnouncementId !== null ? '수정하기' : '저장하기'}
            </Button>
          </div>
        </form>
      )}

      {!isFormVisible && (
        <div className="flex w-full justify-end">
          <Button animationMode="main" onClick={() => setIsFormVisible(true)}>
            추가하기
          </Button>
        </div>
      )}

      {isModalOpen && (
        <SkillModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedFilters={skills}
          handleFilterChange={(selectedSkills) => setSkills(selectedSkills)}
          skillOptions={SkillOptions}
        />
      )}
    </div>
  )
}

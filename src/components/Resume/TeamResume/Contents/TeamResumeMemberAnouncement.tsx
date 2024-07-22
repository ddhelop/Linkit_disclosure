'use client'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { useForm, SubmitHandler } from 'react-hook-form'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamMemberAnnouncement, PutTeamMemberAnnouncement, DeleteTeamMemberAnnouncement } from '@/lib/action'
import { TeamAnnouncementMemberInterface, TeamMemberAnnouncementResponse } from '@/lib/types'
import { SkillOptions } from '@/lib/data'

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
  const [announcements, setAnnouncements] = useState<TeamMemberAnnouncementResponse[]>(data)
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null)
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(-1)

  const { register, handleSubmit, setValue, reset, watch } = useForm<FormInputs>({
    defaultValues: {
      selectedRole: '',
      mainBusiness: '',
      skills: [],
      applicationProcess: '',
      inputValue: '',
    },
  })

  const watchSkills = watch('skills', [])
  const watchInputValue = watch('inputValue', '')
  const watchSelectedRole = watch('selectedRole', '')
  const watchMainBusiness = watch('mainBusiness', '')
  const watchApplicationProcess = watch('applicationProcess', '')

  const isSubmitDisabled = !watchSelectedRole || !watchMainBusiness || !watchSkills.length || !watchApplicationProcess

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const TeamData: TeamAnnouncementMemberInterface = {
      jobRoleName: formData.selectedRole,
      mainBusiness: formData.mainBusiness,
      skillNames: formData.skills,
      applicationProcess: formData.applicationProcess,
    }

    try {
      let response
      if (editingAnnouncementId !== null) {
        response = await PutTeamMemberAnnouncement(accessToken, TeamData, editingAnnouncementId)
        if (response.ok) {
          // 수정된 공고 업데이트
          setAnnouncements(
            announcements.map((announcement) =>
              announcement.id === editingAnnouncementId ? { ...announcement, ...TeamData } : announcement,
            ),
          )
        }
      } else {
        // 새로운 공고 추가
        response = await PostTeamMemberAnnouncement(accessToken, TeamData)

        if (response.ok) {
          // const responseData = await response.json()
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue('inputValue', inputValue)
    if (inputValue.trim() !== '') {
      setFilteredSkills(SkillOptions.filter((skill) => skill.includes(inputValue)))
      setSelectedSkillIndex(-1)
    } else {
      setFilteredSkills([])
    }
  }

  const handleAddSkill = (skill?: string) => {
    const skillToAdd = skill || watchInputValue.trim()
    if (
      skillToAdd !== '' &&
      watchSkills.length < 3 &&
      !watchSkills.includes(skillToAdd) &&
      SkillOptions.includes(skillToAdd)
    ) {
      setValue('skills', [...watchSkills, skillToAdd])
      setValue('inputValue', '')
      setFilteredSkills([])
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      'skills',
      watchSkills.filter((skill) => skill !== skillToRemove),
    )
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (selectedSkillIndex >= 0 && selectedSkillIndex < filteredSkills.length) {
        handleAddSkill(filteredSkills[selectedSkillIndex])
      } else {
        handleAddSkill()
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedSkillIndex((prevIndex) => (prevIndex + 1) % filteredSkills.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedSkillIndex((prevIndex) => (prevIndex - 1 + filteredSkills.length) % filteredSkills.length)
    }
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

  const handleEditAnnouncement = (announcement: TeamMemberAnnouncementResponse) => {
    setEditingAnnouncementId(announcement.id)
    setValue('selectedRole', announcement.jobRoleName)
    setValue('mainBusiness', announcement.mainBusiness)
    setValue('skills', announcement.skillNames)
    setValue('applicationProcess', announcement.applicationProcess)
    setIsFormVisible(true)
  }

  const resetForm = () => {
    setEditingAnnouncementId(null)
    reset()
  }

  return (
    <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>

      <div className="w-full text-sm ">
        <span className="w-auto bg-grey10 px-[0.81rem] py-1">필요로 하는 팀원에 대한 공고 내용을 추가해주세요!</span>
      </div>

      {/* 팀원 공고 조회 */}
      <div className="flex flex-col gap-2">
        {announcements?.map((announcement) => (
          <div
            key={announcement.id}
            className="flex w-full justify-between rounded-[0.63rem] border border-grey30 p-[1.25rem]"
          >
            <div className="flex w-auto flex-col">
              <p className="text-sm text-grey60">{announcement.teamName}</p>
              <p className="pt-[0.44rem] font-semibold text-grey100">{announcement.mainBusiness}</p>

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

      {/* Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 rounded border border-grey30 bg-grey10 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex font-normal text-grey100">
                직무/역할 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <div className="mt-2 flex flex-wrap gap-2 ">
                {['기획·경영', '개발·데이터', '마케팅·광고', '디자인'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`rounded border px-4 py-2 ${
                      watch('selectedRole') === role
                        ? 'border border-[#2563EB] bg-[#D3E1FE66] bg-blue-500 bg-opacity-40 font-semibold text-[#2563EB]'
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

            {/* 요구 기술 */}
            <label className="mt-8 flex font-normal text-grey100">
              요구 기술 <p className="pl-1 font-normal text-[#2563EB]">*</p>
            </label>
            <div>
              {/* 버튼들 */}
              <div className="flex flex-wrap gap-2 pt-1">
                {watchSkills.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() => handleRemoveSkill(skill)}
                    className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
                  >
                    <span className="text-[#2563EB]">{skill}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSkill(skill)
                      }}
                      className="ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[#2563EB]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* input container */}
              <div className="mt-[0.88rem] flex flex-col">
                <span className="py-[0.88rem] text-sm font-normal text-grey60">보유 기술을 하나씩 입력해주세요</span>
                <div className="relative flex w-[16.1rem] items-center gap-[0.63rem]">
                  <input
                    type="text"
                    className="flex-1 rounded border border-grey40 p-2 outline-none"
                    value={watchInputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onKeyDown={handleKeyPress}
                    placeholder="ex. Notion"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddSkill()
                      setValue('inputValue', '')
                    }}
                    className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]"
                  >
                    추가
                  </button>
                  {/* Filtered Skills */}
                  {filteredSkills.length > 0 && (
                    <div className="absolute top-11 w-full rounded border border-grey30 bg-[#fff] p-2">
                      {filteredSkills.map((skill, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer p-1 hover:bg-grey10 ${
                            selectedSkillIndex === index ? 'bg-grey10' : ''
                          }`}
                          onClick={() => handleAddSkill(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false)
                resetForm()
              }}
              className="rounded bg-grey30 px-4 py-2 "
            >
              취소하기
            </button>
            <button type="submit" className="rounded bg-[#2563EB] px-4 py-2 text-white" disabled={isSubmitDisabled}>
              {editingAnnouncementId !== null ? '수정하기' : '저장하기'}
            </button>
          </div>
        </form>
      )}

      {!isFormVisible && (
        <div className="flex w-full justify-end">
          <button
            className="mt-3 rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]"
            onClick={() => setIsFormVisible(true)}
          >
            추가하기
          </button>
        </div>
      )}
    </div>
  )
}

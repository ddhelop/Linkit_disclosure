'use client'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamMemberAnnouncement, PutTeamMemberAnnouncement, DeleteTeamMemberAnnouncement } from '@/lib/action'
import { TeamAnnouncementMemberInterface, TeamMemberAnnouncementResponse } from '@/lib/types'

interface TeamResumeMemberAnnouncementProps {
  data: TeamMemberAnnouncementResponse[]
}

export default function TeamResumeMemberAnnouncement({ data }: TeamResumeMemberAnnouncementProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [mainBusiness, setMainBusiness] = useState('')
  const [applicationProcess, setApplicationProcess] = useState('')
  const [announcements, setAnnouncements] = useState(data)
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null)

  const handleButtonClick = async () => {
    if (selectedRole.length === 0 || skills.length === 0 || !mainBusiness || !applicationProcess) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    const TeamData: TeamAnnouncementMemberInterface = {
      jobRoleNames: selectedRole,
      mainBusiness: mainBusiness,
      skillNames: skills,
      applicationProcess: applicationProcess,
    }

    try {
      let response
      if (editingAnnouncementId !== null) {
        response = await PutTeamMemberAnnouncement(accessToken, TeamData, editingAnnouncementId)
        if (response.ok) {
          setAnnouncements(
            announcements.map((announcement) =>
              announcement.id === editingAnnouncementId ? { ...TeamData, id: editingAnnouncementId } : announcement,
            ),
          )
        }
      } else {
        response = await PostTeamMemberAnnouncement(accessToken, TeamData)
        if (response.ok) {
          setAnnouncements([...announcements, { ...TeamData, id: Date.now() }])
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
    setSelectedRole((prevRoles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((r) => r !== role)
      } else {
        return [...prevRoles, role]
      }
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleMainBusinessChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMainBusiness(event.target.value)
  }

  const handleApplicationProcessChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setApplicationProcess(event.target.value)
  }

  const handleAddSkill = () => {
    if (inputValue.trim() !== '' && skills.length < 3) {
      setSkills([...skills, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddSkill()
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
    setSelectedRole(announcement.jobRoleNames)
    setMainBusiness(announcement.mainBusiness)
    setSkills(announcement.skillNames)
    setApplicationProcess(announcement.applicationProcess)
    setIsFormVisible(true)
  }

  const resetForm = () => {
    setEditingAnnouncementId(null)
    setSelectedRole([])
    setSkills([])
    setInputValue('')
    setMainBusiness('')
    setApplicationProcess('')
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
      <div className="flex flex-col">
        {announcements?.map((announcement) => (
          <div
            key={announcement.id}
            className="flex w-full justify-between rounded-[0.63rem] border border-grey30 p-[1.25rem]"
          >
            <div className="flex w-auto flex-col">
              <p className="text-sm text-grey60">팀 데이터 필요</p>
              <p className="pt-[0.44rem] font-semibold text-grey100">{announcement.mainBusiness}</p>

              <div className="flex flex-wrap">
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
        <div className="mt-4 rounded border border-grey30 bg-grey10 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex font-normal text-grey100">
                직무/역할 <p className="pl-1 font-normal text-[#2563EB]">*</p>
              </label>
              <div className="mt-2 flex flex-wrap gap-2 ">
                {['기획', '마케팅', '디자이너', 'SW개발자', '리서처', '기타'].map((role) => (
                  <button
                    key={role}
                    className={`rounded border px-4 py-2 ${
                      selectedRole.includes(role)
                        ? 'bg-blue-500 border border-[#2563EB] bg-[#D3E1FE66] bg-opacity-40 font-semibold text-[#2563EB]'
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
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] text-grey50 shadow-sm"
                rows={3}
                placeholder="주요 업무"
                value={mainBusiness}
                onChange={handleMainBusinessChange}
              />
            </div>

            {/* 요구 기술 */}
            <label className="mt-8 flex font-normal text-grey100">
              요구 기술 <p className="pl-1 font-normal text-[#2563EB]">*</p>
            </label>
            <div>
              {/* 버튼들 */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() => handleRemoveSkill(skill)}
                    className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
                  >
                    <span className="text-[#2563EB]">{skill}</span>
                    <button
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
                <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                  <input
                    type="text"
                    className="flex-1 rounded border border-grey40 p-2"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="ex. Notion"
                  />
                  <button onClick={handleAddSkill} className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]">
                    추가
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <label className="block font-normal text-grey100">지원 절차</label>
              <textarea
                className="mt-2 block w-full resize-none rounded-md border border-grey30 p-[0.56rem] text-grey50 shadow-sm"
                rows={3}
                placeholder="지원 절차"
                value={applicationProcess}
                onChange={handleApplicationProcessChange}
              />
            </div>

            <div className="mt-4 flex justify-end gap-2 pb-4">
              <button
                onClick={() => {
                  setIsFormVisible(false)
                  resetForm()
                }}
                className="rounded bg-grey30 px-4 py-2 "
              >
                취소하기
              </button>
              <button onClick={handleButtonClick} className="text-white rounded bg-[#2563EB] px-4 py-2 text-[#fff]">
                {editingAnnouncementId !== null ? '수정하기' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mt-[0.38rem] flex w-full items-center justify-center rounded-[0.63rem] border border-grey30 bg-grey20 py-[1.2rem]"
      >
        <Image src="/assets/icons/plus.svg" width={20} height={20} alt="plus" />
      </button>
    </div>
  )
}

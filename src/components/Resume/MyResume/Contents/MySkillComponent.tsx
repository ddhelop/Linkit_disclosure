// MySkillComponent.tsx
'use client'
import { Button } from '@/components/common/Button'
import SkillModal from '@/components/common/component/filter/\bSkillModal'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostRoleData } from '@/lib/action'
import { mainHoverEffect } from '@/lib/animations'
import { Skills } from '@/lib/data'
import { JobAndSkillResponse } from '@/lib/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const Positions = ['기획·경영', '개발·데이터', '마케팅·광고', '디자인']

interface MyResumeCompletionProps {
  data: JobAndSkillResponse
}

export default function MySkillComponent({ data }: MyResumeCompletionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [roleFields, setSelectedRoleFields] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        const profileRegionResponse = data.jobAndSkillResponse
        if (profileRegionResponse) {
          setSelectedRoleFields(profileRegionResponse.jobRoleNames || [])
          setSkills(profileRegionResponse.skillNames || [])
        }
      })
    }
  }, [accessToken])

  // 포지션 토글
  const toggleRoleSelection = (field: string) => {
    setSelectedRoleFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  const onSubmit = async () => {
    const response = await PostRoleData(accessToken, roleFields, skills)
    if (response.ok) {
      alert('수정되었습니다.')
      setIsEditing(false)
    } else {
      const data = await response.json()
      alert(data.message)
    }
  }

  const handleEditClick = () => {
    if (isEditing) {
      onSubmit()
    } else {
      setIsEditing(true)
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* contents */}
      {isEditing ? (
        <>
          {/* title */}
          <div className="flex items-center gap-[0.56rem]">
            <span className="text-lg font-semibold text-grey100">희망 역할</span>
          </div>
          <div className="flex flex-grow flex-col items-center pt-[0.12rem]">
            {/* 포지션 */}
            <div className="flex w-full flex-col">
              <div className="flex flex-wrap gap-2 pt-2">
                {Positions.map((el, index) => (
                  <button
                    key={index}
                    className={` rounded-md border px-[0.88rem] py-2 ${
                      roleFields.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] bg-[#fff] text-[#64748B]'
                    }`}
                    onClick={() => toggleRoleSelection(el)}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
            {/* 보유한 기술 */}
            <div className="flex w-full flex-col pt-8">
              <div className="flex items-center gap-[0.56rem]">
                <span className="text-lg font-semibold leading-5">보유 역량</span>
              </div>
              <div>
                {/* 버튼들 */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      onClick={() => setSkills(skills.filter((s) => s !== skill))}
                      className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] bg-opacity-40 px-3 py-2 font-semibold"
                    >
                      <span className="text-[#2563EB]">{skill}</span>
                      <button
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
                {skills.length > 0 && <div className=" w-full border-b border-grey40 pb-2 pt-2"></div>}
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2 flex w-[14rem] items-center justify-between rounded-lg border border-grey40 bg-white px-4  py-3 text-grey60 hover:bg-grey10"
                  >
                    <p>요구 기술 찾아보기</p>
                    <Image src="/assets/icons/search.svg" width={20} height={20} alt="plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 희망 역할 */}
          <div className="flex flex-col gap-[1.56rem]">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-grey100">희망 역할</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {roleFields.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2"
                  >
                    <span className="text-grey60">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 보유 기술 */}
            <div className="flex flex-col gap-1">
              <span className=" text-lg font-semibold text-grey100">보유 역량</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2"
                  >
                    <span className="text-grey60">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end gap-2">
        {isEditing && (
          <Button mode="sub" animationMode="sub" type="button" onClick={() => setIsEditing(false)}>
            취소하기
          </Button>
        )}

        <Button animationMode="main" onClick={handleEditClick}>
          {isEditing ? '수정완료' : '수정하기'}
        </Button>
      </div>

      {isModalOpen && (
        <SkillModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedFilters={skills}
          handleFilterChange={(selectedSkills) => setSkills(selectedSkills)}
          skillOptions={Skills}
        />
      )}
    </div>
  )
}

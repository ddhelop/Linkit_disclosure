'use client'
import { Button } from '@/components/common/Button'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileTeamBuildingField, PostTeamBuildingField } from '@/lib/action'
import { TeamProfileTeamBuildingFieldResponse } from '@/lib/types'

import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface TeamResumTeamBuildingProps {
  data: TeamProfileTeamBuildingFieldResponse
}

export default function TeamResumeBuildingComponent2({ data }: TeamResumTeamBuildingProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [options, setOptions] = useState(['해커톤', '공모전', '대회', '사이드 프로젝트', '포트폴리오'])
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    if (data.teamProfileTeamBuildingFieldNames) {
      setSelectedOptions(data.teamProfileTeamBuildingFieldNames)
      setOptions(options.filter((option) => !data.teamProfileTeamBuildingFieldNames.includes(option)))
    }
  }, [data.teamProfileTeamBuildingFieldNames])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    const response = await PostTeamBuildingField(accessToken, selectedOptions)
    if (response.ok) {
      alert('수정이 완료되었습니다.')
      setIsEditing(false)
    }
  }

  const handleOptionClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option])
    setOptions(options.filter((opt) => opt !== option))
  }

  const handleRemoveOption = (optionToRemove: string) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToRemove))
    setOptions([...options, optionToRemove])
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">희망 팀빌딩 분야</span>
        {/* {isEditing && (
          <span className="text-sm text-[#2563EB]">
            Tip : 본인의 경험을 바탕으로 핵심 역량과 보유 역량을 간단히 작성해주세요!
          </span>
        )} */}
      </div>

      {/* contents */}
      {isEditing ? (
        <div className="flex flex-col gap-[0.88rem]">
          <div className="flex flex-wrap gap-2 pt-5">
            {selectedOptions?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleRemoveOption(option)}
                className="flex cursor-pointer items-center rounded-[0.31rem] border border-[#2563Eb] bg-[#D3E1FE66] bg-opacity-40 px-3 py-2"
              >
                <span className="text-[#2563EB]">{option}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveOption(option)
                  }}
                  className="ml-2 text-[#2563EB]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-grey40 pt-2">
            <span className="text-sm font-normal text-grey100">희망 팀빌딩 분야를 선택해주세요</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="rounded border border-grey40 bg-gray-200 px-4 py-2 text-grey60"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 pt-[1.56rem]">
          {selectedOptions?.map((option, index) => (
            <div key={index} className="flex items-center rounded-lg border border-grey40 px-3 py-1">
              <span className="text-grey60">{option}</span>
            </div>
          ))}
        </div>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <Button mode="sub" animationMode="sub" onClick={() => setIsEditing(false)}>
              취소하기
            </Button>
            <Button animationMode="main" onClick={handleSaveClick}>
              수정완료
            </Button>
          </div>
        ) : (
          <Button animationMode="main" onClick={handleEditClick}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  )
}

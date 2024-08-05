'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileTeamBuildingField, TeamOnBoardingField } from '@/lib/action'
import { ProfileTeamBuildingFieldResponse } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'
import { Button } from '@/components/common/Button'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface MyResumTeamBuildingFieldProps {
  data: ProfileTeamBuildingFieldResponse
}

export default function TeamBuildingComponent({ data }: MyResumTeamBuildingFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [options, setOptions] = useState(['해커톤', '공모전', '대회', '사이드 프로젝트', '포트폴리오'])
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    setSelectedOptions(data.teamBuildingFieldNames)
    setOptions(options.filter((option) => !data.teamBuildingFieldNames?.includes(option)))
  }, [data.teamBuildingFieldNames])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    const response = await PostProfileTeamBuildingField(accessToken, selectedOptions)
    if (response.ok) {
      pushNotification('희망 팀빌딩 분야가 수정되었습니다.', 'success')
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
      </div>

      {/* contents */}
      {isEditing ? (
        <div className="flex flex-col gap-[0.88rem]">
          <div className="flex flex-wrap gap-2 pt-5">
            {selectedOptions?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleRemoveOption(option)}
                className="flex cursor-pointer items-center rounded-lg border border-[#2563Eb] bg-[#D3E1FE] bg-opacity-40 px-3 py-1"
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
            <Button onClick={handleSaveClick} mode="main" animationMode="main">
              수정완료
            </Button>
          </div>
        ) : (
          <Button animationMode="main" mode="main" onClick={handleEditClick}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  )
}

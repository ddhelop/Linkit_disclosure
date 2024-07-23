'use client'
import { accessTokenState } from '@/context/recoil-context'
import { TeamOnBoardingActivityWay } from '@/lib/action'
import { addressData } from '@/lib/addressSelectData'
import { ActivityResponse } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect, ChangeEvent } from 'react'
import { useRecoilValue } from 'recoil'

interface TeamResumTeamBuildingProps {
  data: ActivityResponse
}

export default function TeamResumeActivityWay({ data }: TeamResumTeamBuildingProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [options, setOptions] = useState([
    '사무실 있음',
    '사무실 없음',
    '대면 활동 선호',
    '비대면 활동 선호',
    '대면+비대면',
  ])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    if (isEditing) {
      setSelectedOptions(data.activityTagName || [])
      setSelectedCity(data.cityName || '')
      setSelectedDistrict(data.divisionName || '')
      setOptions((prevOptions) => prevOptions.filter((option) => !data.activityTagName.includes(option)))
    }
  }, [isEditing, data])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    const postData = {
      cityName: selectedCity,
      divisionName: selectedDistrict,
      activityTagNames: selectedOptions,
    }

    const response = await TeamOnBoardingActivityWay(accessToken, postData)
    if (response.ok) {
      alert('수정이 완료되었습니다.')
      setIsEditing(false)
      // 옵션 초기화
      setOptions(['사무실 있음', '사무실 없음', '대면 활동 선호', '비대면 활동 선호', '대면+비대면'])
    } else {
      alert('저장 중 오류가 발생했습니다.')
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

  const getDistricts = () => {
    const city = addressData.find((c) => c.name === selectedCity)
    return city ? city.subArea : []
  }

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value)
    setSelectedDistrict('')
  }

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">활동 방식</span>
        {/* {isEditing && <span className="text-sm text-[#2563EB]">Tip : 현재 팀의 활동 방식에 대해 소개해주세요!</span>} */}
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

          <p className="pb-3 pt-8 text-lg font-semibold">활동 지역</p>
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <label className=" font-semibold text-grey100">시/도</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="select-with-padding-right rounded border border-grey40 p-3 font-medium text-grey60"
              >
                <option value="">시/도를 선택해주세요</option>
                {addressData.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className=" font-semibold text-grey100">시/군/구</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="select-with-padding-right rounded border border-grey40 p-3 font-medium text-grey60"
              >
                <option value="">시/군/구를 선택해주세요</option>
                {getDistricts().map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 활동 방식 */}
          <div className="flex w-full gap-x-2 pt-4">
            {data?.activityTagName.map((tag, index) => (
              <span key={index} className="w-auto rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-grey60">
                {tag}
              </span>
            ))}
          </div>
          {/* 활동 지역/위치 */}
          <div className="flex flex-col pt-[2.19rem]">
            <p className="text-lg font-semibold">활동지역/위치</p>
            <div className="flex gap-[0.38rem] pt-4">
              <Image src="/assets/icons/location.svg" width={24} height={24} alt="location" />
              <p>
                {data?.cityName}, {data?.divisionName}
              </p>
            </div>
          </div>
        </>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        {isEditing ? (
          <div className="flex">
            <button
              onClick={() => setIsEditing(false)}
              className="mr-2 h-10 rounded border border-[#2563EB] bg-[#fff] px-4 text-sm text-[#2563EB]"
            >
              취소하기
            </button>
            <button onClick={handleSaveClick} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
              수정완료
            </button>
          </div>
        ) : (
          <button onClick={handleEditClick} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
            수정하기
          </button>
        )}
      </div>
    </div>
  )
}

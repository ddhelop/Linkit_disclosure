'use client'

import { jobCategoriesData } from '@/shared/data/roleSelectData'
import { addressData } from '@/shared/data/addressSelectData'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Radio from '@/shared/ui/Radio/Radio'
import Select from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { useState } from 'react'

export default function ProfileEditBasic() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('option1')

  const options = [
    { label: '전체공개', value: '전체공개' },
    { label: '비공개', value: '비공개' },
  ]

  // 포지션 대분류 옵션을 구성합니다.
  const mainPositionOptions = jobCategoriesData.map((category) => ({
    label: category.name,
    value: category.name,
  }))

  // 선택된 포지션 대분류에 따라 소분류 옵션을 구성합니다.
  const subPositionOptions =
    jobCategoriesData
      .find((category) => category.name === selectedCategory)
      ?.subCategory.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
      })) || []

  // 활동 지역 대분류 옵션을 구성합니다.
  const mainAreaOptions = addressData.map((city) => ({
    label: city.name,
    value: city.name,
  }))

  // 선택된 활동 지역 대분류에 따라 소분류 옵션을 구성합니다.
  const subAreaOptions =
    addressData
      .find((city) => city.name === selectedCity)
      ?.subArea.map((district) => ({
        label: district,
        value: district,
      })) || []

  const statusOptions = [
    '팀원 찾는 중',
    '팀 찾는 중',
    '대회 준비 중',
    '공모전 준비 중',
    '포폴 쌓는 중',
    '둘러보는 중',
    '프로젝트 진행 중',
    '아이디어 찾는 중',
    '투자 유치 중',
  ]

  const handleStatusClick = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleRemoveStatus = (status: string) => {
    setSelectedStatuses((prev) => prev.filter((s) => s !== status))
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        {/* 프로필 사진 */}
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span className="text-grey80">프로필 사진</span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>

          <div className="mt-3 flex gap-8">
            <Image src="/common/default_profile.svg" width={150} height={150} alt="profile" />

            <div className="flex flex-col justify-end">
              <p className="text-xs text-grey50">*10MB 이하의 PNG, JPG, GIF, SVG 파일을 업로드 해주세요</p>
              <div className="flex items-end gap-4">
                <Button className="mt-2 rounded-xl" animationMode="main" mode="main">
                  사진 업로드
                </Button>
                <p className="cursor-pointer text-xs text-grey50 underline">삭제하기</p>
              </div>
            </div>
          </div>
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            이름<p className="text-main">*</p>
          </span>
          <Input placeholder="이름을 입력해주세요" />
          <span className="text-xs text-grey50">*이름은 계정 관리 - 계정 설정에서 변경할 수 있어요</span>
        </div>

        {/* 포지션 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            포지션 <p className="text-main">*</p>
          </span>

          <div className="flex w-full gap-[1.38rem]">
            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">대분류</span>
              <Select
                options={mainPositionOptions}
                placeholder="대분류 선택"
                onChange={(value) => setSelectedCategory(value)}
              />
            </div>

            {selectedCategory && (
              <div className="flex w-[48%] flex-col gap-2">
                <span className="text-sm text-grey70">소분류</span>
                <Select
                  options={subPositionOptions}
                  placeholder="소분류 선택"
                  onChange={(value) => setSelectedSubCategory(value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* 활동 지역 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            활동 지역 <p className="text-main">*</p>
          </span>

          <div className="flex w-full gap-[1.38rem]">
            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">시/도</span>
              <Select
                options={mainAreaOptions}
                placeholder="도/광역시 선택"
                onChange={(value) => setSelectedCity(value)}
              />
            </div>

            {selectedCity && (
              <div className="flex w-[48%] flex-col gap-2">
                <span className="text-sm text-grey70">시/군/구</span>
                <Select
                  options={subAreaOptions}
                  placeholder="구/군 선택"
                  onChange={(value) => setSelectedDistrict(value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* 현재 상태 - 선택된 상태들 */}
          <div className="flex flex-col gap-3">
            <span className="flex text-grey80">현재 상태</span>

            <div className="flex flex-wrap gap-2">
              {selectedStatuses.map((status) => (
                <div
                  onClick={() => handleRemoveStatus(status)}
                  key={status}
                  className="flex cursor-pointer items-center rounded-lg border border-main bg-[#EEF4FF] px-4 py-3 text-sm text-main"
                >
                  <span>{status}</span>
                  <button className="ml-2 text-main">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* 현재 상태 - 옵션 선택 */}
          <div className="flex w-full flex-wrap gap-3 rounded-xl bg-grey10 px-6 py-7">
            {statusOptions.map((status) => (
              <span
                key={status}
                onClick={() => handleStatusClick(status)}
                className={`cursor-pointer rounded-lg border px-4 py-3 text-sm ${
                  selectedStatuses.includes(status)
                    ? 'border-main bg-[#EEF4FF] text-main'
                    : 'border-grey40 bg-[#FCFCFD] text-grey50'
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        {/* 프로필 공개 여부 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            프로필 공개 여부 <p className="text-main">*</p>
          </span>

          <Radio options={options} selectedValue={selectedOption} onChange={setSelectedOption} labelClassName="" />
        </div>
      </div>

      <div className="mt-[1.31rem] flex w-full justify-end">
        <Button className="rounded-xl px-5 py-[0.38rem]" animationMode="main" mode="main">
          저장하기
        </Button>
      </div>
    </>
  )
}

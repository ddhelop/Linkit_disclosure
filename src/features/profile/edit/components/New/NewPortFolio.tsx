'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Select from '@/shared/ui/Select/Select'
import Textarea from '@/shared/ui/TextArea/TextArea'
import Image from 'next/image'
import { useState } from 'react'

export default function NewPortFolio() {
  const [isTeam, setIsTeam] = useState(false) // 개인/팀 토글 상태 관리
  const [isOngoing, setIsOngoing] = useState(false) // 진행 중 상태 관리
  const [startDate, setStartDate] = useState('') // 시작 날짜 입력 값
  const [endDate, setEndDate] = useState('') // 종료 날짜 입력 값
  const [contribution, setContribution] = useState('') // Add this state

  const handleToggle = () => {
    setIsTeam((prev) => !prev)
  }

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('') // "진행 중"을 선택할 때 종료 날짜 초기화
  }

  const contributionOptions = [
    { label: '최상', value: '최상' },
    { label: '상', value: '상' },
    { label: '중', value: '중' },
    { label: '하', value: '하' },
    { label: '최하', value: '최하' },
  ]

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.88rem]">
        {/* 프로젝트 이름 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              프로젝트명<span className="text-main">*</span>
            </span>

            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>

          <Input placeholder="프로젝트명을 입력해주세요" />
        </div>

        {/* 한줄소개 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              한줄소개<span className="text-main">*</span>
            </span>
          </div>

          <Input placeholder="프로젝트를 한 줄로 소개해주세요 (60자 이내)" />
        </div>

        {/* 규모, 인원, 팀 구성 */}
        <div className="flex gap-8">
          {/* 규모 */}
          <div className="flex flex-col gap-3">
            <span className="flex w-[10.6rem]">
              규모<span className="text-main">*</span>
            </span>
            <div className="flex">
              <button
                onClick={handleToggle}
                className={`w-[5.3rem] rounded-l-[0.625rem] py-2 ${
                  !isTeam ? 'bg-main2 text-white' : 'border border-grey40 bg-grey10 text-grey40'
                }`}
              >
                개인
              </button>
              <button
                onClick={handleToggle}
                className={`w-[5.3rem] rounded-r-[0.625rem] py-2 ${
                  isTeam ? 'bg-main2 text-white' : 'border border-grey40 bg-grey10 text-grey40'
                }`}
              >
                팀
              </button>
            </div>
          </div>

          {/* 인원 */}
          <div className="flex w-[4rem] flex-col gap-3">
            <span>인원</span>
            <Input placeholder="2" disabled={!isTeam} className="px-0 text-center" type="number" />
          </div>

          {/* 팀 구성 */}
          <div className="flex w-full flex-col gap-3">
            <span>팀 구성</span>
            <Input placeholder="자유롭게 작성해주세요 (ex. 기획 1, 디자인 1)" disabled={!isTeam} />
          </div>
        </div>

        {/* 기간 */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          isOngoing={isOngoing}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onToggleOngoing={handleOngoingToggle}
        />

        {/* 역할 및 기여도 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center">
              역할 및 기여도<span className="text-main">*</span>
              <span className="pl-3 text-xs text-grey50">역할은 최대 3개까지 입력 가능해요.</span>
            </div>
          </div>

          <div className="rounded-xl bg-grey10 px-5 py-4">
            <div className="flex gap-5">
              <Input placeholder="맡은 역할을 간단하게 입력해 주세요 (30자 이내)" className="w-[80%]" />
              <Select
                value={contribution}
                onChange={setContribution}
                options={contributionOptions}
                placeholder="기여도"
                className="w-[7rem] rounded-xl bg-white"
              />
              <Image
                src="/common/icons/delete_x.svg"
                width={22}
                height={22}
                alt="minus-icon"
                className="cursor-pointer"
              />
            </div>
            <div className="mt-5 flex w-full justify-center">
              <Button
                mode="custom"
                className="flex items-center gap-2 rounded-full border border-grey40 bg-white px-6 text-black hover:bg-grey10"
              >
                <Image src="/common/icons/black_plus.svg" width={15} height={15} alt="plus-icon" />
                추가하기
              </Button>
            </div>
          </div>
        </div>

        {/* 사용 스킬 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">사용 스킬</span>
          <Input placeholder="사용한 스킬을 입력해주세요 (ex. React, TypeScript)" />
        </div>

        {/* 링크 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">링크</span>
          <Input placeholder="링크를 입력해 주세요" />
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">설명</span>
          <Textarea placeholder="프로젝트에 대한 설명을 입력해주세요" />
        </div>

        {/* 이미지 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">이미지</span>
          <span className="mt-3 text-sm text-grey60">대표 이미지 1장</span>

          <div className="flex items-end gap-6">
            <Image src="/common/images/no_thumbnail.svg" width={204} height={115} alt="plus-icon" />
            <div className="flex flex-col gap-2">
              <span className="text-xs text-grey50">*10MB 이하의 PNG, JPG 파일을 업로드 해주세요</span>
              <div className="flex items-center gap-4">
                <Button mode="main" animationMode="main" className="rounded-xl text-xs">
                  사진 업로드
                </Button>
                <span className="cursor-pointer text-xs font-normal text-grey50 underline">삭제하기</span>
              </div>
            </div>
          </div>

          {/* 부가 이미지 */}
          <div className="mt-6 flex flex-col">
            <span className="text-sm text-grey60">
              프로젝트를 설명할 수 있는 보조 이미지가 있다면 추가해 주세요 (최대 4장)
            </span>

            <div className="mt-2 flex">
              <div className=" flex h-[5.4rem] w-[9.75rem] cursor-pointer items-center justify-center rounded-lg bg-grey30 hover:bg-grey40">
                <Image src="/common/icons/black_plus.svg" width={15} height={15} alt="plus-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button mode="main" animationMode="main" className=" rounded-xl font-semibold">
          저장하기
        </Button>
      </div>
    </>
  )
}

'use client'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { AppDispatch, RootState } from '@/app/store'
import { addressData } from '@/lib/addressSelectData'

import { ChangeEvent, useState } from 'react'
import {
  setFormData,
  setSelectedArea,
  setSelectedShortTermFields,
  setSelectedSubArea,
} from '@/features/counter/TeamOnBoardingSlice'

const ShortTerm = ['사무실 있음', '사무실 없음', '대면 활동 선호', '대면 + 비대면']

interface FormInputs {
  teamName: string
  teamSize: string
  teamField: string
}

export default function ActivityWay() {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedShortTermFields, selectedLongTermFields, selectedArea, selectedSubArea, formData } = useSelector(
    (state: RootState) => state.teamOnboarding,
  )
  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: formData,
  })

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedArea(e.target.value))
    dispatch(setSelectedSubArea(''))
  }

  const handleSubAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSubArea(e.target.value))
  }

  const subAreas = addressData.find((area) => area.name === selectedArea)?.subArea || []

  const onSubmit = (data: FormInputs) => {
    dispatch(setFormData(data))
  }

  const toggleShortTermField = (field: string) => {
    const newFields = selectedShortTermFields.includes(field)
      ? selectedShortTermFields.filter((v) => v !== field)
      : [...selectedShortTermFields, field]
    dispatch(setSelectedShortTermFields(newFields))
  }

  const { teamField } = watch()
  const isNextButtonEnabled =
    (selectedShortTermFields.length > 0 || selectedLongTermFields.length > 0) &&
    selectedArea &&
    selectedSubArea &&
    teamField

  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex w-full flex-col py-[69px]">
        <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 이력서 가이드</span>
          </div>
          <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동방식을 선택해주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* 활동 방식 */}
            <div className="flex w-[80%] flex-col sm:w-[55%]">
              <div className="flex gap-x-2 pt-5">
                {ShortTerm.map((el, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`border px-3 py-1 ${
                      selectedShortTermFields.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] text-[#64748B]'
                    } rounded-md`}
                    onClick={() => toggleShortTermField(el)}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                활동 지역/위치 <span className="pl-1 text-sm font-normal text-[#FF345F]">*</span>
              </span>
            </div>

            <div className="flex w-[80%] gap-5 pt-8 sm:w-[55%]">
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">시/도</span>
                {/* 시/도 */}
                <select
                  value={selectedArea}
                  onChange={handleAreaChange}
                  className="mt-5 rounded-md border px-2 py-3 text-grey60"
                >
                  <option value="">지역을 선택해주세요</option>
                  {addressData.map((area) => (
                    <option key={area.name} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">시/군/구</span>

                {/* 시/군/구 */}
                <select
                  value={selectedSubArea}
                  onChange={handleSubAreaChange}
                  className="mt-5 rounded-md border px-2 py-3 text-grey60"
                >
                  <option value="">시,군,구를 선택해주세요</option>
                  {subAreas.map((subArea) => (
                    <option key={subArea} value={subArea}>
                      {subArea}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
        <div className="flex justify-end p-4 pr-96">
          <Link href="/onBoarding/select">
            <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">이전</button>
          </Link>
          <button
            className={`mr-4 rounded px-16 py-2 ${
              isNextButtonEnabled ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
            }`}
            disabled={!isNextButtonEnabled}
            onClick={handleSubmit(onSubmit)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

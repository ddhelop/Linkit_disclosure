'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileAward, PutProfileAward, DeleteProfileAward } from '@/lib/action'
import { AwardFormInputs, AwardResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'
import { Button } from '@/components/common/Button'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface MyResumAwardProps {
  data: AwardResponse[]
}

export default function MyAwardComponent({ data }: MyResumAwardProps) {
  const { register, handleSubmit, reset, setValue } = useForm<AwardFormInputs>()
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [awards, setAwards] = useState<AwardFormInputs[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''

  // select style
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = selectStyle
    document.head.append(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // 초기 데이터 설정
  useEffect(() => {
    if (data && data.length > 0) {
      setAwards(data)
    }
  }, [data])

  const onSubmit: SubmitHandler<AwardFormInputs> = async (formData) => {
    if (isEditing !== null) {
      // 수정 모드일 때
      const response = await PutProfileAward(accessToken, formData, isEditing)
      if (response.ok) {
        setAwards((prev) => prev.map((award) => (award.id === isEditing ? formData : award)))
        pushNotification('수상이력이 수정되었습니다.', 'success')
      } else {
        pushNotification('수상이력 수정 중 오류가 발생했습니다.', 'error')
      }
      setIsEditing(null)
    } else {
      // 추가 모드일 때
      const response = await PostProfileAward(accessToken, formData)
      if (response.ok) {
        setAwards((prev) => [...prev, formData])
        pushNotification('수상이력이 추가되었습니다.', 'success')
      } else {
        pushNotification('수상이력 추가 중 오류가 발생했습니다.', 'error')
      }
    }
    reset()
    setIsAdding(false)
  }

  const handleDeleteAward = async (id: number) => {
    try {
      const response = await DeleteProfileAward(accessToken, id)
      if (response.ok) {
        setAwards((prev) => prev.filter((award) => award.id !== id))
      } else {
        pushNotification('수상이력 삭제 중 오류가 발생했습니다.', 'error')
      }
    } catch (error) {
      console.error('Failed to delete award', error)
      pushNotification('수상이력 삭제 중 오류가 발생했습니다.', 'error')
    }
  }

  const handleEditAward = (award: AwardFormInputs, setValue: UseFormSetValue<AwardFormInputs>) => {
    setIsEditing(award.id)
    setValue('awardsName', award.awardsName)
    setValue('ranking', award.ranking)
    setValue('organizer', award.organizer)
    setValue('awardsYear', award.awardsYear)
    setValue('awardsMonth', award.awardsMonth)
    setValue('awardsDescription', award.awardsDescription)
    setIsAdding(true)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">수상</span>
      </div>

      {/* contents */}
      {awards.length === 0 && !isAdding && <div className="pt-[0.94rem] text-grey50">수상 내역이 없습니다.</div>}

      {awards.length > 0 && (
        <div className="mt-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="mt-4 flex justify-between gap-[1.62rem] rounded-[0.63rem] border border-grey30 p-6"
            >
              <div className="flex gap-[1.62rem]">
                <div className="text-grey60">{award.awardsYear}</div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-grey60">{award.organizer}</span>
                    <span className="text-grey100">
                      {award.awardsName},{award.ranking}
                    </span>
                    <span className="text-sm text-grey60">{award.awardsDescription}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Image
                  src="/assets/icons/pencil.svg"
                  width={27}
                  height={27}
                  alt="edit"
                  className="cursor-pointer"
                  onClick={() => handleEditAward(award, setValue)}
                />
                <Image
                  src="/assets/icons/delete.svg"
                  width={27}
                  height={27}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={() => handleDeleteAward(award.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-[0.44rem] border border-grey40 bg-grey10 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex w-[49%] flex-col">
                <label className="text-sm font-normal text-grey100">
                  대회명<span className="pl-1 text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="도전 K-스타트업 2024 왕중왕전"
                  className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                  {...register('awardsName', { required: true })}
                />
              </div>
              <div className="flex w-[49%] flex-col">
                <label className="text-sm font-normal text-grey100">
                  수상 내역<span className="pl-1 text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="대상"
                  className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                  {...register('ranking', { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <label className="text-sm font-normal text-grey100">
                주관 기관<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <input
                type="text"
                placeholder="중소벤처기업부"
                className="mt-2 w-[49%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                {...register('organizer', { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal text-grey100">
                시기<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <div className="flex gap-3">
                <select
                  className="select-with-padding-right border-grey3 mt-2 w-[17%] rounded-[0.44rem] border  px-[0.88rem] py-3 text-sm text-grey60"
                  {...register('awardsYear', { required: true, valueAsNumber: true })}
                >
                  {[...Array(50).keys()].map((i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}년
                    </option>
                  ))}
                </select>
                <select
                  className="select-with-padding-right mt-2 w-[13%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm text-grey60"
                  {...register('awardsMonth', { required: true, valueAsNumber: true })}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}월
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal text-grey100">
                설명<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <textarea
                placeholder=""
                className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                {...register('awardsDescription', { required: true })}
              />
            </div>
            <div className="mt-[0.94rem] flex w-full justify-end gap-2">
              <Button
                mode="sub"
                animationMode="sub"
                onClick={() => {
                  setIsAdding(false)
                  setIsEditing(null)
                  reset()
                }}
              >
                취소하기
              </Button>
              <Button type="submit" mode="main" animationMode="main">
                {isEditing !== null ? '수정하기' : '저장하기'}
              </Button>
            </div>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="mt-6 flex w-full justify-end  pt-8">
          <Button onClick={() => setIsAdding(true)} animationMode="main">
            추가하기
          </Button>
        </div>
      )}
    </div>
  )
}

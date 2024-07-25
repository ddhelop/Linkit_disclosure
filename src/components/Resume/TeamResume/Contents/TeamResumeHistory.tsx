import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamHistory, PutTeamHistory, DeleteTeamHistory } from '@/lib/action'
import { HistoryResponse } from '@/lib/types'
import Image from 'next/image'
import Select from 'react-select'
import { validateYear, validateYearMessage } from '@/context/schemaValidation'

interface TeamHistoryProps {
  data: HistoryResponse[]
}

interface FormInputs {
  historyOneLineIntroduction: string
  startYear: string
  endYear: string
  inProgress: { value: string; label: string } | null
  historyIntroduction: string
}

const selectOptions = [
  { value: 'false', label: '종료' },
  { value: 'true', label: '진행중' },
]

export default function TeamResumeHistory({ data: initialData }: TeamHistoryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [data, setData] = useState<HistoryResponse[]>(initialData)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      inProgress: selectOptions[0],
    },
  })

  const accessToken = useRecoilValue(accessTokenState) || ''

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const newData: HistoryResponse = {
        id: editIndex !== null ? data[editIndex].id : 0, // 임시로 id를 생성
        historyOneLineIntroduction: formData.historyOneLineIntroduction,
        startYear: parseInt(formData.startYear),
        endYear: formData.inProgress?.value === 'true' ? null : parseInt(formData.endYear),
        inProgress: formData.inProgress?.value === 'true',
        historyIntroduction: formData.historyIntroduction,
      }

      let response
      if (editIndex !== null) {
        response = await PutTeamHistory(accessToken, newData, newData.id)
      } else {
        response = await PostTeamHistory(accessToken, newData)
        const responseData = await response.json()
        newData.id = responseData // 새로운 ID를 응답으로 받아와서 설정
      }

      if (response.ok) {
        if (editIndex !== null) {
          setData((prevData) => prevData.map((item, idx) => (idx === editIndex ? newData : item)))
        } else {
          setData((prevData) => [...(prevData || []), newData])
        }
        alert('팀 연혁이 성공적으로 저장되었습니다.')
        setIsEditing(false)
        setEditIndex(null)
        reset()
      }
    } catch (error) {
      console.error('Failed to save team history:', error)
    }
  }

  const handleEdit = (index: number) => {
    const history = data[index]
    setValue('historyOneLineIntroduction', history.historyOneLineIntroduction)
    setValue('startYear', history.startYear.toString())
    setValue('endYear', history.endYear?.toString() || '')
    setValue('inProgress', history.inProgress ? selectOptions[1] : selectOptions[0])
    setValue('historyIntroduction', history.historyIntroduction)
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditIndex(null)
    reset()
  }

  const handleDelete = async (index: number) => {
    const history = data[index]
    try {
      if (confirm('팀 연혁을 삭제하시겠습니까?')) {
        const response = await DeleteTeamHistory(accessToken, history.id)
        if (response.ok) {
          setData((prevData = []) => prevData.filter((_, idx) => idx !== index)) // prevData를 기본값으로 배열 초기화
        } else {
          console.error('Failed to delete team history:', response)
        }
      }
    } catch (error) {
      console.error('Error deleting team history:', error)
    }
  }

  const inProgressValue = watch('inProgress')?.value === 'true'

  useEffect(() => {
    if (inProgressValue) {
      setValue('endYear', '')
    }
  }, [inProgressValue, setValue])

  return (
    <>
      <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
        <p className="text-lg font-semibold">연혁</p>

        <div className="flex flex-col gap-4">
          {data === null && <p className="text-grey60">등록된 팀 연혁이 없습니다.</p>}
          {data?.map((history, index) => (
            <div key={history.id} className="rounded-[0.63rem] border border-grey30 px-[1.31rem] py-[1.38rem]">
              <div className="flex justify-between">
                <div className="flex gap-[1.62rem]">
                  <p className="text-grey60">{history?.startYear}</p>
                  <div className="flex flex-col gap-1">
                    <p>{history?.historyOneLineIntroduction}</p>
                    <p className="text-sm text-grey60">{history?.historyIntroduction}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Image
                    src="/assets/icons/pencil.svg"
                    width={27}
                    height={27}
                    alt="edit"
                    onClick={() => handleEdit(index)}
                    className="cursor-pointer"
                  />
                  <Image
                    src="/assets/icons/delete.svg"
                    width={27}
                    height={27}
                    alt="delete"
                    onClick={() => handleDelete(index)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {isEditing && editIndex === index && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 flex flex-col gap-5 rounded-[0.44rem] border border-grey30 bg-grey10 p-5"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal">한 줄 소개</p>
                    <input
                      {...register('historyOneLineIntroduction')}
                      placeholder="Text Field"
                      className="rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal">기간</p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          {...register('startYear', {
                            validate: (value) => validateYear(value) || validateYearMessage(value),
                          })}
                          type="number"
                          placeholder="시작"
                          className="w-[12.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-2 text-left text-sm"
                        />
                        {errors.startYear && (
                          <p className="absolute w-[32rem] pl-1 text-xs text-red-500">{errors.startYear.message}</p>
                        )}
                      </div>
                      <p>~</p>
                      <div className="relative">
                        <input
                          {...register('endYear', {
                            validate: (value) => validateYear(value) || validateYearMessage(value),
                          })}
                          type="number"
                          placeholder="종료"
                          className="w-[12.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-2 text-left text-sm"
                          disabled={inProgressValue}
                        />
                        {errors.endYear && !inProgressValue && (
                          <p className="absolute w-[32rem] pl-1 text-xs text-red-500">{errors.endYear.message}</p>
                        )}
                      </div>
                      <Controller
                        name="inProgress"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={selectOptions}
                            className="w-[6rem] text-sm"
                            placeholder="진행 상태"
                            value={field.value}
                            components={{ IndicatorSeparator: () => null }}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm font-normal">설명</p>
                    <textarea
                      {...register('historyIntroduction')}
                      className="mt-2 resize-none rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 "
                      rows={3}
                      placeholder="Text Field"
                    />
                  </div>

                  <div className="mt-4 flex w-full justify-end gap-2">
                    <button
                      className="rounded-[0.25rem] bg-grey60 px-4 py-2 text-[#fff]"
                      type="button"
                      onClick={handleCancel}
                    >
                      취소하기
                    </button>
                    <button className="rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]" type="submit">
                      저장하기
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>

        {isEditing && editIndex === null && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-5 rounded-[0.44rem] border border-grey30 bg-grey10 p-5"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">한 줄 소개</p>
              <input
                {...register('historyOneLineIntroduction')}
                placeholder="Text Field"
                className="rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">기간</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    {...register('startYear', {
                      validate: (value) => validateYear(value) || validateYearMessage(value),
                    })}
                    type="number"
                    placeholder="시작년도"
                    className="w-[12.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-2 text-left text-sm"
                  />
                  {errors.startYear && (
                    <p className="absolute w-[32rem] pl-1 text-xs text-red-500">{errors.startYear.message}</p>
                  )}
                </div>
                <p>~</p>
                <div className="relative">
                  <input
                    {...register('endYear', {
                      validate: (value) => validateYear(value) || validateYearMessage(value),
                    })}
                    type="number"
                    placeholder="종료년도"
                    className="w-[12.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-2 text-left text-sm"
                    disabled={inProgressValue}
                  />
                  {errors.endYear && !inProgressValue && (
                    <p className="absolute w-[32rem] pl-1 text-xs text-red-500">{errors.endYear.message}</p>
                  )}
                </div>
                <Controller
                  name="inProgress"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectOptions}
                      className="w-[6rem] text-sm"
                      placeholder="진행 상태"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      components={{ IndicatorSeparator: () => null }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-normal">설명</p>
              <textarea
                {...register('historyIntroduction')}
                className="mt-2 resize-none rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 "
                rows={3}
                placeholder="Text Field"
              />
            </div>

            <div className="mt-4 flex w-full justify-end gap-2">
              <button
                className="rounded-[0.25rem] border border-main bg-white px-4 py-2 text-main"
                type="button"
                onClick={handleCancel}
              >
                취소하기
              </button>
              <button className="rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]" type="submit">
                저장하기
              </button>
            </div>
          </form>
        )}

        {!isEditing && (
          <div className="mt-4 flex w-full justify-end gap-2">
            <button
              className=" rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]"
              onClick={() => setIsEditing(true)}
            >
              추가하기
            </button>
          </div>
        )}
      </div>
    </>
  )
}

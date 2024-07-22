import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamHistory, PutTeamHistory, DeleteTeamHistory } from '@/lib/action'
import { HistoryResponse } from '@/lib/types'
import Image from 'next/image'

interface TeamHistoryProps {
  data: HistoryResponse[]
}

interface FormInputs {
  historyOneLineIntroduction: string
  startYear: string
  endYear: string
  inProgress: boolean
  historyIntroduction: string
}

export default function TeamResumeHistory({ data: initialData }: TeamHistoryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [data, setData] = useState<HistoryResponse[]>(initialData)
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormInputs>()

  const accessToken = useRecoilValue(accessTokenState) || ''

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const newData: HistoryResponse = {
      id: editIndex !== null ? data[editIndex].id : Date.now(), // 임시로 id를 생성
      historyOneLineIntroduction: formData.historyOneLineIntroduction,
      startYear: parseInt(formData.startYear),
      endYear: formData.inProgress ? null : parseInt(formData.endYear),
      inProgress: formData.inProgress,
      historyIntroduction: formData.historyIntroduction,
    }

    try {
      let response
      if (editIndex !== null) {
        response = await PutTeamHistory(accessToken, newData, newData.id)
      } else {
        response = await PostTeamHistory(accessToken, newData)
      }

      if (response.ok) {
        if (editIndex !== null) {
          setData((prevData) => prevData.map((item, idx) => (idx === editIndex ? newData : item)))
        } else {
          setData((prevData = []) => [...prevData, newData]) // prevData를 기본값으로 배열 초기화
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
    setValue('inProgress', history.inProgress)
    setValue('historyIntroduction', history.historyIntroduction)
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditIndex(null)
    reset()
  }

  // 삭제하기
  const handleDelete = async (index: number) => {
    const history = data[index]
    try {
      const response = await DeleteTeamHistory(accessToken, history.id)
      if (response.ok) {
        if (confirm('팀 연혁을 삭제하시겠습니까?')) {
          setData((prevData = []) => prevData.filter((_, idx) => idx !== index)) // prevData를 기본값으로 배열 초기화
        }
      } else {
        console.error('Failed to delete team history:', response)
      }
    } catch (error) {
      console.error('Error deleting team history:', error)
    }
  }

  const inProgressValue = watch('inProgress') ? watch('inProgress').toString() === 'true' : false

  return (
    <>
      <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
        <p className="text-lg font-semibold">연혁</p>

        <div className="flex flex-col gap-4">
          {data && data.length === 0 && <p className="text-grey60">등록된 팀 연혁이 없습니다.</p>}
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
                  className="mt-4 flex flex-col gap-[0.94rem] rounded-[0.44rem] border border-grey30 bg-grey10 p-5"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal">한줄소개</p>
                    <input
                      {...register('historyOneLineIntroduction')}
                      placeholder="Text Field"
                      className="rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal">기간</p>
                    <div className="flex items-center gap-4">
                      <input
                        {...register('startYear')}
                        placeholder="시작"
                        className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                      />
                      <p>~</p>
                      <input
                        {...register('endYear')}
                        placeholder="종료"
                        className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                        disabled={inProgressValue}
                      />
                      <select
                        {...register('inProgress')}
                        className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                      >
                        <option value="true">진행중</option>
                        <option value="false">종료</option>
                      </select>
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
            className="mt-4 flex flex-col gap-[0.94rem] rounded-[0.44rem] border border-grey30 bg-grey10 p-5"
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">한줄소개</p>
              <input
                {...register('historyOneLineIntroduction')}
                placeholder="Text Field"
                className="rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">기간</p>
              <div className="flex items-center gap-4">
                <input
                  {...register('startYear')}
                  placeholder="시작"
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                />
                <p>~</p>
                <input
                  {...register('endYear')}
                  placeholder="종료"
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                  disabled={inProgressValue}
                />
                <select
                  {...register('inProgress')}
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                >
                  <option value="true">진행중</option>
                  <option value="false">종료</option>
                </select>
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

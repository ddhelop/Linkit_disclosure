import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamHistory, PutTeamHistory, DeleteTeamHistory } from '@/lib/action'
import { HistoryResponse, TeamHistoryFormInputs } from '@/lib/types'
import Image from 'next/image'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

import { Button } from '@/components/common/Button'
import TeamHistoryForm from '@/components/common/component/Team/TeamHistoryForm'

interface TeamHistoryProps {
  data: HistoryResponse[]
}

// Use `Selection` in the component
const Selection = [
  { value: 'false', label: '종료' },
  { value: 'true', label: '진행중' },
]

export default function TeamResumeHistory({ data: initialData }: TeamHistoryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [data, setData] = useState<HistoryResponse[]>(initialData)

  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleFormSubmit = async (formData: TeamHistoryFormInputs) => {
    try {
      const newData: HistoryResponse = {
        id: editIndex !== null ? data[editIndex].id : 0,
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
        newData.id = responseData
      }

      if (response.ok) {
        if (editIndex !== null) {
          setData((prevData) => prevData.map((item, idx) => (idx === editIndex ? newData : item)))
        } else {
          setData((prevData) => [...(prevData || []), newData])
        }
        pushNotification('팀 연혁이 성공적으로 저장되었습니다.', 'success')
        setIsEditing(false)
        setEditIndex(null)
      }
    } catch (error) {
      console.error('Failed to save team history:', error)
    }
  }

  const handleEdit = (index: number) => {
    const history = data[index]
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditIndex(null)
  }

  const handleDelete = async (index: number) => {
    const history = data[index]
    try {
      if (confirm('팀 연혁을 삭제하시겠습니까?')) {
        const response = await DeleteTeamHistory(accessToken, history.id)
        if (response.ok) {
          setData((prevData = []) => prevData.filter((_, idx) => idx !== index))
        } else {
          console.error('Failed to delete team history:', response)
        }
      }
    } catch (error) {
      console.error('Error deleting team history:', error)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
        <p className="text-base font-semibold sm:text-lg">연혁</p>

        <div className="flex flex-col gap-4">
          {data === null && <p className="text-grey60">등록된 팀 연혁이 없습니다.</p>}
          {data?.map((history, index) => (
            <div key={history.id} className="rounded-[0.63rem] border border-grey30 px-[1.31rem] py-[1.38rem]">
              <div className="flex justify-between">
                <div className="flex gap-[1.62rem]">
                  <p className="text-sm text-grey60 sm:text-base">{history?.startYear}</p>
                  <div className="flex flex-col gap-1 ">
                    <p className="text-sm sm:text-base">{history?.historyOneLineIntroduction}</p>
                    <p className="text-xs text-grey60 sm:text-sm">{history?.historyIntroduction}</p>
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
                <TeamHistoryForm
                  defaultValues={{
                    historyOneLineIntroduction: history.historyOneLineIntroduction,
                    startYear: history.startYear.toString(),
                    endYear: history.endYear?.toString() || '',
                    inProgress: history.inProgress ? Selection[1] : Selection[0],
                    historyIntroduction: history.historyIntroduction,
                  }}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancel}
                  isEditingMode={true}
                />
              )}
            </div>
          ))}
        </div>

        {isEditing && editIndex === null && (
          <TeamHistoryForm
            defaultValues={{
              historyOneLineIntroduction: '',
              startYear: '',
              endYear: '',
              inProgress: Selection[0],
              historyIntroduction: '',
            }}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isEditingMode={false}
          />
        )}

        {!isEditing && (
          <div className="mt-4 flex w-full justify-end gap-2">
            <Button animationMode="main" onClick={() => setIsEditing(true)}>
              추가하기
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

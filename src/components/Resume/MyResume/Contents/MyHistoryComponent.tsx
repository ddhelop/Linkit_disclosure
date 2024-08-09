'use client'

import { accessTokenState } from '@/context/recoil-context'
import { DeleteAntecedentData, PostOneAntecedentData, PutAntecedentData } from '@/lib/action'
import { AntecedentResponse, OnBoardingCareerFormInputs } from '@/lib/types'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'
import CareerForm from '@/components/common/component/onBoarding/CareerForm'
import { SubmitHandler } from 'react-hook-form'

interface MyResumAntecedentProps {
  data: AntecedentResponse[]
}

export default function MyHistoryComponent({ data }: MyResumAntecedentProps) {
  const [histories, setHistories] = useState<AntecedentResponse[]>(data)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    if (editingIndex !== null) {
      const history = histories[editingIndex]
      if (history) {
        setIsAdding(true)
      }
    }
  }, [editingIndex, histories])

  const handleFormSubmit: SubmitHandler<OnBoardingCareerFormInputs> = async (formData) => {
    // Ensure the retirement field is always a boolean
    const retirementValue = formData.retirement === 'true' || formData.retirement === true

    const antecedentData: OnBoardingCareerFormInputs = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: retirementValue ? '' : formatDate(formData.endDate),
      retirement: retirementValue, // Ensure it's a boolean
    }

    if (editingIndex !== null) {
      const antecedentId = histories[editingIndex].id
      const response = await PutAntecedentData(accessToken, antecedentData, antecedentId) // 수정 API 호출
      if (response.ok) {
        const updatedHistories = histories.map((history, index) =>
          index === editingIndex ? { ...antecedentData, id: antecedentId } : history,
        )
        setHistories(updatedHistories)
        setEditingIndex(null)
        setIsAdding(false)
        pushNotification('수정이 완료되었습니다.', 'success')
      }
    } else {
      const response = await PostOneAntecedentData(accessToken, antecedentData) // 추가 API 호출
      if (response.ok) {
        const newId = await response.json()
        setHistories([...histories, { ...antecedentData, id: newId }])
        setIsAdding(false)
        pushNotification('추가가 완료되었습니다.', 'success')
      }
    }
  }

  const formatDate = (date: string): string => {
    if (!date) return ''
    const [year, month] = date.split('.')
    return `${year}.${month?.padStart(2, '0')}`
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const antecedentId = histories[index].id || 0
      const updatedHistories = histories.filter((_, i) => i !== index)
      setHistories(updatedHistories)
      const response = await DeleteAntecedentData(accessToken, antecedentId)
      if (response.ok) {
        pushNotification('삭제가 완료되었습니다.', 'success')
      }
      if (index === editingIndex) {
        setEditingIndex(null)
        setIsAdding(false)
      }
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setIsAdding(false)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">경력</span>
      </div>

      {/* contents */}
      {histories?.length === 0 && !isAdding && <div className="pt-[0.94rem] text-grey50">이력사항이 없습니다.</div>}

      {histories?.map((history, index) => (
        <div key={history.id} className="mt-6 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-grey100">{history.projectName}</span>
              <span className="pt-1 text-sm text-grey60">{history.projectRole}</span>
              <span className="pt-1 text-xs text-grey50">
                {history.startDate} - {history.endDate || '현재'} ({history.retirement ? '종료' : '진행중'})
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Image
                onClick={() => handleEdit(index)}
                src="/assets/icons/pencil.svg"
                width={27}
                height={27}
                alt="edit"
                className="cursor-pointer"
              />
              <Image
                onClick={() => handleDelete(index)}
                src="/assets/icons/delete.svg"
                width={27}
                height={27}
                alt="delete"
                className="cursor-pointer"
              />
            </div>
          </div>

          {isAdding && editingIndex === index && (
            <CareerForm
              defaultValues={{
                id: history.id,
                projectName: history.projectName,
                projectRole: history.projectRole,
                startDate: history.startDate,
                endDate: history.endDate,
                retirement: Boolean(history.retirement), // Ensure this is a boolean
              }}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isEditingMode={true}
            />
          )}
        </div>
      ))}

      {/* Add new career form */}
      {isAdding && editingIndex === null && (
        <CareerForm
          defaultValues={{
            id: 0, // Temporary ID for new entries
            projectName: '',
            projectRole: '',
            startDate: '',
            endDate: '',
            retirement: false, // Ensure this is a boolean
          }}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isEditingMode={false}
        />
      )}

      {!isAdding && (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <motion.button
            {...mainHoverEffect}
            onClick={() => setIsAdding(true)}
            className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]"
          >
            추가하기
          </motion.button>
        </div>
      )}
    </div>
  )
}

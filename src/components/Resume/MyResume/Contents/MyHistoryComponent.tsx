'use client'
import { accessTokenState } from '@/context/recoil-context'
import { DeleteAntecedentData, PostOneAntecedentData, PutAntecedentData } from '@/lib/action'
import { AntecedentResponse } from '@/lib/types'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'
import { Button } from '@/components/common/Button'
import Input from '@/components/common/component/Basic/Input'
import Radio from '@/components/common/component/Basic/Radio'
import Textarea from '@/components/common/component/Basic/TextArea'
import { validateYearMonthMessage } from '@/context/schemaValidation'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface FormInputs {
  id?: number
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean
  antecedentsDescription: string
}

interface MyResumAntecedentProps {
  data: AntecedentResponse[]
}

export default function MyHistoryComponent({ data }: MyResumAntecedentProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      projectName: '',
      projectRole: '',
      startDate: '',
      endDate: '',
      retirement: false,
      antecedentsDescription: '',
    },
  })
  const [histories, setHistories] = useState<FormInputs[]>(
    () =>
      data?.map((item) => ({
        id: item.id,
        projectName: item.projectName,
        projectRole: item.projectRole,
        startDate: item.startDate,
        endDate: item.endDate,
        retirement: item.retirement,
        antecedentsDescription: item.antecedentsDescription || '', // 기본값 설정
      })) || [],
  )
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    if (editingIndex !== null) {
      const history = histories[editingIndex]
      setValue('projectName', history?.projectName)
      setValue('projectRole', history?.projectRole)
      setValue('startDate', history?.startDate)
      setValue('endDate', history?.endDate)
      setValue('retirement', history?.retirement)
      setValue('antecedentsDescription', history?.antecedentsDescription)
    }
  }, [editingIndex, histories, setValue])

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const antecedentData = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formData.retirement ? formatDate(formData.endDate) : '',
      retirement: formData.retirement,
    }

    if (editingIndex !== null) {
      const antecedentId = data[editingIndex]?.id
      const response = await PutAntecedentData(accessToken, antecedentData, antecedentId) // 수정 API 호출
      if (response.ok) {
        const updatedHistories = histories.map((history, index) =>
          index === editingIndex ? { ...antecedentData, id: antecedentId } : history,
        )
        setHistories(updatedHistories)
        setEditingIndex(null)
        reset()
        setIsAdding(false)
        pushNotification('수정이 완료되었습니다.', 'success')
      }
    } else {
      const response = await PostOneAntecedentData(accessToken, antecedentData) // 추가 API 호출
      if (response.ok) {
        const newId = await response.json()
        setHistories([...histories, { ...antecedentData, id: newId }])
        reset()
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
        reset()
        setIsAdding(false)
      }
    }
  }

  const retirementValue = watch('retirement')

  const handleRetirementChange = (isRetired: boolean) => {
    setValue('retirement', isRetired)
    if (!isRetired) {
      setValue('endDate', '')
    }
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
                {history.startDate} - {history.endDate} ({history.retirement ? '종료' : '진행중'})
              </span>
              <span className="pt-1 text-sm text-grey60">{history.antecedentsDescription}</span>
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
        </div>
      ))}

      {/*  */}
      {isAdding && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col rounded-[0.63rem] border border-grey30 bg-grey30 bg-opacity-30 px-5 py-6"
        >
          <div className="flex gap-3">
            <div className="flex w-[49%] flex-col">
              <Input
                label="회사/프로젝트명"
                placeholder="회사명 / 프로젝트"
                required
                {...register('projectName', { required: '회사/프로젝트명을 입력해주세요.' })}
              />
            </div>

            <div className="flex w-[49%] flex-col">
              <Input
                label="포지션"
                placeholder="Product Manager"
                required
                {...register('projectRole', { required: '포지션을 입력해주세요.' })}
              />
            </div>
          </div>

          <div className="mt-[0.81rem] flex flex-col">
            <span className="text-sm font-normal text-grey100">
              기간<span className="pl-1 text-[#2563EB]">*</span>
            </span>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="relative ">
                  <Input
                    className="w-60"
                    placeholder="YYYY.MM"
                    required
                    {...register('startDate', {
                      required: '시작일을 YYYY.MM 형식으로 입력해주세요.',
                      validate: validateYearMonthMessage,
                      onBlur: () => trigger('startDate'),
                    })}
                  />
                </div>

                <span>~</span>

                <div className="flex flex-col">
                  <Input
                    className="w-60"
                    placeholder="YYYY.MM"
                    required={retirementValue}
                    disabled={!retirementValue}
                    {...register('endDate', {
                      validate: retirementValue ? validateYearMonthMessage : undefined,
                      onBlur: () => trigger('endDate'),
                    })}
                  />
                </div>

                <div className="flex items-end gap-2">
                  {/* input radio 진행중 */}
                  <Radio
                    label="진행중"
                    value="false"
                    checked={!retirementValue}
                    onChange={() => handleRetirementChange(false)}
                  />

                  {/* radio 종료 */}
                  <Radio
                    label="종료"
                    value="true"
                    checked={retirementValue}
                    onChange={() => handleRetirementChange(true)}
                  />
                </div>
              </div>
            </div>
            <Textarea
              label="설명"
              placeholder="경력 설명"
              required
              {...register('antecedentsDescription', { required: '경력 설명을 입력해주세요.' })}
            />

            <div className="mt-5 flex justify-end gap-2">
              <Button
                onClick={() => {
                  reset()
                  setIsAdding(false)
                }}
                animationMode="sub"
                mode="sub"
              >
                취소하기
              </Button>
              <Button type="submit" mode="main" animationMode="main">
                완료하기
              </Button>
            </div>
          </div>
        </form>
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

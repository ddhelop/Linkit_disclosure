// EducationForm.tsx
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import Input from '@/components/common/component/Basic/Input'
import Select from '@/components/common/component/Basic/Select'
import { Button } from '../../Button'

export interface SchoolFormInputs {
  id?: number
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number | null
  degreeName: string
}

interface EducationFormProps {
  defaultValues: SchoolFormInputs
  onSubmit: SubmitHandler<SchoolFormInputs>
  onCancel: () => void // New prop for cancel action
  isEditMode: boolean
  className?: string // Optional className prop for custom styling
}

export const EducationForm: React.FC<EducationFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isEditMode,
  className,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<SchoolFormInputs>({
    defaultValues,
  })

  const degreeName = watch('degreeName')

  const degreeOptions = [
    { value: '재학', label: '재학' },
    { value: '졸업', label: '졸업' },
  ]
  console.log(className)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mt-6 flex w-full flex-col rounded-[0.63rem] border border-grey30 px-5 py-6  ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex w-full flex-col sm:w-1/2">
          <span className="text-sm font-normal text-grey100">
            학교명<span className="pl-1 text-[#2563EB]">*</span>
          </span>
          <Input type="text" placeholder="대학교(원)" {...register('universityName', { required: true })} />
        </div>

        <div className="flex w-full flex-col sm:w-1/2">
          <span className="text-sm font-normal text-grey100">
            전공명<span className="pl-1 text-[#2563EB]">*</span>
          </span>
          <Input type="text" placeholder="경영학과" {...register('majorName', { required: true })} />
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <span className="text-sm font-normal text-grey100">
          재학 기간<span className="pl-1 text-[#2563EB]">*</span>
        </span>
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="mt-2 flex flex-row flex-wrap gap-3">
            <Input placeholder="입학연도" className="w-20" {...register('admissionYear', { required: true })} />
            <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
            <Input
              placeholder="졸업연도"
              className="w-20"
              {...register('graduationYear', { required: degreeName !== '재학' })}
              disabled={degreeName === '재학'}
            />
            <Select
              name="degreeName"
              options={degreeOptions}
              selectedValue={degreeName}
              onChange={(e) => setValue('degreeName', e.target.value)}
            />
          </div>
          <div className="mt-2 flex flex-row items-end  justify-end gap-1 sm:mt-0">
            {isEditMode && (
              <Button animationMode="sub" mode="sub" type="button" onClick={onCancel}>
                취소
              </Button>
            )}
            <Button type="submit" mode="main" animationMode="main">
              {isEditMode ? '수정' : '추가'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EducationForm

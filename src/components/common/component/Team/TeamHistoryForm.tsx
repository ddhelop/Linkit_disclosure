import React, { useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from 'react-select'
import Input from '@/components/common/component/Basic/Input'
import Textarea from '@/components/common/component/Basic/TextArea'
import { Button } from '@/components/common/Button'
import { validateYear, validateYearMessage } from '@/context/schemaValidation'
import { pushNotification } from '../ToastPopUp/ToastPopup'

interface FormInputs {
  historyOneLineIntroduction: string
  startYear: string
  endYear: string
  inProgress: { value: string; label: string } | null
  historyIntroduction: string
}

interface TeamHistoryFormProps {
  defaultValues: FormInputs
  onSubmit: SubmitHandler<FormInputs>
  onCancel: () => void
  isEditingMode: boolean
}

const Selection = [
  { value: 'false', label: '종료' },
  { value: 'true', label: '진행중' },
]

const TeamHistoryForm: React.FC<TeamHistoryFormProps> = ({ defaultValues, onSubmit, onCancel, isEditingMode }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues,
  })

  const inProgressValue = watch('inProgress')?.value === 'true'

  useEffect(() => {
    if (inProgressValue) {
      setValue('endYear', '') // Clear endYear when inProgress is true
    }
  }, [inProgressValue, setValue])

  // Handle form errors
  const handleFormErrors = (errors: any) => {
    if (errors.historyOneLineIntroduction) {
      pushNotification('한 줄 소개를 입력해주세요.', 'error')
    } else if (errors.startYear) {
      pushNotification('올바른 시작 연도를 입력해주세요.', 'error')
    } else if (errors.endYear && !inProgressValue) {
      pushNotification('올바른 종료 연도를 입력해주세요.', 'error')
    } else if (errors.historyIntroduction) {
      pushNotification('역사 설명을 입력해주세요.', 'error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, handleFormErrors)}
      className="mt-4 flex flex-col gap-5 rounded-[0.44rem] border border-grey30 p-5"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">
          한 줄 소개 <span className="text-sm text-main">*</span>
        </p>
        <Input {...register('historyOneLineIntroduction', { required: true })} placeholder="Text Field" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">
          기간 <span className="text-sm text-main">*</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              {...register('startYear', {
                validate: (value) => validateYear(value) || validateYearMessage(value),
                required: true,
              })}
              type="number"
              placeholder="시작년도"
              className="w-[5rem]"
            />
          </div>
          <p>~</p>
          <div className="relative">
            <Input
              {...register('endYear', {
                validate: (value) => inProgressValue || validateYear(value) || validateYearMessage(value),
              })}
              type="number"
              placeholder="종료년도"
              className="w-[5rem]"
              disabled={inProgressValue}
            />
          </div>
          <Controller
            name="inProgress"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={Selection}
                className="mt-[0.42rem] text-sm"
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
        <p className="text-sm font-normal">
          설명 <span className="text-sm text-main">*</span>
        </p>
        <Textarea
          {...register('historyIntroduction', { required: true })}
          className="mt-2 resize-none rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
          rows={3}
          placeholder="Text Field"
        />
      </div>

      <div className="mt-4 flex w-full justify-end gap-2">
        <Button animationMode="sub" mode="sub" type="button" onClick={onCancel}>
          취소하기
        </Button>
        <Button animationMode="main" type="submit">
          {isEditingMode ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  )
}

export default TeamHistoryForm

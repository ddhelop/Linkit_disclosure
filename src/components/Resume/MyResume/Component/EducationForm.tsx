import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { EducationFormInputs } from '@/lib/types'
import Input from '@/components/common/component/Basic/Input'
import Select from '@/components/common/component/Basic/Select'

interface EducationFormProps {
  onSubmit: (data: EducationFormInputs) => void
  onCancel: () => void
  defaultValues: EducationFormInputs
  isEditing: boolean
}

export const EducationForm = ({ onSubmit, onCancel, defaultValues, isEditing }: EducationFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EducationFormInputs>()

  const degreeName = watch('degreeName')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-4 rounded-lg border border-grey40 bg-grey10 p-5"
    >
      <div className="flex gap-[0.81rem]">
        <div className="flex flex-col">
          <p className="text-sm font-normal text-grey100">학교명</p>
          <Input
            type="text"
            placeholder="링킷대학교"
            className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
            {...register('universityName', { required: '학교명을 입력해주세요' })}
            defaultValue={defaultValues.universityName}
          />
          {errors.universityName && <p className="text-red-500">{errors.universityName.message}</p>}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-normal text-grey100">전공명</p>
          <Input
            type="text"
            placeholder="링킷전공"
            className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
            {...register('majorName', { required: '전공명을 입력해주세요' })}
            defaultValue={defaultValues.majorName}
          />
          {errors.majorName && <p className="text-red-500">{errors.majorName.message}</p>}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-normal text-grey100">재학 기간</p>
        <div className="flex items-end gap-2">
          <Input
            placeholder="YYYY"
            {...register('admissionYear', { required: '입학년도를 입력해주세요' })}
            defaultValue={defaultValues.admissionYear}
          />
          <p>~</p>
          <Input
            type="text"
            placeholder="YYYY"
            {...register('graduationYear')}
            disabled={degreeName === '재학' || degreeName === '휴학'}
            defaultValue={defaultValues.graduationYear}
          />
          <Select
            options={[
              { value: '졸업', label: '졸업' },
              { value: '재학', label: '재학' },
              { value: '휴학', label: '휴학' },
            ]}
            {...register('degreeName')}
            defaultValue={defaultValues.degreeName}
            onChange={(e) => {
              if (e.target.value === '재학' || e.target.value === '휴학') {
                setValue('graduationYear', '')
              }
            }}
          />
        </div>
      </div>
      <div className="mt-[0.94rem] flex w-full justify-end gap-4">
        <Button type="button" onClick={onCancel} mode="sub" animationMode="sub">
          취소하기
        </Button>
        <Button type="submit" animationMode="main">
          {isEditing ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  )
}

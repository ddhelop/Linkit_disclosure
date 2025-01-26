import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Select from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { RoleContribution, ContributionOption } from '../../model/types'

interface RoleContributionInputProps {
  roles: RoleContribution[]
  onRoleAdd: () => void
  onRoleRemove: (index: number) => void
  onRoleChange: (index: number, role: string) => void
  onContributionChange: (index: number, contribution: string) => void
}

const contributionOptions: ContributionOption[] = [
  { label: '상', value: 'HIGH' },
  { label: '중상', value: 'UPPER_MIDDLE' },
  { label: '중', value: 'MIDDLE' },
  { label: '하', value: 'LOWER_MIDDLE' },
  { label: '최하', value: 'LOWER' },
]

export const RoleContributionInput = ({
  roles,
  onRoleAdd,
  onRoleRemove,
  onRoleChange,
  onContributionChange,
}: RoleContributionInputProps) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          역할 및 기여도<span className="text-main">*</span>
          <span className="pl-3 text-xs text-grey50">역할은 최대 3개까지 입력 가능해요.</span>
        </div>
      </div>

      <div className="rounded-xl bg-grey10 px-5 py-4">
        {roles.map((role, index) => (
          <div key={index} className="mb-3 flex gap-5">
            <Input
              value={role.role}
              onChange={(e) => onRoleChange(index, e.target.value)}
              placeholder="맡은 역할을 간단하게 입력해 주세요 (30자 이내)"
              className="w-[80%]"
            />
            <Select
              value={role.contribution}
              onChange={(value) => onContributionChange(index, value)}
              options={contributionOptions}
              placeholder="선택"
              className="w-[7rem] rounded-xl bg-white"
            />
            {roles.length > 1 && (
              <Image
                src="/common/icons/delete_x.svg"
                width={22}
                height={22}
                alt="minus-icon"
                className="cursor-pointer"
                onClick={() => onRoleRemove(index)}
              />
            )}
          </div>
        ))}

        {roles.length < 3 && (
          <div className="mt-5 flex w-full justify-center">
            <Button
              mode="custom"
              onClick={onRoleAdd}
              className="flex items-center gap-2 rounded-full border border-grey40 bg-white px-6 text-black hover:bg-grey10"
            >
              <Image src="/common/icons/black_plus.svg" width={15} height={15} alt="plus-icon" />
              추가하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

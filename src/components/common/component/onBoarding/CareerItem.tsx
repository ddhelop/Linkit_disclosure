// CareerItem.tsx
import React from 'react'
import Image from 'next/image'
import { OnBoardingCareer } from '@/lib/types'

interface CareerItemProps {
  career: OnBoardingCareer
  onEdit: () => void
  onDelete: () => void
}

export const CareerItem: React.FC<CareerItemProps> = ({ career, onEdit, onDelete }) => {
  return (
    <div className="mt-6 flex w-full flex-col rounded-[0.63rem] border border-grey30 px-5 py-6 md:w-[55%]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-semibold">{career.projectName}</span>
          <span className="pt-2 text-sm text-grey60">{career.projectRole}</span>
          <span className="text-xs text-grey50">
            {career.startDate} - {career.endDate || '현재'} ({career.retirement ? '종료' : '진행중'})
          </span>
        </div>
        <div className="flex items-center justify-end">
          <Image
            src="/assets/icons/pencil.svg"
            width={27}
            height={27}
            alt="edit"
            className="cursor-pointer"
            onClick={onEdit}
          />
          <Image
            src="/assets/icons/delete.svg"
            width={27}
            height={27}
            alt="delete"
            className="cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default CareerItem

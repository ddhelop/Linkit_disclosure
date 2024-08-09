// EducationItem.tsx
import React from 'react'
import Image from 'next/image'
import { SchoolFormInputs } from '@/components/common/component/onBoarding/EducationForm'

interface EducationItemProps {
  education: SchoolFormInputs
  onEdit: () => void
  onDelete: () => void
  isEditing: boolean
}

export const EducationItem: React.FC<EducationItemProps> = ({ education, onEdit, onDelete, isEditing }) => {
  return (
    <div className="mt-2 flex w-full flex-col rounded-[0.63rem] border border-grey30 px-5 py-4 md:w-[55%]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-semibold">{education.universityName}</span>
          <span className="pt-2 text-sm text-grey60">{education.majorName}</span>
          <span className="text-xs text-grey50">
            {education.admissionYear} - {education.graduationYear || ''} ({education.degreeName})
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

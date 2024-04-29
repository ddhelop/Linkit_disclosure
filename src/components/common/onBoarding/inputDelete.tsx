'use client'
import { IFormData } from '@/lib/types'
import Image from 'next/image'

import { UseFormRegister, useForm } from 'react-hook-form'

interface InputDeleteProps {
  placeholder: string
  inputValue: string

  onDelete: () => void
  register: UseFormRegister<IFormData>
  data: keyof IFormData
}

export default function InputDelete({ placeholder, inputValue, onDelete, register, data }: InputDeleteProps) {
  return (
    <div>
      <div className="relative flex w-full justify-center">
        <input
          type="text"
          className="w-full h-[2.75rem] p-4 text-sm text-grey90 border border-grey30 rounded-md focus:border-2 focus:border-grey90 outline-none"
          placeholder={placeholder}
          // value={inputValue}
          {...register(data)} // register 함수를 이용하여 input 필드 등록
          required
        />
        {inputValue && (
          <Image
            src="/assets/login/delete.svg"
            width={16}
            height={16}
            alt="text delete"
            className="absolute end-[14px] bottom-[0.8rem] cursor-pointer"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  )
}

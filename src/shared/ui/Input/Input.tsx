// src/shared/ui/Input/Input.tsx
'use client'

import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface InputProps {
  type?: HTMLInputTypeAttribute
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
}) => {
  return (
    <input
      type={type}
      value={value !== undefined ? value : undefined}
      defaultValue={value === undefined ? '' : undefined}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-xl border-[1.5px] border-grey30 px-4 py-2 focus:border-[1.5px] focus:border-main focus:outline-none ${className}`}
      disabled={disabled}
    />
  )
}

export default Input

// src/shared/ui/Input/Input.tsx
'use client'

import { ChangeEvent, HTMLInputTypeAttribute, forwardRef } from 'react'

interface InputProps {
  type?: HTMLInputTypeAttribute
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', value, onChange, placeholder = '', className = '', disabled = false, maxLength, onKeyDown },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        value={value !== undefined ? value : undefined}
        defaultValue={value === undefined ? '' : undefined}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`rounded-xl border-[1.5px] border-grey30 px-4 py-3 placeholder:text-grey40 focus:border-[1.5px] focus:border-main focus:outline-none ${className}`}
        disabled={disabled}
        maxLength={maxLength}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

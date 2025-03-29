// src/shared/ui/Input/Input.tsx
'use client'

import { ChangeEvent, HTMLInputTypeAttribute, forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`rounded-xl border border-grey30 px-6 py-3 placeholder:text-grey40 
          ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-main'} 
          focus:outline-none ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input

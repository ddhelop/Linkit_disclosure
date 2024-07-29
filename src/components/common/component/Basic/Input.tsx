import { forwardRef } from 'react'

interface InputProps {
  label?: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  disabled?: boolean
  width?: string // width 속성 추가
  [x: string]: any
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type = 'text', placeholder, required, className, disabled, width, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className="text-sm font-normal text-grey90">
            {label}
            {required && <span className="pl-1 text-[#2563EB]">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          disabled={disabled}
          autoComplete="off" // 자동 완성 비활성화
          style={{ width: width }} // width 스타일 추가
          className={`mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-3 text-sm outline-none hover:ring hover:ring-grey30 ${className}`}
          {...rest}
        />
      </div>
    )
  },
)

Input.displayName = 'InputComponent'

export default Input

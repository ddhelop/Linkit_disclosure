import { forwardRef } from 'react'
import Image from 'next/image'

interface RadioProps {
  label: string
  name?: string // name 속성을 선택적으로 만듭니다
  value: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  [x: string]: any
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, value, checked, onChange, disabled, className, ...rest }, ref) => {
    return (
      <div className={`flex items-center ${className}`}>
        <input
          id={value}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          className="hidden"
          {...rest} // rest에 name 포함
        />
        <label
          htmlFor={value}
          className={`flex cursor-pointer items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <span className="flex-no-shrink mr-2 inline-block">
            <Image
              src={checked ? '/assets/icons/Radio_selected.svg' : '/assets/icons/Radio_unselected.svg'} // 이미지 경로 수정
              alt={checked ? 'Selected' : 'Unselected'}
              width={16}
              height={16}
            />
          </span>
          {label}
        </label>
      </div>
    )
  },
)

Radio.displayName = 'RadioComponent'

export default Radio

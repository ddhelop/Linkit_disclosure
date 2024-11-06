// src/shared/ui/Radio/Radio.tsx
'use client'

interface RadioOption {
  label: string
  value: string
}

interface RadioProps {
  options: RadioOption[]
  selectedValue: string
  onChange: (value: string) => void
  labelClassName?: string // 추가: 라벨의 스타일을 지정할 수 있는 클래스 이름
}

const Radio: React.FC<RadioProps> = ({ options, selectedValue, onChange, labelClassName = '' }) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value} className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="custom-radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
              selectedValue === option.value ? 'border-main bg-white' : 'border-grey40'
            }`}
          >
            {selectedValue === option.value && <span className="h-2.5 w-2.5 rounded-full bg-main" />}
          </span>
          <span className={` ${labelClassName}`}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default Radio

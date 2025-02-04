'use client'

import Image from 'next/image'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  className?: string
  labelClassName?: string
  infoTooltip?: string
}

const Checkbox = ({ checked, onChange, label, className = '', labelClassName = '', infoTooltip }: CheckboxProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} onClick={onChange}>
      <div
        className={`cursor-pointer rounded-[0.32rem] border p-[0.32rem] ${
          checked ? 'bg-[#D3E1FE]' : 'border-grey40 bg-grey20'
        }`}
      >
        <Image
          src={`/common/icons/${checked ? 'btn_blue_check.svg' : 'btn_check.svg'}`}
          width={13}
          height={13}
          alt="check-icon"
        />
      </div>
      {label && <span className={`cursor-pointer ${labelClassName}`}>{label}</span>}
      {infoTooltip && (
        <div className="group relative">
          <Image
            src="/common/icons/info.svg"
            alt="info"
            width={16}
            height={16}
            className="cursor-pointer text-grey80"
          />
          <div
            className="absolute left-20 top-[calc(100%+0.5rem)] hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-grey30 bg-white p-3 text-xs text-grey70 group-hover:block"
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          >
            {infoTooltip}
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkbox

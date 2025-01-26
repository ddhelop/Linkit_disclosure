import Image from 'next/image'

interface MessageCheckboxProps {
  isChecked: boolean
  onChange: () => void
}

export default function MessageCheckbox({ isChecked, onChange }: MessageCheckboxProps) {
  return (
    <div onClick={onChange} className="cursor-pointer">
      <Image
        src={isChecked ? '/common/icons/checked.svg' : '/common/icons/empty_check.svg'}
        alt="checkbox"
        width={20}
        height={20}
      />
    </div>
  )
}

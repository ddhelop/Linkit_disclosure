import Image from 'next/image'

interface TooltipProps {
  text: string | string[]
  className?: string
}

export default function Tooltip({ text, className = '' }: TooltipProps) {
  const renderText = () => {
    if (Array.isArray(text)) {
      return text.map((line, i) => (
        <span key={i}>
          {line}
          {i !== text.length - 1 && <br />}
        </span>
      ))
    }
    return text
  }

  return (
    <div className="group relative ml-2">
      <Image src="/common/icons/info.svg" alt="info" width={16} height={16} className="cursor-pointer text-grey80" />
      <div
        className={`absolute left-44 top-[-12px] hidden -translate-x-1/2 rounded-lg border border-grey30 bg-white p-3 text-xs text-grey70 group-hover:block ${className}`}
        style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
      >
        {renderText()}
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

interface MenuItem {
  text: string
  onClick: () => void
  textColor?: string
}

interface DropdownMenuProps {
  items: MenuItem[]
  triggerIcon?: string
}

export default function DropdownMenu({ items, triggerIcon = '/common/icons/more_row.svg' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setIsOpen(false),
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleItemClick = (e: React.MouseEvent, onClick: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={handleClick} className="cursor-pointer">
        <Image src={triggerIcon} width={22} height={22} alt="menu" />
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="right-3-0 absolute top-8 z-50 min-w-[120px] rounded-lg border border-grey30 bg-white py-2 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => handleItemClick(e, item.onClick)}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-grey10"
              style={{ color: item.textColor }}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

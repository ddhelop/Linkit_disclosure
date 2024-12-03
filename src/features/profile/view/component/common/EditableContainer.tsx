import Image from 'next/image'
import Link from 'next/link'

interface EditableContainerProps {
  children: React.ReactNode
  isEditable?: boolean
  editPath?: string
  className?: string
}

export function EditableContainer({ children, isEditable = false, editPath, className = '' }: EditableContainerProps) {
  return (
    <div className={`group/container relative ${className}`}>
      {isEditable && editPath && (
        <Link
          href={editPath}
          className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover/container:opacity-100"
        >
          <Image src={'/common/icons/editable.svg'} alt="edit" width={32} height={32} className="" />
        </Link>
      )}
      {children}
    </div>
  )
}

// PopUpAlertModal.tsx
'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'

interface PopUpAlertModalProps {
  isOpen: boolean
  onClose: () => void
  text: string
}

export default function PopUpAlertModal({ isOpen, onClose, text }: PopUpAlertModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content')
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="modal-content w-[20rem] rounded-lg bg-white p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <div className="flex justify-center">
          <Image src="/assets/icons/gray-warning.svg" width={35} height={35} alt="alert" className="rounded-full" />
        </div>
        <div className="flex justify-center pt-3">
          <h2 className="font-semibold text-grey100">{text}</h2>
        </div>
        <div className="mt-7 flex w-full justify-center">
          <button className="mr-2 w-full rounded bg-grey30 px-10 py-3 text-grey90" onClick={onClose}>
            확인
          </button>
        </div>
      </motion.div>
    </div>
  )
}

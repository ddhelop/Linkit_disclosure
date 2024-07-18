'use client'
import Image from 'next/image'
import { useEffect } from 'react'

interface RequestMatchModalProps {
  onClose: () => void
}

export default function RequestMatchModal({ onClose }: RequestMatchModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000] bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="flex w-[40rem] flex-col  justify-between rounded-lg bg-[#fff] px-[3.12rem] py-5 shadow-lg">
        <div className="flex justify-center">
          <h2 className="mb-4 font-semibold">Somewon Yoon에게 매칭 요청 보내기</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Image
              src="/assets/images/DefaultProfile.png"
              width={42}
              height={42}
              alt="profile"
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">Somewon Yoon</p>
              <p className="text-sm text-grey70">기획·경영</p>
            </div>
          </div>
        </div>

        <textarea className="mt-4 h-40 w-full resize-none rounded-xl bg-grey20 p-5 text-sm text-grey90 outline-none" />

        <div className="mt-6 flex w-full justify-end gap-2">
          <button className="rounded bg-grey20 px-8 py-2 text-grey60" onClick={onClose}>
            취소
          </button>
          <button className="rounded bg-[#2563EB] px-8 py-2 text-sm text-[#fff]">전송</button>
        </div>
      </div>
    </div>
  )
}

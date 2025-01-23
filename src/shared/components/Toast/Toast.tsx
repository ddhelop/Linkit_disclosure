'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '@/shared/hooks/usePortal'
import { useToastStore } from '@/shared/store/toastStore'
import Image from 'next/image'

export default function Toast() {
  const portal = usePortal('toast-root')
  const { toastList, removeToast } = useToastStore()

  useEffect(() => {
    if (toastList.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toastList[0].id)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastList, removeToast])

  if (!portal) return null

  return createPortal(
    <div className="fixed bottom-8 left-0 right-0 z-[9999] mx-auto flex flex-col items-center gap-2">
      {toastList.map((toast) => (
        <div
          style={{
            boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, 0.20)',
          }}
          key={toast.id}
          className="animate-slideUp flex items-center gap-2 rounded-[2.5rem] bg-white px-11 py-4 text-sm font-semibold text-grey80 "
        >
          <Image
            src={toast.type === 'success' ? '/common/icons/toast_success.svg' : '/common/icons/toast_alert.svg'}
            width={20}
            height={20}
            alt={toast.type}
          />
          {toast.message}
        </div>
      ))}
    </div>,
    portal,
  )
}

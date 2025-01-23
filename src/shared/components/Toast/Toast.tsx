'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '@/shared/hooks/usePortal'
import { useToastStore } from '@/shared/store/toastStore'

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
          key={toast.id}
          className={`animate-slideUp rounded-lg px-4 py-3 text-white shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : toast.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    portal,
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface NotificationMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface NotificationItem {
  id: number
  title: string
  time: string
  isRead: boolean
}

export default function NotificationMenu({ isOpen, onClose }: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  // 임시 알림 데이터
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: '상대방님의 매칭 요청',
      time: '1시간 전',
      isRead: false,
    },
    {
      id: 2,
      title: '상대방님과 매칭 성사!',
      time: '3시간 전',
      isRead: false,
    },
    {
      id: 3,
      title: '상대방님의 새로운 메시지',
      time: '하루 전',
      isRead: true,
    },
  ]

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-12 z-50 max-h-[25.8rem] w-[23.3rem] rounded-xl border border-grey30 bg-white py-3 shadow-lg "
    >
      <div className="flex flex-col">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex cursor-pointer items-center gap-4 rounded-lg px-7 py-5 hover:bg-grey20 ${
              !notification.isRead ? 'bg-[#EDF3FF]' : ''
            }`}
          >
            <div className="h-10 w-10 flex-shrink-0">
              <Image src="/common/default_profile.svg" alt="profile" width={40} height={40} className="rounded-full" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-grey90">{notification.title}</span>
              <span className="text-xs text-grey60">{notification.time}</span>
            </div>
            {!notification.isRead && <div className="h-2 w-2 rounded-full bg-main" />}
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import useNotificationStore from '@/shared/store/useNotificationStore'
import Image from 'next/image'

interface NotificationMenuProps {
  isOpen: boolean
  onClose: () => void
  emailId: string
}

interface NotificationItem {
  id: number
  title: string
  time: string
  isRead: boolean
}

export default function NotificationMenu({ isOpen, onClose, emailId }: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)
  const { getClient } = useWebSocketStore()
  // const { notifications, setNotifications } = useNotificationListStore()

  useOnClickOutside({
    refs: [menuRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  // 메뉴가 열릴 때 구독 시작
  useEffect(() => {
    if (!isOpen || !emailId) return

    const client = getClient()
    if (!client?.connected) return

    // 알림 목록 초기화 API 호출 (필요한 경우)
    // fetchNotifications(emailId)

    // 실시간 알림 구독
    subscriptionRef.current = client.subscribe(`/sub/notification/${emailId}`, (message) => {
      const notification = JSON.parse(message.body)
      console.log('New notification:', notification)
      // setNotifications([notification, ...notifications])
    })

    return () => {
      // 메뉴가 닫힐 때 구독 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [isOpen, emailId])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-12 z-50 max-h-[25.8rem] w-[23.3rem] rounded-xl border border-grey30 bg-white py-3 shadow-lg"
    >
      {/* <div className="flex flex-col">
        {notifications.map((notification, index) => (
          <div
            key={index}
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
      </div> */}
    </div>
  )
}

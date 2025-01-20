'use client'

import { useEffect, useRef, useState } from 'react'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'
import { NotificationItem } from '../types/notificationsType'

// Mock 데이터 정의
const mockNotifications: NotificationItem[] = [
  {
    notificationType: 'TEAM_INVITATION',
    subNotificationType: 'TEAM_INVITATION_REQUESTED',
    notificationReadStatus: 'READ',
    notificationOccurTime: '방금 전',
    notificationDetails: {
      teamName: '초대된 팀 이름',
    },
  },
  {
    notificationType: 'CHATTING',
    subNotificationType: 'NEW_CHAT',
    notificationReadStatus: 'UNREAD',
    notificationOccurTime: '10분 전',
    notificationDetails: {
      chatSenderName: '채팅 발신자 이름',
    },
  },
  {
    notificationType: 'CHATTING',
    subNotificationType: 'NEW_CHAT',
    notificationReadStatus: 'READ',
    notificationOccurTime: '1시간 전',
    notificationDetails: {
      chatSenderName: '채팅 발신자 이름',
    },
  },
]

interface NotificationMenuProps {
  isOpen: boolean
  onClose: () => void
  emailId: string
}

export default function NotificationMenu({ isOpen, onClose, emailId }: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)
  const { getClient } = useWebSocketStore()
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)

  useOnClickOutside({
    refs: [menuRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  useEffect(() => {
    if (!isOpen || !emailId) return

    const client = getClient()
    if (!client?.connected) return

    // 실시간 알림 구독
    subscriptionRef.current = client.subscribe(`/sub/notification/${emailId}`, (message) => {
      const notification = JSON.parse(message.body)
      console.log('New notification:', notification)
      setNotifications((prev) => [notification, ...prev])
    })

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [isOpen, emailId, getClient])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-12 z-50 max-h-[25.8rem] w-[23.3rem] rounded-xl border border-grey30 bg-white py-3 shadow-lg"
    >
      <div className="flex flex-col">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`flex cursor-pointer items-center gap-4 rounded-lg px-7 py-5 hover:bg-grey20 ${
              notification.notificationReadStatus === 'UNREAD' ? 'bg-[#EDF3FF]' : ''
            }`}
          >
            <div className="h-10 w-10 flex-shrink-0">
              <Image src="/common/default_profile.svg" alt="profile" width={40} height={40} className="rounded-full" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-grey90">
                {notification.notificationType === 'CHATTING' && notification.notificationDetails.chatSenderName
                  ? `${notification.notificationDetails.chatSenderName}님이 메시지를 보냈습니다.`
                  : notification.notificationDetails.teamName}
              </span>
              <span className="text-xs text-grey60">{notification.notificationOccurTime}</span>
            </div>
            {notification.notificationReadStatus === 'UNREAD' && <div className="h-2 w-2 rounded-full bg-main" />}
          </div>
        ))}
      </div>
    </div>
  )
}

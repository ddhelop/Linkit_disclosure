'use client'

import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'
import { NotificationItem } from '../types/notificationsType'
import { getNotificationList, readNotification } from '../api/NotificationApi'
import { getNotificationMessage } from '../utils/notificationMessage'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { useQueryClient } from '@tanstack/react-query'

interface NotificationMenuProps {
  isOpen: boolean
  onClose: () => void
  emailId: string
}

export default function NotificationMenu({ isOpen, onClose, emailId }: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()

  useOnClickOutside({
    refs: [menuRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  // 이전 알림 목록 조회 및 웹소켓 구독
  useEffect(() => {
    // 메뉴가 열릴 때만 알림 목록 조회
    if (!isOpen) return

    // 이전 알림 목록 조회
    const fetchNotifications = async () => {
      try {
        const response = await getNotificationList()
        // response.result가 배열인지 확인하고 설정
        if (Array.isArray(response.result.notificationItems)) {
          setNotifications(response.result.notificationItems)
        } else {
          console.error('Notifications data is not an array:', response)
          setNotifications([])
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
        setNotifications([])
      }
    }
    fetchNotifications()
  }, [isOpen])

  const handleNotificationClick = async (notification: NotificationItem) => {
    try {
      // 알림 읽음 처리 API 호출
      await readNotification(notification.notificationId)

      // 알림 읽음 처리 후 알림 카운트 감소
      queryClient.setQueryData(['unreadCounts', emailId], (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          result: {
            ...oldData.result,
            unreadNotificationCount: Math.max(oldData.result.unreadNotificationCount - 1, 0),
          },
        }
      })

      // 라우팅 처리
      switch (notification.notificationType) {
        case 'MATCHING':
          router.push('/match/inbox')
          break
        case 'CHATTING':
          router.push('/chat')
          break
        case 'TEAM':
        case 'TEAM_INVITATION':
          if (notification.notificationDetails.isTeamDeleted) {
            toast.alert('삭제된 팀입니다.')
            break
          }
          if (notification.notificationDetails.teamCode) {
            router.push(`/team/${notification.notificationDetails.teamCode}/log`)
          }
          break
        case 'SYSTEM':
          if (notification.subNotificationType === 'WELCOME_LINKIT') {
            router.push('/profile/edit/basic')
          }
          break
        case 'CERTIFICATION':
          switch (notification.subNotificationType) {
            case 'ACTIVITY_CERTIFICATION_ACCEPTED':
              router.push('/profile/edit/activity')
              break
            case 'EDUCATION_CERTIFICATION_ACCEPTED':
              router.push('/profile/edit/education')
              break
            case 'AWARDS_CERTIFICATION_ACCEPTED':
              router.push('/profile/edit/awards')
              break
            case 'LICENSE_CERTIFICATION_ACCEPTED':
              router.push('/profile/edit/license')
              break
          }
          break
        case 'VISITOR':
          if (notification.notificationDetails.visitedType === 'PROFILE') {
            router.push(`/profile/${notification.notificationDetails.emailId}`)
          } else if (notification.notificationDetails.visitedType === 'TEAM') {
            router.push(`/team/${notification.notificationDetails.teamCode}/log`)
          }
          break
        default:
      }
      onClose()
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 bg-white sm:absolute sm:inset-auto sm:right-0 sm:top-12 sm:w-[23.3rem] sm:rounded-xl sm:border sm:border-grey30 sm:bg-white sm:shadow-lg"
    >
      <div className="flex h-full flex-col sm:h-auto">
        <div className="flex items-center justify-between border-b p-4 sm:hidden">
          <span className="text-lg font-semibold">알림</span>
          <button onClick={onClose}>
            <Image src="/common/icons/delete_icon.svg" width={24} height={24} alt="close" />
          </button>
        </div>
        <div className="h-full overflow-y-auto sm:max-h-[24rem]">
          <div className="flex flex-col py-3">
            {notifications && notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex cursor-pointer items-center gap-4  px-7 py-5 hover:bg-grey20 ${
                    notification.notificationReadStatus === 'UNREAD' ? 'bg-[#EDF3FF]' : ''
                  }`}
                >
                  {!['SYSTEM', 'VISITOR', 'CERTIFICATION'].includes(notification.notificationType) && (
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={
                          notification.notificationDetails.matchingTargetLogoImagePath ||
                          notification.notificationDetails.teamLogoImagePath ||
                          '/common/default_profile.svg'
                        }
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-grey90">
                      {getNotificationMessage(
                        notification.notificationType,
                        notification.subNotificationType,
                        notification.notificationDetails,
                      )}
                    </span>
                    <span className="text-xs text-grey60">{notification.notificationOccurTime}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8 text-sm text-grey60">알림이 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

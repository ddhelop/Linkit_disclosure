'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProfileMenu from './ProfileMenu'
import NotificationMenu from './NotificationMenu'
import useNotificationStore from '@/shared/store/useNotificationStore'
import { useAuthStore } from '@/shared/store/useAuthStore'
import useNotificationSubscription from '@/shared/components/webSocket/useNotificationSubscription'

interface UserMenuProps {
  isModalOpen: boolean
  toggleModal: () => void
}

export default function UserMenu({ isModalOpen, toggleModal }: UserMenuProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { emailId } = useAuthStore()
  const unreadChatCount = useNotificationStore((state) => state.unreadChatCount)
  const unreadNotificationCount = useNotificationStore((state) => state.unreadNotificationCount)
  useNotificationSubscription(emailId || '')

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  return (
    <div className="relative hidden gap-[2rem] md:flex">
      <div className="flex gap-5">
        <Link href="/chat">
          <div className="relative flex cursor-pointer items-center">
            <Image src={'/common/icons/chat_circle.svg'} width={32} height={32} alt="chat" />
            {unreadChatCount > 0 && <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></div>}
          </div>
        </Link>
        <div className="relative">
          <div className="flex cursor-pointer items-center" onClick={toggleNotification}>
            <Image src={'/common/icons/alarm_circle.svg'} width={32} height={32} alt="notification" />
            {unreadNotificationCount > 0 && (
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></div>
            )}
          </div>
          <NotificationMenu
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            emailId={emailId || ''}
          />
        </div>
      </div>

      <button
        className="toggle-button flex items-center rounded-[1.38rem] py-[0.38rem] pr-[1.62rem]"
        onClick={toggleModal}
      >
        <p>마이페이지</p>
        <Image
          src={isModalOpen ? '/common/icons/up_arrow.svg' : '/common/icons/under_arrow.svg'}
          width={24}
          height={24}
          alt="arrow"
        />
      </button>

      {isModalOpen && <ProfileMenu />}
    </div>
  )
}

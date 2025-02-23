'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import ProfileMenu from './ProfileMenu'
import NotificationMenu from './NotificationMenu'
import useNotificationStore from '@/shared/store/useNotificationStore'
import { useAuthStore } from '@/shared/store/useAuthStore'
import useNotificationSubscription from '@/shared/components/webSocket/useNotificationSubscription'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import ChatButton from './IconButtons/ChatButton'
import NotificationButton from './IconButtons/NotificationButton'

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { emailId } = useAuthStore()
  const unreadChatCount = useNotificationStore((state) => state.unreadChatCount)
  const unreadNotificationCount = useNotificationStore((state) => state.unreadNotificationCount)
  useNotificationSubscription(emailId || '')

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setIsModalOpen(false),
    isEnabled: true,
  })

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  return (
    <div className="flex items-center gap-[2rem]">
      <div className="flex gap-5">
        <ChatButton />
        <NotificationButton emailId={emailId || ''} />
      </div>

      <div className="relative w-[6.5rem]">
        <button
          ref={buttonRef}
          className="flex w-full items-center justify-between whitespace-nowrap rounded-[1.38rem] px-4 py-[0.38rem]"
          onClick={toggleModal}
        >
          <span className="font-medium text-grey80">마이페이지</span>
          <Image
            src={isModalOpen ? '/common/icons/up_arrow.svg' : '/common/icons/under_arrow.svg'}
            width={24}
            height={24}
            alt="arrow"
          />
        </button>

        {isModalOpen && (
          <div ref={menuRef}>
            <ProfileMenu onClose={() => setIsModalOpen(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

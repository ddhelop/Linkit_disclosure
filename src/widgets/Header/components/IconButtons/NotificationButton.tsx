'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NotificationMenu from '../NotificationMenu'

interface NotificationButtonProps {
  emailId: string
  unreadNotificationCount: number
}

export default function NotificationButton({ emailId, unreadNotificationCount }: NotificationButtonProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  return (
    <div className="relative">
      <div className="flex cursor-pointer items-center" onClick={toggleNotification}>
        <Image src={'/common/icons/alarm_circle.svg'} width={32} height={32} alt="notification" />
        {unreadNotificationCount > 0 && <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />}
      </div>
      <NotificationMenu isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} emailId={emailId} />
    </div>
  )
}

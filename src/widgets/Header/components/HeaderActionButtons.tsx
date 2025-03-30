'use client'

import { useQuery } from '@tanstack/react-query'
import ChatButton from './IconButtons/ChatButton'
import NotificationButton from './IconButtons/NotificationButton'
import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

interface HeaderActionButtonsProps {
  emailId: string
}

export async function getUnreadCounts(): Promise<
  ApiResponse<{ unreadChatCount: number; unreadNotificationCount: number }>
> {
  return await fetchWithCSR(`/notification/header`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function HeaderActionButtons({ emailId }: HeaderActionButtonsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['unreadCounts', emailId],
    staleTime: 12000,
    refetchInterval: 12000,
    queryFn: () => getUnreadCounts(),
    refetchIntervalInBackground: false, // 백그라운드에서 리패치 방지
    refetchOnWindowFocus: true,
  })

  const unreadChatCount = data?.result.unreadChatCount || 0
  const unreadNotificationCount = data?.result.unreadNotificationCount || 0

  return (
    <div className=" hidden gap-3 md:flex">
      <ChatButton unreadChatCount={unreadChatCount} />
      <NotificationButton emailId={emailId} unreadNotificationCount={unreadNotificationCount} />
    </div>
  )
}

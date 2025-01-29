import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { leaveChatRoom } from '../api/ChatApi'
import Image from 'next/image'
import { ChatBasicProfileProps } from '../types/ChatTypes'
import DropdownMenu from '@/shared/components/DropdownMenu'
import AlertModal from '@/shared/ui/Modal/AlertModal'

interface ChattingBasicProfileProps extends ChatBasicProfileProps {
  chatRoomId: number
}

export default function ChattingBasicProfile({
  chatRoomId,
  chatPartnerName,
  chatPartnerImageUrl,
  majorPosition,
  cityName,
  divisionName,
  chatPartnerOnline,
}: ChattingBasicProfileProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleLeaveChatRoom = async () => {
    try {
      const response = await leaveChatRoom(chatRoomId)
      if (response.isSuccess) {
        toast.success('채팅방을 나갔습니다.')
        router.push('/chat')
      } else {
        toast.alert(response.message || '채팅방 나가기에 실패했습니다.')
      }
    } catch (error) {
      toast.alert('채팅방 나가기에 실패했습니다.')
    }
    setIsAlertOpen(false)
  }

  const menuItems = [
    {
      text: '채팅방 나가기',
      onClick: () => setIsAlertOpen(true),
      textColor: '#FF4343',
    },
  ]

  return (
    <>
      <div className="flex w-full gap-4 rounded-xl bg-white px-[1.88rem] py-3">
        <div className="relative h-[70px] w-[80px] rounded-lg">
          <Image
            src={chatPartnerImageUrl || '/common/default_profile.svg'}
            alt="Profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <span className="text-lg font-semibold text-grey90">{chatPartnerName}</span>
              {chatPartnerOnline && (
                <span className="flex items-center gap-1">
                  <Image src={'/common/icons/blue_circle.svg'} width={6} height={6} alt="circle" />
                  <span className="text-xs text-[#4D82F3]">온라인</span>
                </span>
              )}
            </div>
            <div className="flex gap-2 text-xs text-grey60">
              <span className="text-grey50">포지션 |</span>
              <span className="text-grey70">{majorPosition}</span>
            </div>
            <div className="flex gap-2 text-xs text-grey60">
              <span className="text-grey50">지역 |</span>
              <span className="text-grey70">
                {cityName} {divisionName}
              </span>
            </div>
          </div>
          <DropdownMenu items={menuItems} />
        </div>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        title="채팅방을 나갈까요?"
        description="채팅방에 속한 모든 메시지는 삭제되며&#13;이전 대화 내용을 되돌릴 수 없어요."
        cancelText="취소"
        confirmText="나가기"
        onCancel={() => setIsAlertOpen(false)}
        onConfirm={handleLeaveChatRoom}
      />
    </>
  )
}

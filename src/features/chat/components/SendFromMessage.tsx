import Image from 'next/image'
import { ChatMessage } from '../types/ChatTypes'

interface SendFromMessageProps {
  message: ChatMessage
}

export default function SendFromMessage({ message }: SendFromMessageProps) {
  return (
    <>
      {/* 상대방이 보낸 메세지 */}
      <div className="mb-4 flex gap-3">
        <Image
          src="/common/default_profile.svg" // 실제 프로필 이미지 경로로 수정 필요
          alt="프로필 이미지"
          width={48}
          height={48}
          className="h-12 w-12 rounded-lg object-cover"
        />
        <div className="flex items-end gap-1">
          <div className="max-w-[87%] rounded-2xl bg-[#fcfcfd] p-5">
            <p className="text-sm text-grey80">
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            </p>
          </div>
          <span className="mt-1 text-xs font-normal text-grey60">00:00</span>
        </div>
      </div>
    </>
  )
}

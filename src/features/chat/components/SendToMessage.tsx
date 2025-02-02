import Image from 'next/image'
import { ChatMessage } from '../types/ChatTypes'

interface SendToMessageProps {
  message: ChatMessage
}

export default function SendToMessage({ message }: SendToMessageProps) {
  return (
    <div className="mb-4 flex w-full justify-end gap-3">
      <div className="flex items-end justify-end gap-1">
        <span className="mt-1 text-xs text-grey60">
          {new Date(message.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <div className="max-w-[87%] rounded-2xl bg-grey30 p-5">
          <p className="whitespace-pre-wrap text-sm text-grey80">{message.content}</p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="relative h-[48px] w-[48px] rounded-lg">
          <Image
            src={message.messageSenderLogoImagePath}
            alt="프로필 이미지"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}

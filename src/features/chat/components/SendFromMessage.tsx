import Image from 'next/image'
import { ChatMessage } from '../types/ChatTypes'

interface SendFromMessageProps {
  message: ChatMessage
}

export default function SendFromMessage({ message }: SendFromMessageProps) {
  return (
    <div className="mb-4 flex gap-3">
      <Image
        src={message.messageSenderLogoImagePath || '/common/default_profile.svg'}
        alt="프로필 이미지"
        width={48}
        height={48}
        className="h-12 w-12 rounded-lg object-cover"
      />
      <div className="flex items-end gap-1">
        <div className="max-w-[87%] rounded-2xl bg-[#fcfcfd] p-5">
          <p className="text-sm text-grey80">{message.content}</p>
        </div>
        <span className="mt-1 text-xs font-normal text-grey60">
          {new Date(message.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

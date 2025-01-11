import ChattingList from '@/features/chat/components/ChattingList'
import ChattingRoom from '@/features/chat/components/ChattingRoom'
export default function ChatPage() {
  return (
    <div className="flex justify-center gap-[2.12rem] pt-[3.63rem]">
      <ChattingList />

      <ChattingRoom />
    </div>
  )
}

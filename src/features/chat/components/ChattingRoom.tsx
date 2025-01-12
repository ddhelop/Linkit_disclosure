import ChattingBasicProfile from './ChattingBasicProfile'
import ChattingInput from './ChattingInput'
import SendFromMessage from './SendFromMessage'
import SendToMessage from './SendToMessage'

export default function ChattingRoom() {
  return (
    <div className="flex flex-col">
      <div
        className="flex w-[48rem] flex-col rounded-t-[1.25rem] bg-grey10 px-5 py-6"
        style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
      >
        <ChattingBasicProfile />

        {/* 날짜 구분선 */}
        <div className="my-6 flex items-center">
          <div className="h-[1px] flex-1 bg-grey50"></div>
          <span className="mx-4 text-sm text-grey60">2025년 01월 01일</span>
          <div className="h-[1px] flex-1 bg-grey50"></div>
        </div>

        {/* 채팅 내용 */}
        <div className="flex flex-col gap-6">
          <SendFromMessage />
          <SendToMessage />
        </div>
      </div>
      {/* 채팅입력창 */}
      <div>
        <ChattingInput />
      </div>
    </div>
  )
}

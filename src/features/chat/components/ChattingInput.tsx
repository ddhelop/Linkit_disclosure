export default function ChattingInput() {
  return (
    <form className="flex flex-col bg-white p-5">
      <textarea
        className="resize-none rounded-xl border border-grey40 px-7 py-5 outline-none"
        placeholder="메세지를 입력해주세요."
      />

      <div className="mt-5 flex justify-end">
        <button className="rounded-[0.63rem] bg-[#3774F4] px-6 py-2 font-semibold text-[#fcfcfd]">보내기</button>
      </div>
    </form>
  )
}

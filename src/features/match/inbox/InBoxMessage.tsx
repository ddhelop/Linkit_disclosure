import Image from 'next/image'

export default function InBoxMessage() {
  return (
    <div className="flex gap-3">
      <Image src="/common/icons/empty_check.svg" alt="inbox-message" width={20} height={20} />
      <div className="relative flex w-full cursor-pointer gap-5 rounded-xl border border-grey30 px-10 py-7 hover:bg-[#EDF3FF]">
        <Image src="/common/default_profile.svg" alt="default-profile" width={64} height={64} />
        <div className="flex flex-col justify-center">
          <span className="text-lg font-semibold text-grey80">상대방님의 매칭 요청</span>
          <span className="text-sm font-normal text-grey70">
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용...
          </span>
        </div>

        <span className="absolute right-6 top-6 text-xs font-normal text-grey80">팀이름1 · 3일 전</span>
      </div>
    </div>
  )
}

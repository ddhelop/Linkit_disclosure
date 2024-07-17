import Link from 'next/link'

export default function MatchNavigation() {
  return (
    <div className="mt-[9.5rem] flex w-[13.75rem] flex-col rounded-2xl bg-[#fff] shadow-sm">
      <Link href={'/match/from'} className="cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10">
        내가 받은 매칭
      </Link>
      <Link href="/match/to" className="cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10">
        내가 보낸 매칭
      </Link>
      <Link href="/match/accomplish" className="cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10">
        성사된 매칭
      </Link>
      <Link href="/match/save" className="cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10">
        찜한 내역
      </Link>
    </div>
  )
}

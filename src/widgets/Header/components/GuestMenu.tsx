'use client'

import Link from 'next/link'

export default function GuestMenu() {
  return (
    <div className="hidden items-center gap-[1.38rem] font-normal md:flex">
      <Link className="px-4 text-grey50 hover:text-black" href="">
        ABOUT US
      </Link>
      <Link className="px-4 text-grey50 hover:text-black" href="">
        FAQ
      </Link>
      <Link href="/login">
        <button className="rounded-[1.38rem] bg-[#4D82F3] px-[1.62rem] py-[0.38rem] font-semibold text-white transition-colors duration-100 hover:bg-main hover:text-white hover:ring-4">
          로그인
        </button>
      </Link>
    </div>
  )
}

import Link from 'next/link'
import { useState } from 'react'

export default function LoggedInLanding1() {
  return (
    <div
      // style={{ backgroundImage: 'url("/assets/intro/section3bg.png")' }}
      className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat"
    >
      <div className="pt-[6.56rem]">
        <h1 className="text-center text-[3.375rem] font-bold text-main">
          성공적인 팀을 이루는
          <br /> 가장 쉬운 방법,
        </h1>
        <p className="pt-4 text-[1.1875rem] text-grey70">
          지금 바로 내 이력서/팀 소개서를 등록하고 성공적인 팀빌딩을 시작하세요!
        </p>
      </div>

      <div className="mt-[4rem] flex w-full justify-center gap-[0.88rem]">
        <div className="flex w-[25rem] flex-col gap-1 rounded-2xl border border-grey30 bg-white px-[1.69rem] py-5 shadow-md">
          <p className="text-[2rem]">👋</p>
          <p className="text-2xl font-bold text-grey100">내 이력서 등록하기</p>
          <p className="text-grey60">뛰어난 팀 안에서 내 역량을 발휘하고 싶어요</p>

          <div className="mt-5 flex w-full justify-end">
            <Link href="/myResume">
              <button className="flex gap-[1.27rem] rounded-[0.31rem] bg-[#282C31] px-[1.41rem] py-[0.92rem] text-white">
                <p>내 이력서 바로가기</p>
                <p className="rounded-full bg-black px-2">+</p>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-[25rem] flex-col gap-1 rounded-2xl border border-grey30 bg-white px-[1.69rem] py-5 shadow-md">
          <p className="text-[2rem]">🚀</p>
          <p className="text-2xl font-bold text-grey100">팀 소개서 등록하기</p>
          <p className="text-grey60">우리 팀에 필요한 역량을 가진 멤버를 구하고 싶어요</p>

          <div className="mt-5 flex w-full justify-end">
            <Link href="/TeamResume">
              <button className="flex gap-[1.27rem] rounded-[0.31rem] bg-[#282C31] px-[1.41rem] py-[0.92rem] text-white">
                <p> 팀 소개서 바로가기</p>
                <p className="rounded-full bg-black px-2">+</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

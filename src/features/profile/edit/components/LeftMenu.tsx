// LeftMenu.tsx
import Image from 'next/image'
import React from 'react'

const LeftMenu = () => {
  return (
    <div className="mt-12 w-[17.5rem]">
      {/* 나의 로그 */}
      <div className="flex cursor-pointer flex-col rounded-xl border border-[#7EA5F8] bg-grey20 py-3 pl-6 pr-3 hover:ring-4 hover:ring-grey40 hover:brightness-95">
        <div className="flex justify-between">
          <h2 className="text-main">나의 로그</h2>
          <Image src="/common/icons/right_arrow_grey60.svg" width={24} height={24} alt="arrow-right" />
        </div>

        <span className="mt-2 text-xs font-normal leading-5 text-grey60">
          나의 로그에서는 나를 기록하고 소개할 수 있어요.
          <br /> 다른 사람들에게 나를 어필해 보세요!
        </span>
      </div>

      <h2 className="mb-4 text-lg font-semibold">프로필 관리</h2>
      <ul className="space-y-2">
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">
            미니 프로필
          </button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">보유 스킬</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">이력</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">프로필요</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">학력</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">수상</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">자격증</button>
        </li>
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">링크</button>
        </li>
      </ul>
      <h2 className="mb-4 mt-6 text-lg font-semibold">계정 관리</h2>
      <ul className="space-y-2">
        <li>
          <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100 focus:outline-none">계정 설정</button>
        </li>
      </ul>
    </div>
  )
}

export default LeftMenu

// LeftMenu.tsx
import Image from 'next/image'
import React from 'react'

const menuItems = ['미니 프로필', '보유 스킬', '이력', '포트폴리오', '학력', '수상', '자격증', '링크']

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

      {/* 왼쪽 메뉴바 - 프로필 관리*/}
      <div className="mt-5 flex w-full flex-col">
        <label className="rounded-xl bg-grey20 px-6 py-3">프로필 관리</label>
        <ul className="flex w-full flex-col items-end gap-1 pl-3 pr-6 pt-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mt-2 flex w-[90%] cursor-pointer items-center justify-between rounded-lg py-[0.31rem] pl-2 pr-2 hover:bg-grey20"
            >
              <span className="text-grey80">{item}</span>
              <div className="ml-2 h-[1.25rem] w-[1.25rem] rounded-full border border-grey40"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* 왼쪽 메뉴바 - 계정 설정 */}
      <div className="mt-5 flex w-full flex-col">
        <label className="rounded-xl bg-grey20 px-6 py-3">계정 관리</label>
        <ul className="flex w-full flex-col items-end gap-1 pt-3">
          <li className="mt-2 flex w-[90%] cursor-pointer items-center justify-between py-[0.31rem] pl-5 pr-8 ">
            <span className="text-grey80 hover:text-main">계정 설정</span>
            <div className="ml-2 hidden h-[1.25rem] w-[1.25rem] rounded-full border border-grey40"></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LeftMenu

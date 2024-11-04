// LeftMenu.tsx
import React from 'react'

const LeftMenu = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
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

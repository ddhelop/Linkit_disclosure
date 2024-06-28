'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function TeamMember() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleEditClick = () => {
    setIsFormVisible(true)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀원 공고</span>
      </div>

      <div className="mt-[0.94rem] flex items-center justify-between border border-grey30 p-5">
        <div className="flex flex-col">
          <p className="text-sm text-grey60">(주)링킷</p>
          <p className="pt-[0.44rem]">주서영 | CEO</p>
          <div className="flex pt-[0.44rem]">
            <div className="text-sm text-grey60">자기소개</div>
          </div>
        </div>
        <div className="flex">
          <Image src="/assets/icons/pencil.svg" width={27} height={27} alt="edit" className="cursor-pointer" />
          <Image src="/assets/icons/delete.svg" width={27} height={27} alt="delete" className="cursor-pointer" />
        </div>
      </div>

      {isFormVisible && (
        <div className="mt-[1.56rem] flex w-full flex-col gap-[0.81rem] rounded-2xl border border-[#2563EB] p-6">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-normal text-grey100">이름 *</label>
              <input
                type="text"
                className="mt-2 rounded-md border border-grey50 px-[0.88rem] py-[0.25rem] shadow-sm placeholder:text-sm focus:outline-none"
                placeholder="예: 주서영"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-grey100">직무/역할 *</label>
              <input
                type="text"
                className="mt-2 rounded-md border border-grey50 px-[0.88rem] py-[0.25rem] shadow-sm placeholder:text-sm focus:outline-none"
                placeholder="예: 마케팅"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-grey100">팀원 소개 *</label>
            <textarea
              className="mt-1 block w-full resize-none rounded-md border border-grey50 p-[0.62rem] shadow-sm focus:outline-none "
              rows={3}
              placeholder="예시: 어쩌고 저쩌고 어쩌고 저쩌고"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button className="rounded bg-[#2563EB] px-4 py-2 text-[#fff]">수정완료</button>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end pb-4">
        <button onClick={handleEditClick} className="rounded bg-[#2563EB] px-4 py-2 text-[#fff]">
          수정하기
        </button>
      </div>
    </div>
  )
}

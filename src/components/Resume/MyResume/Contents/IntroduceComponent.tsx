'use client'
import { ProfileIntroductionResponse } from '@/lib/types'
import { ChangeEvent, useState } from 'react'

interface MyResumeCompletionProps {
  data: ProfileIntroductionResponse
}

export default function IntroduceComponent({ data }: MyResumeCompletionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [introduction, setIntroduction] = useState(data.introduction || '')
  const [charCount, setCharCount] = useState(data.introduction ? data.introduction.length : 0)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= 300) {
      setIntroduction(value)
      setCharCount(value.length)
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">자기소개</span>
        {/* <span className="text-sm text-[#2563EB]">
          Tip : 본인의 경험을 바탕으로 핵심 역량과 보유 기술을 간단히 작성해주세요! (최대 300자)
        </span> */}
      </div>

      {/* contents */}
      <div className="pt-[0.94rem]">
        {isEditing ? (
          <div>
            <textarea
              className="border-grey200 text-black w-full resize-none rounded border p-2"
              rows={4}
              value={introduction}
              onChange={handleInputChange}
              placeholder="자기소개를 입력해주세요..."
            ></textarea>
            <div className="text-right text-sm text-grey100">{charCount} / 300자</div>
          </div>
        ) : (
          <span className={introduction ? 'text-black' : 'text-grey50'}>{introduction || '자기소개가 없습니다.'}</span>
        )}
      </div>

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]" onClick={handleEditClick}>
          수정하기
        </button>
      </div>
    </div>
  )
}

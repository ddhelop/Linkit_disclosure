'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileIntroduction } from '@/lib/action'
import { ProfileIntroductionResponse } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumeCompletionProps {
  data: ProfileIntroductionResponse
}

export default function IntroduceComponent({ data }: MyResumeCompletionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [introduction, setIntroduction] = useState(data.introduction || '')
  const [charCount, setCharCount] = useState(data.introduction ? data.introduction.length : 0)
  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleEditClick = () => {
    if (isEditing) {
      saveIntroduction()
    } else {
      setIsEditing(true)
    }
  }

  const saveIntroduction = async () => {
    const response = await PostProfileIntroduction(accessToken, introduction)
    if (response.ok) {
      alert('저장되었습니다.')
      setIsEditing(false)
    } else {
      alert('저장에 실패했습니다.')
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= 300) {
      setIntroduction(value)
      setCharCount(value.length)
    }
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setIntroduction(data.introduction || '')
    setCharCount(data.introduction ? data.introduction.length : 0)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">자기소개</span>
        {isEditing && (
          <span className="text-sm text-[#2563EB]">
            Tip : 본인의 경험을 바탕으로 핵심 역량과 보유 역량을 간단히 작성해주세요! (최대 300자)
          </span>
        )}
      </div>

      {/* contents */}
      <div className="pt-[0.94rem]">
        {isEditing ? (
          <div>
            <textarea
              className="w-full resize-none rounded border border-grey30 p-4 text-[#000]"
              rows={4}
              value={introduction}
              onChange={handleInputChange}
              placeholder="자기소개를 입력해주세요..."
            ></textarea>
            <div className="text-right text-sm text-grey100">{charCount} / 300자</div>
          </div>
        ) : (
          <span className={introduction ? 'text-[#000]' : 'text-grey50'}>{introduction || '자기소개가 없습니다.'}</span>
        )}
      </div>

      {/* buttons */}
      <div className="mt-[0.94rem] flex w-full justify-end gap-2">
        {isEditing && (
          <button className="h-10 rounded bg-grey60 px-4 text-sm text-[#fff]" onClick={handleCancelClick}>
            취소하기
          </button>
        )}
        <button className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]" onClick={handleEditClick}>
          {isEditing ? '저장하기' : '수정하기'}
        </button>
      </div>
    </div>
  )
}

'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileIntroduction } from '@/lib/action'
import { ProfileIntroductionResponse } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'
import { Button } from '@/components/common/Button'
import Textarea from '@/components/common/component/Basic/TextArea'
import { toast } from 'react-toastify'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

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
      pushNotification('저장되었습니다.', 'success')
      setIsEditing(false)
    } else {
      pushNotification('저장에 실패했습니다.', 'error')
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
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-base font-semibold text-grey100 sm:text-lg">자기소개 및 팀빌딩 목적</span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem]">
        {isEditing ? (
          <div>
            <Textarea
              className="w-full resize-none whitespace-pre-wrap rounded border border-grey30 p-4 text-[#000]"
              rows={4}
              value={introduction}
              onChange={handleInputChange}
              placeholder="자기소개를 입력해주세요..."
            />
            <div className="text-right text-sm text-grey100">{charCount} / 300자</div>
          </div>
        ) : (
          <div className={introduction ? 'whitespace-pre-wrap text-sm text-[#000] sm:text-base' : 'text-grey50'}>
            {introduction || '자기소개가 없습니다.'}
          </div>
        )}
      </div>

      {/* buttons */}
      <div className="mt-[0.94rem] flex w-full justify-end gap-2">
        {isEditing && (
          <Button mode="sub" animationMode="sub" onClick={handleCancelClick}>
            취소하기
          </Button>
        )}
        <Button animationMode="main" onClick={handleEditClick}>
          {isEditing ? '저장하기' : '수정하기'}
        </Button>
      </div>
    </div>
  )
}

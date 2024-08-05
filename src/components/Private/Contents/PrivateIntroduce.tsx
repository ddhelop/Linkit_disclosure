'use client'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileIntroduction } from '@/lib/action'
import { ProfileIntroductionResponse } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumeCompletionProps {
  data: ProfileIntroductionResponse
}

export default function PrivateIntroduce({ data }: MyResumeCompletionProps) {
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
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">자기소개 및 팀빌딩 목적</span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem]">
        <span className={introduction ? 'whitespace-pre-wrap py-[1.19rem] text-[#000]' : ' text-grey50'}>
          {introduction || '자기소개가 없습니다.'}
        </span>
      </div>
    </div>
  )
}

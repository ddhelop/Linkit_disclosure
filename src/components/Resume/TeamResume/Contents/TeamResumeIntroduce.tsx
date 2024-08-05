'use client'
import { Button } from '@/components/common/Button'
import Textarea from '@/components/common/component/Basic/TextArea'
import { accessTokenState } from '@/context/recoil-context'
import { PostProfileIntroduction, PostTeamIntroduction } from '@/lib/action'
import { TeamProfileIntroductionResponse } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface TeamCompletionProps {
  data: TeamProfileIntroductionResponse
}

export default function TeamResumeIntroduce({ data }: TeamCompletionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [teamIntroduction, setTeamIntroduction] = useState(data.teamIntroduction || '')
  const [charCount, setCharCount] = useState(data.teamIntroduction ? data.teamIntroduction.length : 0)
  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleEditClick = () => {
    if (isEditing) {
      saveIntroduction()
    } else {
      setIsEditing(true)
    }
  }

  const saveIntroduction = async () => {
    const response = await PostTeamIntroduction(accessToken, teamIntroduction)
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
      setTeamIntroduction(value)
      setCharCount(value.length)
    }
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setTeamIntroduction(data.teamIntroduction || '')
    setCharCount(data.teamIntroduction ? data.teamIntroduction.length : 0)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">팀 소개</span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem]">
        {isEditing ? (
          <div>
            <Textarea
              rows={4}
              value={teamIntroduction}
              onChange={handleInputChange}
              placeholder="팀소개를 입력해주세요..."
            ></Textarea>
            <div className="text-right text-sm text-grey100">{charCount} / 300자</div>
          </div>
        ) : (
          <span className={teamIntroduction ? 'text-[#000]' : 'text-grey50'}>
            {teamIntroduction || '팀소개가 없습니다.'}
          </span>
        )}
      </div>

      {/* buttons */}
      <div className="mt-[0.94rem] flex w-full justify-end gap-2 ">
        {isEditing && (
          <Button animationMode="sub" mode="sub" onClick={handleCancelClick}>
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

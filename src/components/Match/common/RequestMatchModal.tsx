'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetResumeExist, PostMatchRequest, PostTeamMatchRequest } from '@/lib/action'
import { MiniProfileResponse } from '@/lib/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface RequestMatchModalProps {
  onClose: () => void
  profileId: number
  data: MiniProfileResponse
}

interface ResumeExist {
  isPrivateProfileMatchingAllow: boolean
  isTeamProfileMatchingAllow: boolean
}

export default function RequestMatchModal({ onClose, profileId, data }: RequestMatchModalProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [resumeExist, setResumeExist] = useState<ResumeExist>({
    isPrivateProfileMatchingAllow: false,
    isTeamProfileMatchingAllow: false,
  })
  const [requestMessage, setRequestMessage] = useState('')

  // 보낼 이력서 유무 조회
  useEffect(() => {
    const fetchResumeBoolean = async () => {
      try {
        const response = await GetResumeExist(accessToken)
        setResumeExist(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchResumeBoolean()
  }, [accessToken])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleSendPrivateRequest = async () => {
    try {
      const response = await PostMatchRequest(accessToken, requestMessage, profileId)
      if (response.ok) {
        onClose()
      } else {
        console.error('매칭 요청 전송 실패')
      }
    } catch (error) {
      console.error('매칭 요청 전송 중 오류 발생', error)
    }
  }

  const handleSendTeamRequest = async () => {
    try {
      const response = await PostTeamMatchRequest(accessToken, requestMessage, profileId)
      if (response.ok) {
        onClose()
      } else {
        console.error('팀 소개서 매칭 요청 전송 실패')
      }
    } catch (error) {
      console.error('팀 소개서 매칭 요청 전송 중 오류 발생', error)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000] bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="flex w-[40rem] flex-col justify-between rounded-lg bg-[#fff] px-[3.12rem] py-5 shadow-lg">
        <div className="flex justify-center">
          <h2 className="mb-4 font-semibold">{data?.memberName}님에게 매칭 요청 보내기</h2>
        </div>

        <div className="flex justify-center">
          <div className="mb-3 rounded bg-[#D3E1FE33] px-3 py-1 text-sm">
            상대방이 매칭 요청을 수락할 경우, 나의 이메일 주소가 전달됩니다.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Image
              src="/assets/images/DefaultProfile.png"
              width={42}
              height={42}
              alt="profile"
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{data?.memberName}</p>
              <p className="text-sm text-grey70">{data?.jobRoleNames.join(', ')}</p>
            </div>
          </div>
        </div>

        <textarea
          className="mt-4 h-40 w-full resize-none rounded-xl bg-grey20 p-5 text-sm text-grey90 outline-none"
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
        />

        <div className="mt-6 flex w-full justify-end gap-2">
          <button className="rounded bg-grey20 px-8 py-2 text-grey60" onClick={onClose}>
            취소
          </button>
          {resumeExist.isPrivateProfileMatchingAllow && (
            <button className="rounded bg-[#2563EB] px-8 py-2 text-sm text-[#fff]" onClick={handleSendPrivateRequest}>
              내 이력서로 전송
            </button>
          )}
          {resumeExist.isTeamProfileMatchingAllow && (
            <button className="rounded bg-[#2563EB] px-8 py-2 text-sm text-[#fff]" onClick={handleSendTeamRequest}>
              팀 소개서로 전송
            </button>
          )}

          {!resumeExist.isPrivateProfileMatchingAllow && !resumeExist.isTeamProfileMatchingAllow && (
            <button className="rounded bg-grey20 px-8 py-2 text-grey60">매칭 요건 불만족</button>
          )}
        </div>
      </div>
    </div>
  )
}

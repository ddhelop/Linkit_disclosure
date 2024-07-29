'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MatchReceivedType } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostMatchResponse, PostTeamMatchResponse } from '@/lib/action'

interface ModalProps {
  match: MatchReceivedType
  onClose: () => void
}

export default function ResponseMatchModal({ match, onClose }: ModalProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [confirmModal, setConfirmModal] = useState<null | boolean>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content')
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleResponse = async (isAllowMatching: boolean) => {
    try {
      if (match.matchingType === 'PROFILE') {
        const reposne = await PostMatchResponse(accessToken, match.receivedMatchingId, isAllowMatching)
        if (reposne.ok) {
          alert('매칭 요청에 응답했습니다.')
        }
      } else if (match.matchingType === 'TEAM_PROFILE') {
        const response = await PostTeamMatchResponse(accessToken, match.receivedMatchingId, isAllowMatching)
        if (response.ok) {
          alert('매칭 요청에 응답했습니다.')
        }
      }
      onClose()
    } catch (error) {
      console.error('Failed to send match response:', error)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {confirmModal === null && (
          <motion.div
            className="modal-content w-[48.5rem] rounded-lg bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="flex justify-center">
              <h2 className="font-semibold text-grey100">{match.senderName}께 매칭 요청을 받았습니다</h2>
            </div>
            <div className="flex">
              <div className="my-3 bg-grey10 px-[0.56rem] text-sm text-main">
                상대방의 매칭 요청을 수락할 경우, 나의 이메일 주소가 전달됩니다!
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="relative h-[45px] w-[45px]">
                <Image
                  src={match.miniProfileImg || '/assets/images/DefaultProfile.png'}
                  objectFit="cover"
                  layout="fill"
                  alt="Sender Profile"
                  className="rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{match.senderName}</h3>
                <p className="text-sm text-grey60">{match.jobRoleNames}</p>
              </div>
            </div>
            <div className="mt-4 rounded bg-grey20 p-5 text-sm">
              <p>{match.requestMessage}</p>
            </div>
            <div className="mt-7 flex justify-end">
              <button className="mr-2 rounded bg-grey20 px-10 py-2 text-grey60" onClick={() => handleResponse(false)}>
                거절
              </button>
              <button className="rounded bg-main px-10 py-2 text-white" onClick={() => handleResponse(true)}>
                수락
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

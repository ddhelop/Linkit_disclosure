import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Withdrawal } from '@/lib/action'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'

interface ConfirmModalProps {
  onClose: () => void
  userName: string
}

export default function ConfirmModal({ onClose, userName }: ConfirmModalProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const resetAccessTokenState = useResetRecoilState(accessTokenState)
  const [showCompleteModal, setShowCompleteModal] = useState(false)

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleWithdrawal = async () => {
    try {
      const response = await Withdrawal(accessToken)
      if (response.ok) {
        resetAccessTokenState()
        setShowCompleteModal(true)
      } else {
        console.error('Failed to withdraw', response)
      }
    } catch (error) {
      console.error('Failed to withdraw', error)
    }
  }

  const handleCompleteModalClose = () => {
    setShowCompleteModal(false)
    onClose()
  }

  return (
    <>
      {!showCompleteModal ? (
        <div
          className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#000] bg-opacity-50 text-grey90"
          onClick={handleClickOutside}
        >
          <div className="w-[24rem] rounded-lg bg-[#fff] p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <Image src="/assets/icons/gray-warning.svg" width={43} height={43} alt="warning" />
              <h2 className="my-4 text-xl font-bold">정말 탈퇴하시겠습니까?</h2>
              <p className="mt-4 text-center text-sm leading-5">
                탈퇴를 누르시면 {userName}님이 그동안 쌓아 오신 모든 데이터가 삭제되며 복구할 수 없습니다.
                <br />
                그래도 괜찮으시다면 탈퇴를 눌러주세요 🥲
              </p>
              <div className="mt-[2.25rem] flex gap-4">
                <button className="w-36 rounded-[0.6rem] bg-grey30 px-8 py-4 text-grey90" onClick={handleWithdrawal}>
                  탈퇴
                </button>
                <button className="w-36 rounded-[0.6rem] bg-grey90 px-8 py-4 text-[#fff]" onClick={onClose}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#000] bg-opacity-50 text-grey90"
          onClick={handleClickOutside}
        >
          <div className="w-[24rem] rounded-lg bg-[#fff] p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <Image src="/assets/icons/complete-icon.svg" width={43} height={43} alt="complete" />
              <h2 className="my-4 text-xl font-bold">탈퇴가 완료되었습니다.</h2>
              <p className="mt-4 text-center text-sm leading-5">그동안 링킷을 이용해주셔서 감사드립니다.</p>
              <button
                className="mt-[2.25rem] w-36 rounded-[0.6rem] bg-grey90 px-8 py-4 text-[#fff]"
                onClick={handleCompleteModalClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import { accessTokenState } from '@/context/recoil-context'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { GetOnboardingPrivateData, OnBoardingPrivateData } from '@/lib/action'
import { PostIFormData } from '@/lib/types'

interface UserOptionProps {
  onClose: () => void
  onShowConfirmModal: (userName: string) => void
}

interface IUserData extends PostIFormData {
  email: string
}

export default function UserOption({ onClose, onShowConfirmModal }: UserOptionProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [userData, setUserData] = useState<IUserData>({ memberName: '', contact: '', email: '', marketingAgree: false })

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const data = await GetOnboardingPrivateData(accessToken)
        setUserData({
          memberName: data.memberName,
          contact: data.contact,
          email: data.email,
          marketingAgree: data.marketingAgree || false,
        })
      }
    }

    fetchData()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [accessToken, onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleShowConfirmModal = () => {
    onShowConfirmModal(userData.memberName)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, ...formData } = userData // email을 제외하고 폼 데이터를 준비합니다.
    try {
      const response = await OnBoardingPrivateData(formData, accessToken)
      if (response.ok) {
        onClose()
      } else {
        console.error('Failed to update user data', response)
      }
    } catch (error) {
      console.error('Failed to update user data', error)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#000] bg-opacity-50 text-grey90"
      onClick={handleClickOutside}
    >
      <div className="w-[24rem] rounded-lg bg-[#fff] p-6 shadow-lg">
        <div className="mb-4 flex justify-between">
          <h2 className="font-semibold">계정 설정</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">이름</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm"
              value={userData.memberName}
              onChange={(e) => setUserData({ ...userData, memberName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">연락처</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm"
              value={userData.contact}
              onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">이메일</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm text-grey50"
              value={userData.email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-xs text-grey60">
              <input
                type="checkbox"
                className="mr-2"
                checked={userData.marketingAgree}
                onChange={(e) => setUserData({ ...userData, marketingAgree: e.target.checked })}
              />
              뉴스레터 및 마케팅 정보 수신동의
            </label>
          </div>
          <div className="mb-4 flex justify-start">
            <button
              type="button"
              className="border-b border-grey60 text-xs text-grey60"
              onClick={handleShowConfirmModal}
            >
              탈퇴하기
            </button>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="rounded bg-[#2563EB] px-12 py-[0.56rem] text-xs text-[#fff]">
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { accessTokenState } from '@/context/recoil-context'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface UserOptionProps {
  onClose: () => void
}

export default function UserOption({ onClose }: UserOptionProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
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
  }, [onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
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
        <form>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">이름</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm"
              defaultValue="김"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">연락처</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm"
              defaultValue="01012345678"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold">이메일</label>
            <input
              type="text"
              className="w-full rounded-[0.44rem] border border-grey30 px-[0.88rem] py-[0.62rem] text-sm"
              defaultValue="yeonmm04@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-xs text-grey60">
              <input type="checkbox" className="mr-2 " />
              뉴스레터 및 마케팅 정보 수신동의
            </label>
          </div>
          <div className="mb-4 flex justify-start ">
            <button type="button" className="border-b border-grey60 text-xs text-grey60" onClick={onClose}>
              탈퇴하기
            </button>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="rounded  bg-[#7EA5F8] px-12 py-[0.56rem] text-xs text-[#fff]">
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

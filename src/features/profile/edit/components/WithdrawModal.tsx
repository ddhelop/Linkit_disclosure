import { useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/shared/store/useAuthStore'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  onWithdraw: () => Promise<void>
}

export default function WithdrawModal({ isOpen, onClose, onWithdraw }: WithdrawModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { logout } = useUserStore()

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
  })

  if (!isOpen) return null

  const handleWithdraw = async () => {
    try {
      await onWithdraw()
      alert('회원탈퇴가 완료되었습니다.')
      onClose()
      router.push('/')
      // 로그아웃
      logout()
    } catch (error) {
      console.error('Failed to withdraw:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="w-[20rem] rounded-xl bg-white p-6">
        <div className="flex flex-col items-center gap-4">
          <Image src="/common/icons/warning.svg" alt="alert" width={44} height={44} />
          <h2 className="text-lg font-semibold">정말 탈퇴하시겠습니까?</h2>
          <p className="text-center text-sm text-grey60">
            탈퇴하면 회원님의 계정과 모든 데이터가 삭제되어 되돌릴 수 없어요
          </p>
          <div className="mt-2 flex w-full gap-2">
            <button onClick={onClose} className="flex-1 rounded-lg bg-main py-3 text-sm font-semibold text-white">
              탈퇴 안 함
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 rounded-lg bg-grey30 py-3 text-sm font-semibold text-grey90"
            >
              계정 삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

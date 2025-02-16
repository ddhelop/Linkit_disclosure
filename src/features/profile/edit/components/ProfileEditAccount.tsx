'use client'

import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getMemberBasicInform } from '../api/memberApi'
import NameChangeModal from './NameChangeModal'
import { updateEmailId, updateMarketingConsent, updateMemberName, updatePhoneNumber } from '../../api/updateAccount'
import PhoneChangeModal from './PhoneChangeModal'
import EmailChangeModal from './EmailChangeModal'
import { AccountListSkeleton } from './skeletons/ListSkeletons'
import { fetchWithdraw } from '../api/profileEditApi'
import WithdrawModal from './WithdrawModal'
import EmailIdChangeModal from './EmailIdChangeModal'
import { useToast } from '@/shared/hooks/useToast'
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber'

import { deleteCookie, useAuthStore } from '@/shared/store/useAuthStore'
import { useRouter } from 'next/navigation'

export default function ProfileEditAccount() {
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()
  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    contact: '',
    platform: '',
    isMarketingAgree: false,
    emailId: '',
  })
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isEmailIdModalOpen, setIsEmailIdModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const toast = useToast()
  const { setLoginState } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const data = await getMemberBasicInform()
        setMemberData({
          name: data.memberName,
          email: data.email,
          contact: data.contact,
          platform: data.platform,
          isMarketingAgree: data.isMarketingAgree,
          emailId: data.emailId,
        })
        const fakeEvent = { target: { value: data.contact } } as React.ChangeEvent<HTMLInputElement>
        setPhoneNumber(fakeEvent)
      } catch (error) {
        console.error('Failed to fetch member data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMemberData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[1.62rem] py-[1.88rem]">
        <AccountListSkeleton />
      </div>
    )
  }

  const getPlatformText = (platform: string) => {
    if (!platform) return '소셜 로그인'

    switch (platform.toLowerCase()) {
      case 'google':
        return '구글 로그인'
      case 'naver':
        return '네이버 로그인'
      case 'kakao':
        return '카카오 로그인'
      default:
        return '소셜 로그인'
    }
  }

  const getPlatformIcon = (platform: string) => {
    if (!platform) return '/common/icons/google_email.svg'

    switch (platform.toLowerCase()) {
      case 'google':
        return '/common/icons/google_email.svg'
      case 'naver':
        return '/common/icons/naver_email.svg'
      case 'kakao':
        return '/common/icons/kakao_email.svg'
      default:
        return '/common/icons/google_email.svg'
    }
  }

  const handleNameChange = async (newName: string) => {
    try {
      await updateMemberName(newName)
      setMemberData((prev) => ({ ...prev, name: newName }))
      toast.success('이름이 변경되었습니다.')
      setIsNameModalOpen(false)
    } catch (error) {
      console.error('Failed to update name:', error)
      // TODO: 에러 처리 (예: 토스트 메시지 표시)
    }
  }

  const handlePhoneChange = async (newPhone: string) => {
    try {
      const response = await updatePhoneNumber(newPhone)
      if (response) {
        setMemberData((prev) => ({ ...prev, contact: newPhone }))
        setIsPhoneModalOpen(false)
        toast.success('전화번호가 변경되었습니다.')
      } else {
        throw new Error('Failed to update phone number')
      }
    } catch (error) {
      console.error('Failed to update phone:', error)
      // TODO: 에러 처리
    }
  }

  const handleEmailIdChange = async (newEmailId: string) => {
    try {
      await updateEmailId(newEmailId)
      setMemberData((prev) => ({ ...prev, emailId: newEmailId }))
      setIsEmailIdModalOpen(false)
      toast.success('유저 아이디가 변경되었습니다.')
    } catch (error) {
      console.error('Failed to update emailId:', error)
      toast.alert('유저 아이디 변경에 실패했습니다.')
    }
  }

  const handleEmailChange = async (newEmail: string, verificationCode: string) => {
    try {
      // TODO: API call to update email
      setMemberData((prev) => ({ ...prev, email: newEmail }))
      setIsEmailModalOpen(false)
    } catch (error) {
      console.error('Failed to update email:', error)
      // TODO: 에러 처리
    }
  }

  const handleMarketingConsentChange = async () => {
    if (isUpdating) return // 이미 업데이트 중이면 중복 요청 방지

    try {
      setIsUpdating(true)
      await updateMarketingConsent(!memberData.isMarketingAgree)
      setMemberData((prev) => ({ ...prev, isMarketingAgree: !prev.isMarketingAgree }))
      toast.success('광고성 정보 수신 동의가 변경되었습니다.')
    } catch (error) {
      console.error('Failed to update marketing consent:', error)
      toast.alert('광고성 정보 수신 동의 변경에 실패했습니다.')
    } finally {
      setIsUpdating(false)
    }
  }

  // 회원탈퇴
  const handleWithdraw = async () => {
    const response = await fetchWithdraw()
    if (response.isSuccess) {
      // 쿠키에서 액세스토큰 제거
      deleteCookie('accessToken')
      // 로그인 상태 false로 설정
      setLoginState(false)
      toast.success('회원탈퇴가 완료되었습니다.')
      router.push('/')
    } else {
      toast.alert(response.message)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl border-grey20 px-[1.62rem] py-[1.88rem] md:border md:bg-white">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10"
            onClick={() => setIsEmailModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Image src={getPlatformIcon(memberData.platform)} alt="platform" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">{getPlatformText(memberData.platform)}</p>
                <span className="font-semibold">{memberData.email}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          <div
            className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10"
            onClick={() => (memberData.name || memberData.name == '') && setIsNameModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Image src="/common/icons/user_profile_light.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">이름</p>
                <span className="font-semibold">{memberData.name}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          {/* 유저아이디 */}
          <div
            className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10"
            onClick={() => memberData.emailId && setIsEmailIdModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Image src="/common/icons/@.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">유저 아이디</p>
                <span className="font-semibold">{memberData.emailId}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          {/* 전화번호 */}
          <div
            className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10"
            onClick={() => setIsPhoneModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Image src="/common/icons/call_circle.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">전화번호</p>
                <span className="font-semibold">{formatPhoneNumber(memberData.contact)}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          <div className="my-[1.88rem] h-[1px] w-[96%] bg-grey30" />

          <div className="flex w-full cursor-pointer items-center gap-2 pl-4" onClick={handleMarketingConsentChange}>
            <Image
              src={
                memberData.isMarketingAgree ? '/common/icons/checked_square.svg' : '/common/icons/unchecked_square.svg'
              }
              alt="edit"
              width={24}
              height={24}
            />
            <p className="text-sm font-normal text-grey70">광고성 정보 수신 동의</p>
          </div>

          <div
            onClick={() => setIsWithdrawModalOpen(true)}
            className="mt-[1.94rem] flex w-full cursor-pointer pl-4 text-sm font-normal text-grey60 underline"
          >
            회원탈퇴
          </div>
        </div>
      </div>

      <NameChangeModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        initialName={memberData.name}
        onSubmit={handleNameChange}
      />

      <PhoneChangeModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        initialPhone={memberData.contact}
        onSubmit={handlePhoneChange}
      />

      <EmailIdChangeModal
        isOpen={isEmailIdModalOpen}
        onClose={() => setIsEmailIdModalOpen(false)}
        initialEmailId={memberData.emailId}
        onSubmit={handleEmailIdChange}
      />

      <EmailChangeModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialEmail={memberData.email}
        onSubmit={handleEmailChange}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'

export default function OnBoardingInfo() {
  const [name, setName] = useState('') // 이름 상태 관리
  const [phoneNumber, setPhoneNumber] = useState('') // 연락처 상태 관리
  const [email, setEmail] = useState('') // 이메일 상태 관리
  const searchParams = useSearchParams()

  useEffect(() => {
    // URL에서 email 쿼리 파라미터 가져오기
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam) // 이메일 상태 업데이트
    }
  }, [searchParams])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '')
    if (input.length > 11) return

    const formattedNumber = input.replace(
      /(\d{3})(\d{0,4})(\d{0,4})/,
      (match, p1, p2, p3) => `${p1}${p2 ? `-${p2}` : ''}${p3 ? `-${p3}` : ''}`,
    )
    setPhoneNumber(formattedNumber)
  }

  // 이름이 입력되고, 전화번호가 최소 10자리 이상일 때 버튼을 활성화
  const isButtonEnabled = name.trim() !== '' && phoneNumber.replace(/\D/g, '').length >= 10

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[4.19rem] flex w-[35%] flex-col">
        <h1 className="text-xl font-semibold text-grey90">기본 정보를 입력해주세요.</h1>
        <p className="mt-3 text-sm text-grey50">입력한 정보는 마이페이지에서 확인하고 수정할 수 있어요</p>

        <div className="mt-9 flex flex-col">
          <h2 className="text-grey60">이름</h2>
          <Input value={name} onChange={handleNameChange} placeholder="이름을 입력해주세요." className="mt-3" />
        </div>

        <div className="mt-7 flex flex-col">
          <h2 className="text-grey60">연락처</h2>
          <Input
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="전화번호를 입력해주세요."
            className="mt-3"
            type="text"
          />
        </div>

        <div className="mt-7 flex flex-col">
          <h2 className="text-grey60">이메일</h2>
          <div className="mt-3 rounded-xl border border-grey30 px-6 py-3 text-grey40">{email}</div>
        </div>

        <p className="mt-3 text-xs leading-4 text-grey70">
          *매칭 성사 시 해당 이메일 주소를 상대방이 볼 수 있어요
          <br />
          이메일은 마이페이지 - 계정 설정에서 변경할 수 있어요
        </p>
        <div className="flex w-full justify-end">
          <Button
            className="mt-9 text-white"
            mode="main"
            size="lg"
            animationMode="main"
            disabled={!isButtonEnabled} // 이름과 전화번호가 조건을 만족하지 않으면 버튼 비활성화
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

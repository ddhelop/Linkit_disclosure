// src/features/member/hooks/useOnBoardingAgree.ts

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { submitConsentInfo } from '../api/memberApi'
import { ConsentInfo } from '../types/memberTypes'

export function useOnBoardingAgree() {
  const router = useRouter()
  const setAccessToken = useSetRecoilState(accessTokenState)
  const [allChecked, setAllChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState([false, false, false, false])

  const isNextEnabled = checkedItems.slice(0, 3).every(Boolean)

  const handleCheckClick = (index: number) => {
    const updatedItems = [...checkedItems]
    updatedItems[index] = !updatedItems[index]
    setCheckedItems(updatedItems)
    setAllChecked(updatedItems.every(Boolean))
  }

  const handleAllCheckClick = () => {
    const newState = !allChecked
    setAllChecked(newState)
    setCheckedItems(checkedItems.map(() => newState))
  }

  const submitConsentInfoHandler = async () => {
    const accessToken = sessionStorage.getItem('accessToken') || ''

    const data: ConsentInfo = {
      isServiceUseAgree: checkedItems[0],
      isPrivateInformAgree: checkedItems[1],
      isAgeCheck: checkedItems[2],
      isMarketingAgree: checkedItems[3],
    }

    const result = await submitConsentInfo(data, accessToken)

    if (result) {
      setAccessToken(accessToken) // Recoil 상태에 액세스 토큰 저장
      router.push('/login/onboarding-complete') // 온보딩 완료 페이지로 이동
    }
  }

  return {
    allChecked,
    checkedItems,
    isNextEnabled,
    handleCheckClick,
    handleAllCheckClick,
    submitConsentInfoHandler,
  }
}

// src/features/member/hooks/useOnBoardingAgree.ts

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitConsentInfo } from '../api/memberApi'
import { ConsentInfo } from '../types/memberTypes'
import { useAuthStore } from '@/shared/store/useAuthStore'

export function useOnBoardingAgree() {
  const router = useRouter()
  const { isLogin, checkLogin } = useAuthStore()
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
      document.cookie = `accessToken=${accessToken}; path=/;`
      checkLogin()
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

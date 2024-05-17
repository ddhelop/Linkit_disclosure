import OnBoardingHeader from '@/components/Layout/onBoardingHeader'
import OnBoardingStep1 from '@/components/OnBoarding/OnBoardingStep1'
import React from 'react'

export default function OnBoardingStep1Page() {
  return (
    <div>
      <OnBoardingHeader />
      <div className="w-1/3 h-[0.18rem] bg-[#2563EB]"></div>
      <OnBoardingStep1 />
    </div>
  )
}

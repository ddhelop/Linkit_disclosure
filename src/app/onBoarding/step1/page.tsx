import OnBoardingHeader from '@/components/Layout/onBoardingHeader'
import OnBoardingStep1 from '@/components/OnBoarding/private/OnBoardingStep1'
import React from 'react'

export default function OnBoardingStep1Page() {
  return (
    <div>
      <OnBoardingHeader />
      <div className="h-[0.18rem] w-1/3 bg-[#2563EB]"></div>
      <OnBoardingStep1 />
    </div>
  )
}

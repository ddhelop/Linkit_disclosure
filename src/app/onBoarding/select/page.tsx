import OnBoardingSelect from '@/components/OnBoarding/OnBoardingSelect'

import React from 'react'

export default function OnBoardingStep1Page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="t-[69px] fixed mt-[69px] h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
      <OnBoardingSelect />
    </div>
  )
}

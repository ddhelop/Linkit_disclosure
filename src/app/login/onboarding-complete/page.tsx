import OnBoardingComplete from '@/features/onBoarding/components/OnBoardingComplete'
import OnBoaridngHeader from '@/features/onBoarding/components/OnBoaridngHeader'

export default function OnBoardingAgreePage() {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <OnBoaridngHeader />
      {/* progress */}
      <div className="flex w-full">
        <div className="h-[2px] w-1/3 bg-grey30"></div>
        <div className="h-[2px] w-1/3 bg-grey30"></div>
        <div className="h-[2px] w-1/3 bg-main"></div>
      </div>

      <div className="w-full">
        <OnBoardingComplete />
      </div>
    </div>
  )
}

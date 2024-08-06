import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface OnBoardingHeaderProps {
  percentage: number
}

export default function OnBoardingHeader({ percentage }: OnBoardingHeaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(percentage)
  }, [percentage])

  return (
    <div className="z-1000 fixed top-0 w-full">
      <div className="flex items-center bg-white px-[2.5rem] pb-4 pt-5 shadow-md">
        <Link href="/">
          <Image src="/assets/colorLogo.svg" alt="Logo" width={90} height={17} />{' '}
        </Link>
      </div>
      <div className="h-[0.15rem] w-full bg-grey10">
        <div className="h-[0.15rem] bg-main" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

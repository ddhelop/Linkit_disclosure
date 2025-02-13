'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ChannelService from './third-party/ChannelTalk'

export default function CustomClient({ children }: { children: React.ReactNode }) {
  // const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const CT = new ChannelService()
    //주의! 여기서 CT.loadScript()를 선언하면 ChannelIO script included twice. 오류 발생합니다!
    CT.boot({ pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY || '' })

    // const checkMobile = () => {
    //   const userAgent = window.navigator.userAgent.toLowerCase()
    //   const mobileDevices = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    //   setIsMobile(mobileDevices.test(userAgent))
    //   setIsLoading(false)
    // }

    // checkMobile()

    //for unmount
    return () => {
      CT.shutdown()
    }
  }, [])

  // if (isLoading) {
  //   return null
  // }

  // if (isMobile) {
  //   return (
  //     <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white px-6">
  //       <div className="flex flex-col items-center text-center">
  //         <div className="bg-grey5 mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full">
  //           <Image src="/common/logo.png" alt="LinKit Logo" width={60} height={60} priority />
  //         </div>
  //         <h1 className="mb-3 text-xl font-bold text-grey90">PC 환경에서 이용해주세요</h1>
  //         <p className="whitespace-pre-line text-base text-grey60">
  //           {'원활한 서비스 이용을 위해\nPC 환경에서 접속해주시기 바랍니다'}
  //         </p>
  //         <div className="mt-12 flex flex-col gap-3">
  //           <div className="bg-grey5 flex items-center gap-2 rounded-xl px-4 py-3">
  //             <Image src="/common/icons/warning.svg" alt="Chrome" width={24} height={24} priority />
  //             <span className="text-sm text-grey60">Chrome 브라우저 권장</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return <>{children}</>
}

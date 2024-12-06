'use client'
import { useEffect } from 'react'

import IntroComponent10 from './IntroComponent10'
import IntroComponent11 from './IntroComponent11'

import ChannelService from '../third-party/ChannelTalk'
import Landing1 from './1_0_Landing/Landing1'
import Landing2 from './1_0_Landing/Landing2'
import Landing3 from './1_0_Landing/Landing3'
import Landing4 from './1_0_Landing/Landing4'
import Landing5 from './1_0_Landing/Landing5'
import Landing6 from './1_0_Landing/Landing6'

import LoggedInLanding1 from './1_0_Landing/LoggedInLanding1'
import FooterComponent from '@/widgets/Footer/FooterComponent'
import { useUserStore } from '@/shared/store/useAuthStore'

export default function IntroLayout() {
  const { isLogin } = useUserStore()
  useEffect(() => {
    const CT = new ChannelService()
    //주의! 여기서 CT.loadScript()를 선언하면 ChannelIO script included twice. 오류 발생합니다!
    CT.boot({ pluginKey: '2cf4be80-3231-457f-8904-9f77a31fb660' })

    //for unmount
    return () => {
      CT.shutdown()
    }
  }, [])

  // zustand
  return (
    <div className="flex h-screen w-full flex-col overflow-y-scroll bg-[#F0F2F6] sm:snap-y sm:snap-mandatory ">
      {/* <IntroComponent1 /> */}
      {/* <IntroComponent3 /> */}
      {/* <IntroComponent2 /> */}
      {/* <IntroComponent4 /> */}
      {/* <IntroComponent5 /> */}
      {/* <IntroComponent6 /> */}
      {/* <IntroComponent7 /> */}
      {/* <IntroComponent8 /> */}
      {/* <IntroComponent9 /> */}
      {isLogin ? <LoggedInLanding1 /> : <Landing1 />}
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <Landing5 />
      <Landing6 />

      <IntroComponent10 />
      <IntroComponent11 />

      <div className="h-screen snap-start">
        <FooterComponent />
      </div>
    </div>
  )
}

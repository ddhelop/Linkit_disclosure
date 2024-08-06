'use client'
import { useEffect } from 'react'
import FooterComponent from '../Layout/FooterComponent'
import IntroComponent1 from './IntroComponent1'
import IntroComponent10 from './IntroComponent10'
import IntroComponent11 from './IntroComponent11'
import IntroComponent2 from './IntroComponent2'
import IntroComponent3 from './IntroComponent3'
import IntroComponent4 from './IntroComponent4'
import IntroComponent5 from './IntroComponent5'
import IntroComponent6 from './IntroComponent6'
import IntroComponent7 from './IntroComponent7'
import IntroComponent8 from './IntroComponent8'
import IntroComponent9 from './IntroComponent9'
import ChannelService from '../third-party/ChannelTalk'
import Landing1 from './1_0_Landing/Landing1'
import Landing2 from './1_0_Landing/Landing2'
import Landing3 from './1_0_Landing/Landing3'
import Landing4 from './1_0_Landing/Landing4'
import Landing5 from './1_0_Landing/Landing5'
import Landing6 from './1_0_Landing/Landing6'
import { useRecoilValue } from 'recoil'
import { authState } from '@/context/recoil-context'
import LoggedInLanding1 from './1_0_Landing/LoggedInLanding1'

export default function IntroLayout() {
  useEffect(() => {
    const CT = new ChannelService()
    //주의! 여기서 CT.loadScript()를 선언하면 ChannelIO script included twice. 오류 발생합니다!
    CT.boot({ pluginKey: '2cf4be80-3231-457f-8904-9f77a31fb660' })

    //for unmount
    return () => {
      CT.shutdown()
    }
  }, [])

  const isAuth = useRecoilValue(authState)
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
      {isAuth ? <LoggedInLanding1 /> : <Landing1 />}
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

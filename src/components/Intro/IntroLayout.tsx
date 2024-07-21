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

export default function IntroLayout() {
  useEffect(() => {
    const CT = new ChannelService()
    //주의! 여기서 CT.loadScript()를 선언하면 ChannelIO script included twice. 오류 발생합니다!
    CT.boot({ pluginKey: '5f3067ba-3358-452b-a2b1-fda6ccf10f2f' })

    //for unmount
    return () => {
      CT.shutdown()
    }
  }, [])
  return (
    <div className="flex h-screen w-full snap-y snap-mandatory flex-col overflow-y-scroll">
      {/* <IntroComponent1 /> */}
      {/* <IntroComponent3 /> */}
      {/* <IntroComponent2 /> */}
      {/* <IntroComponent4 /> */}
      <Landing1 />
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <IntroComponent5 />
      <IntroComponent6 />
      <IntroComponent7 />
      <IntroComponent8 />
      <IntroComponent9 />
      <IntroComponent10 />
      <IntroComponent11 />

      <div className="h-screen snap-start">
        <FooterComponent />
      </div>
    </div>
  )
}

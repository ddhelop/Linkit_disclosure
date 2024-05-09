import FooterComponent from '../Layout/FooterComponent'
import IntroComponent1 from './IntroComponent1'
import IntroComponent2 from './IntroComponent2'
import IntroComponent3 from './IntroComponent3'
import IntroComponent4 from './IntroComponent4'

export default function IntroLayout() {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <IntroComponent1 />
      <IntroComponent2 />
      <IntroComponent3 />
      <IntroComponent4 />

      <div className="snap-start h-screen">
        <FooterComponent />
      </div>
    </div>
  )
}

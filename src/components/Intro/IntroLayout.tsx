import IntroComponent1 from './IntroComponent1'
import IntroComponent2 from './IntroComponent2'

export default function IntroLayout() {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <IntroComponent1 />

      <IntroComponent2 />
    </div>
  )
}

import IntroComponent1 from './IntroComponent1'

export default function IntroLayout() {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <IntroComponent1 />
    </div>
  )
}

import Image from 'next/image'

export default function IntroComponent3() {
  return (
    <div className="w-full snap-start h-screen flex  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-[45%] flex items-center justify-center">
        <Image src={'/assets/intro/dart.png'} width={451} height={469} alt="dart" />
      </div>
      <div className="w-[55%] h-full flex items-center justify-center">
        <div className="flex  flex-col items-end justify-center mb-60">
          <span className="text-5xl font-bold pb-4 text-grey100">목표를 향해 모이세요</span>
          <span className="text-4xl font-bold text-grey100">3개월 뒤 열리는 공모전 확인하기</span>
          <span className="text-[1.375rem] font-medium text-grey70 pt-5">
            동일한 목표를 이루기 위한 사람들과 모이세요.
          </span>
          <span className="text-[1.375rem] font-medium text-grey70">실패없는 팀빌딩을 이루어드립니다.</span>
        </div>
      </div>
    </div>
  )
}

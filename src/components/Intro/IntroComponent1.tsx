import Image from 'next/image'

export default function IntroComponent1() {
  return (
    <>
      <div className="relative snap-start h-screen text-center flex flex-col items-center justify-center p-8 min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div className="flex gap-4">
          <span className="text-3xl font-medium">성공을</span>
          <Image src={'/assets/intro/lineLink.svg'} alt="line" width={89} height={1} />
          <span className="text-3xl font-medium">잇는 팀빌딩</span>
        </div>
        <div className="flex gap-12 py-12">
          <Image src={'/assets/intro/logo.svg'} alt="line" width={147} height={88} />
          <Image src={'/assets/intro/logoText.svg'} alt="line" width={250} height={65} />
        </div>

        <div className="flex flex-col pt-24">
          <span className="text-2xl font-medium">얼리버드 마감까지</span>
          <span className="text-[1.68rem] font-medium mt-4 bg-[#F1F4F980] p-5">13일 08시간 07분 35초</span>
        </div>
      </div>
    </>
  )
}

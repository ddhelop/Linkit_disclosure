import Image from 'next/image'

export default function IntroComponent8() {
  return (
    <div className="w-full snap-start h-screen flex flex-col items-center pt-16  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-full h-full flex">
        {/* left */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className=" flex flex-col items-left pb-20">
            <div className="p-[0.6rem] w-[9.75rem] bg-grey20 rounded-lg text-center">3 편리한 정보 확인</div>
            <span className="text-[2.62rem] font-bold pt-3 leading-[3.625rem] text-left">
              다른 사용자의 프로필을
              <br />
              항목 별로 열람해요
              <br />
              <span className="text-xl text-grey70 font-medium pt-5 text-center leading-8">
                프로필을 열람하고 마음에 드는 사용자에게 매칭 요청을 보내보세요
              </span>
            </span>
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 h-full flex gap-3 pt-2 items-center relative">
          <Image src={'/assets/intro/section8bg.png'} layout="fill" alt="background" />
        </div>
      </div>
    </div>
  )
}

import Image from 'next/image'

export default function IntroComponent8() {
  return (
    <div className="w-full snap-start h-screen flex flex-col justify-center items-center pt-20 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-full h-full flex flex-col lg:flex-row">
        {/* left */}
        <div className="lg:w-1/2 lg:h-full flex items-center justify-center">
          <div className=" flex flex-col items-center lg:items-left lg:pb-20">
            <div className="p-1 lg:p-[0.6rem] lg:w-[9rem] w-[9.75rem] bg-grey20 rounded-lg text-center">
              3 편리한 정보 확인
            </div>
            <span className="text-[1.8rem] lg:text-[2.62rem] font-bold pt-3 lg:leading-[3.625rem] text-center lg:text-left">
              다른 사용자의 프로필을
              <br />
              항목 별로 열람해요
              <br />
              <span className="text-base lg:text-xl text-grey70 font-medium pt-5 text-center lg:leading-8">
                프로필을 열람하고 마음에 드는
                <br className="flex sm:hidden" />
                사용자에게 매칭 요청을 보내보세요
              </span>
            </span>
          </div>
        </div>
        {/* right */}
        <div className="lg:w-1/2 h-full flex gap-3 pt-2 items-center relative">
          <Image src={'/assets/intro/section8bg.png'} layout="fill" alt="background" />
        </div>
      </div>
    </div>
  )
}

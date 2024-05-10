import Image from 'next/image'

export default function IntroComponent5() {
  return (
    <div className="w-full snap-start h-screen flex items-center  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <span className="text-[2.62rem] font-bold pt-3 leading-[3.625rem]">
          프로필만 등록하면
          <br />
          올해 여름을 알차게
        </span>
        <span className="text-xl text-grey70 font-medium pt-5 text-center leading-8">
          성공을 위해, 빡세게 제대로 일해보고 싶은 사람들과 함께해요
          <br />
          전국 대학(원)생 및 창업팀에게 열려있습니다.
        </span>
      </div>
    </div>
  )
}

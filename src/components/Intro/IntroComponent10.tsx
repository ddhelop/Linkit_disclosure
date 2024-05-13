import Image from 'next/image'

export default function IntroComponent10() {
  return (
    <div
      style={{
        backgroundImage: 'url("/assets/intro/section10bg.png")',
      }}
      className="relative w-full snap-start h-screen  flex flex-col items-center pt-20 lg:pt-32 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
    >
      <Image
        src={'/assets/intro/linkitRec.png'}
        width={921}
        height={921}
        alt="linkit"
        className="absolute bottom-0 hidden lg:flex"
      />
      <div className="w-full flex flex-col items-center">
        <span className="text-[1.8rem] lg:text-[2.62rem] font-bold pt-3 lg:leading-[3.625rem] text-center">
          링킷이
          <br />
          다시 돌아왔습니다
        </span>
        <span className="text-base lg:text-xl text-grey70 font-medium pt-3 lg:pt-5 text-center leading-8">
          성공을 위해, 빡세게 제대로 일해보고 싶은 사람들과 함께해요
        </span>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-5 w-full justify-end overflow-x-hidden lg:ml-[30rem] pt-12 lg:pt-28 z-10">
        <div className="flex flex-col  w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">취업준비생 최00님</span>
        </div>

        <div className="flex flex-col w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">덕분에 창업팀 초기 멤버를 구했어요. 정말 감사합니다</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">예비 창업가 김00님</span>
        </div>

        <div className="flex flex-col w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">팀에 필요한 개발 인력을 구했습니다.</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">스타트업 대표 배00님</span>
        </div>
      </div>

      <div className="hidden lg:flex gap-5 w-full justify-start overflow-x-hidden mr-[30rem] pt-16 z-10">
        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!</span>
          <span className="w-full text-right pt-2 text-sm">취업준비생 최00님</span>
        </div>

        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50] rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">덕분에 창업팀 초기 멤버를 구했어요. 정말 감사합니다</span>
          <span className="w-full text-right pt-2 text-sm">예비 창업가 김00님</span>
        </div>
      </div>
    </div>
  )
}

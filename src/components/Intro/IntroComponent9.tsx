import Image from 'next/image'

export default function IntroComponent9() {
  return (
    <div className="w-full snap-start h-screen flex flex-col items-center pt-16  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-full h-full flex">
        {/* left */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className=" flex flex-col items-left pb-20">
            <div className="p-[0.6rem] w-[10.75rem] bg-grey20 rounded-lg text-center">4. 체계적인 매칭 시스템</div>
            <span className="text-[2.62rem] font-bold pt-3 leading-[3.625rem] text-left">
              함께 팀을 이루고 싶은 사람에게
              <br />
              매칭 요청을 보내요
              <br />
              <span className="text-xl text-grey70 font-medium pt-5 text-center leading-8">
                매칭 요청을 보낼 시 본인을 어필하는 메시지를 보낼 수 있어요
              </span>
            </span>
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 h-full flex gap-3 pt-2 items-center justify-center">
          <div className="w-[32.6rem] h-[29.5rem] shadow-card-shadow rounded-2xl flex flex-col py-7 px-12 items-center">
            <span className="text-[1.1rem]">한가영님에게 매칭 요청하기</span>
            <div className="flex w-full gap-5 justify-center items-center pt-5">
              <Image src={'/assets/intro/profile3.png'} width={110} height={110} alt="profile" />
              <Image src={'/assets/icons/connect.svg'} width={69} height={11} alt="profile" />
              <div className="w-[7.8rem] h-[7.8rem] rounded-full border-2 border-[#2563EB] flex justify-center items-center">
                <Image src={'/assets/intro/profile5.png'} width={110} height={110} alt="profile" />
              </div>
            </div>
            <span className="w-full text-[0.93rem] text-grey50 pt-6 pl-2">
              한가영님에게 매칭 요청을 보내기 위한 메시지를 적어주세요.
            </span>
            <div className="w-full h-[7.9rem] p-[0.81rem] bg-grey10 rounded-lg mt-3 text-[0.81rem]">
              안녕하세요, 프론트엔드 개발자 모집한다는 글 보고 연락드립니다. 저는 현재 대학생이지만, 2년 정도
              스타트업에서 일을 해 본 경력이 있으며, IoT 솔루션에 관심이 많습니다.
            </div>

            <div className="w-full h-[3.3rem] bg-grey90 rounded-lg mt-3 flex items-center justify-center text-[#fff] font-bold text-sm cursor-pointer">
              매칭 요청 보내기
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

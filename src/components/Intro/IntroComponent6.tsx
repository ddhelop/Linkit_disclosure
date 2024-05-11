import Image from 'next/image'

export default function IntroComponent6() {
  return (
    <div className="w-full snap-start h-screen flex flex-col justify-center items-center pt-20 lg:pt-16 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="lg:w-[1200px] flex flex-col">
        <div className="hidden w-full lg:flex gap-12 justify-center lg:pt-12">
          <span className="text-xl lg:text-[2.18rem] text-[#C1C4C9]"># 공모전</span>
          <span className="text-xl lg:text-[2.18rem] text-[#C1C4C9]"># 사이드 프로젝트</span>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row ">
          {/* left */}
          <div className="lg:w-1/2 h-full flex items-center justify-center">
            <div className="flex flex-col items-center lg:items-start lg:pb-20">
              <div className="p-[0.6rem] w-[10.75rem] bg-grey20 rounded-lg ">1. 팀원 구인 경로 최소화</div>
              <span className="text-[1.8rem] lg:text-[2.62rem] font-bold pt-3 lg:leading-[3.625rem] text-center lg:text-left">
                나와 맞는 사람을 <br />
                팀빌딩 해드립니다
                <br />
                <span className="text-base lg:text-xl text-grey70 font-medium pt-5 text-center leading-8">
                  조건을 설정하고 나와 같은 목적을 가진 사람을 만나보세요
                </span>
              </span>
            </div>
          </div>
          {/* right */}
          <div className="lg:w-1/2 h-full flex gap-3 pt-7 lg:pt-2 items-center justify-center">
            <div className="w-[17.5rem] h-[24.8rem] p-6 flex flex-col rounded-xl shadow-card-shadow bg-[#fff] mb-20">
              <span className="text-[1.23rem] font-bold ">
                창업경진대회 기술 담당
                <br />
                팀원이 필요해요!
              </span>
              <span className="text-[0.69rem] font-semibold text-grey60 pt-2">D-56</span>

              {/* profile */}
              <div className="flex flex-col items-center pt-3 gap-1">
                <Image
                  src={'/assets/intro/profile1.jpg'}
                  width={95}
                  height={95}
                  alt="profile"
                  className="rounded-[1.8rem]"
                />
                <span className="text-[#2563EB] font-bold text-[0.69rem] pt-3">SeonJun</span>
                <span className="text-grey60 font-semibold text-[0.69rem]">기획, AI엔지니어, LLM</span>
              </div>

              <div className="w-full h-[3.5rem] bg-grey10 mt-5 flex items-center justify-center">
                🔥
                <span className="font-semibold p-2 text-xs">공동의 목표를 위해 가감없는 피드백</span>
              </div>

              <div className="flex w-full justify-between pt-4 text-xs">
                <div className="w-28 h-10 rounded-md bg-grey10 flex justify-center items-center text-grey90 font-semibold cursor-pointer">
                  찜하기
                </div>
                <div className="w-28 h-10 rounded-md bg-grey100 flex justify-center items-center text-[#fff] font-semibold cursor-pointer">
                  연락하기
                </div>
              </div>
            </div>
            <div className="hidden w-[17.5rem] h-[24.8rem] p-6 lg:flex flex-col rounded-xl shadow-card-shadow bg-[#fff] mt-20">
              <span className="text-[1.23rem] font-bold ">
                창업경진대회 기술 담당
                <br />
                팀원이 필요해요!
              </span>
              <span className="text-[0.69rem] font-semibold text-grey60 pt-2">D-56</span>

              {/* profile */}
              <div className="flex flex-col items-center pt-3 gap-1">
                <Image
                  src={'/assets/intro/profile1.jpg'}
                  width={95}
                  height={95}
                  alt="profile"
                  className="rounded-[1.8rem]"
                />
                <span className="text-[#2563EB] font-bold text-[0.69rem] pt-3">SeonJun</span>
                <span className="text-grey60 font-semibold text-[0.69rem]">기획, AI엔지니어, LLM</span>
              </div>

              <div className="w-full h-[3.5rem] bg-grey10 mt-5 flex items-center justify-center">
                🔥
                <span className="font-semibold p-2 text-xs">공동의 목표를 위해 가감없는 피드백</span>
              </div>

              <div className="flex w-full justify-between pt-4 text-xs">
                <div className="w-28 h-10 rounded-md bg-grey10 flex justify-center items-center text-grey90 font-semibold cursor-pointer">
                  찜하기
                </div>
                <div className="w-28 h-10 rounded-md bg-grey100 flex justify-center items-center text-[#fff] font-semibold cursor-pointer">
                  연락하기
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full lg:flex gap-12 justify-end pb-12 pr-60">
          <span className="text-2xl lg:text-[2.18rem] text-[#C1C4C9] opacity-80"># 공모전</span>
          <span className="text-2xl lg:text-[2.18rem] text-[#C1C4C9] opacity-80"># 사이드 프로젝트</span>
        </div>
      </div>
    </div>
  )
}

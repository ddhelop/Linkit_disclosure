import Image from 'next/image'

export default function IntroComponent2() {
  return (
    <>
      <div className="w-full bg-[#F0F2F6]  snap-start h-screen flex flex-col items-center min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div className="w-full h-[80%] flex flex-col justify-center items-center pl-[11rem]  bg-[#fff]">
          <div className="w-[1200px] flex flex-col relative">
            <span className="text-[2.625rem] font-bold text-left mt-24">
              자유로운
              <br />
              자기 PR의 공간
            </span>
            <span className="text-[1.25rem] font-medium text-grey70 pt-8 leading-8 text-left">
              링킷에서 자유롭게 나를 홍보하세요,
              <br />
              수도권 대학 20여개 학생들이 함께 합니다.
            </span>

            {/* profile2 */}
            <div className="w-[16.2rem] h-[22.3rem] p-5 opacity-80 absolute rounded-xl left-[49.5rem] top-[4.6rem] shadow-card-shadow">
              <span className="text-[1.25rem] font-bold ">
                레드닷 디자인 어워드,
                <br />
                기술 스택 보유자를 구해요!
              </span>

              <div className="flex flex-col items-center pt-3 gap-1">
                <Image
                  src={'/assets/intro/profile2.jpg'}
                  width={95}
                  height={95}
                  alt="profile"
                  className="rounded-[2.1rem]"
                />
                <span className="text-[#2563EB] font-bold text-[0.7rem] pt-3">SeonJun</span>
                <span className="text-grey60 font-semibold text-[0.7rem]">디자이너, UX 리서치</span>
              </div>

              <div className="w-full h-[2.7rem] bg-grey10 mt-2 flex items-center justify-center">
                💬
                <span className="font-semibold pl-3 text-[0.75rem]">마음것 소통을 통한 밀도있는 프로젝트</span>
              </div>

              <div className="flex w-full justify-between pt-3">
                <div className="w-28 h-9 rounded-md bg-grey10 flex justify-center items-center text-grey90 font-semibold cursor-pointer text-xs">
                  찜하기
                </div>
                <div className="w-28 h-9 rounded-md bg-grey100 flex justify-center items-center text-[#fff] font-semibold cursor-pointer text-xs">
                  등록하기
                </div>
              </div>
            </div>

            {/* profile1 */}
            <div className="w-[22.1rem] h-[31.3rem] p-6 flex flex-col absolute rounded-xl left-[32rem] top-0 shadow-card-shadow bg-[#fff]">
              <span className="text-[1.57rem] font-bold ">
                다이슨 어워드에 나갈
                <br />
                멤버를 찾고있어요
              </span>
              <span className="text-sm font-semibold text-grey60 pt-2">D-56</span>

              {/* profile */}
              <div className="flex flex-col items-center pt-3 gap-1">
                <Image
                  src={'/assets/intro/profile1.jpg'}
                  width={125}
                  height={125}
                  alt="profile"
                  className="rounded-[3.1rem]"
                />
                <span className="text-[#2563EB] font-bold text-sm pt-3">유나</span>
                <span className="text-grey60 font-semibold">기획, AI엔지니어, LLM</span>
              </div>

              <div className="w-full h-[3.5rem] bg-grey10 mt-5 flex items-center justify-center">
                💬
                <span className="font-semibold pl-3">공동의 목표를 위해 가감없는 피드백</span>
              </div>

              <div className="flex w-full justify-between pt-4">
                <div className="w-36 h-12 rounded-md bg-grey10 flex justify-center items-center text-grey90 font-semibold cursor-pointer">
                  찜하기
                </div>
                <div className="w-36 h-12 rounded-md bg-grey100 flex justify-center items-center text-[#fff] font-semibold cursor-pointer">
                  등록하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

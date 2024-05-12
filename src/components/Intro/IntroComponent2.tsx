import Image from 'next/image'

export default function IntroComponent2() {
  return (
    <>
      <div className="w-full bg-[#F0F2F6] relative snap-start h-screen flex flex-col items-center min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div className="w-full h-[80%] pt-16 lg:pt-0 flex flex-col lg:justify-center items-center lg:pl-[11rem]  bg-[#fff]">
          <div className="w-full lg:w-[1200px] flex flex-col items-center lg:items-start lg:relative p-1 xs:p-9 lg:p-0">
            <span className="text-[1.8rem] lg:text-[2.625rem] font-bold text-center lg:text-left lg:mt-24 lg:leading-10">
              자유로운
              <br />
              자기 PR의 공간
            </span>
            <span className=" lg:text-[1.25rem] font-medium text-grey70 pt-3 xs:pt-6 lg:pt-8 md:leading-8 text-center lg:text-left">
              링킷에서 자유롭게 나를 홍보하세요,
              <br />
              공모전, 대회, 프로젝트, 창업팀까지
              <br />
              다양한 팀빌딩이 가능해요.
            </span>

            {/* profile2 */}
            <div className="w-[14.75rem] h-[18.2rem] lg:w-[16.2rem] lg:h-[22.3rem] p-5 opacity-80 absolute rounded-xl  top-0 bottom-0 right-0 left-0 mx-auto my-auto translate-x-[4rem] translate-y-[6.9rem] lg:left-[49.5rem] lg:top-[4.6rem] shadow-card-shadow">
              <span className=" lg:text-[1.25rem] font-bold ">
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
                  className="rounded-[1.7rem] lg:rounded-[2.1rem] w-[4.7rem] h-[4.7rem] lg:w-[5.9rem] lg:h-[5.9rem]"
                />
                <span className="text-[#2563EB] font-bold text-[0.7rem] pt-1 lg:pt-3">SeonJun</span>
                <span className="text-grey60 font-semibold text-[0.7rem]">디자이너, UX 리서치</span>
              </div>

              <div className="w-full lg:h-[2.7rem] bg-grey10 mt-2 flex items-center justify-center">
                💬
                <span className="lg:font-semibold lg:pl-3 text-[0.6rem] lg:text-[0.75rem]">
                  마음것 소통을 통한 밀도있는 프로젝트
                </span>
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
            <div className=" w-[16.2rem] h-[24rem] lg:w-[22.1rem] lg:h-[31.3rem] p-6 flex flex-col absolute rounded-xl left-0 right-0 mx-auto my-auto top-0 bottom-0 translate-x-[-3.4rem] translate-y-[6.8rem] lg:left-[32rem] lg:top-0 shadow-card-shadow bg-[#fff]">
              <span className="text-lg lg:text-[1.57rem] font-bold lg:leading-9">
                다이슨 어워드에 나갈
                <br />
                멤버를 찾고있어요
              </span>
              <span className="text-sm font-semibold text-grey60 pt-2">D-56</span>

              <div className="flex flex-col items-center pt-3 gap-1">
                <Image
                  src={'/assets/intro/profile1.jpg'}
                  width={125}
                  height={125}
                  alt="profile"
                  className="rounded-[2rem] lg:rounded-[3.1rem] w-[5.3rem] h-[5.3rem] lg:w-[7.8rem] lg:h-[7.8rem]"
                />
                <span className="text-[#2563EB] font-bold text-xs lg:text-sm pt-3">유나</span>
                <span className="text-grey60 text-sm lg:text-base font-semibold">기획, AI엔지니어, LLM</span>
              </div>

              <div className="w-full h-[3.5rem] bg-grey10 mt-2 lg:mt-5 flex items-center justify-center text-xs lg:text-base p-2 lg:p-0">
                💬
                <span className="lg:font-semibold pl-3">공동의 목표를 위해 가감없는 피드백</span>
              </div>

              <div className="flex w-full justify-between pt-4 gap-3 lg:gap-0">
                <div className="w-32 lg:w-36 h-11 lg:h-12 rounded-md bg-grey10 flex justify-center items-center text-grey90 font-semibold cursor-pointer text-sm lg:text-base">
                  찜하기
                </div>
                <div className="w-32 lg:w-36 h-11 lg:h-12 rounded-md bg-grey100 flex justify-center items-center text-[#fff] font-semibold cursor-pointer test-sm lg:text-base">
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

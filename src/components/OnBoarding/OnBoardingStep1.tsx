import Image from 'next/image'
import OnBoardingHeader from '../Layout/onBoardingHeader'

export default function OnBoardingStep1() {
  return (
    <>
      <div className="w-full h-screen flex flex-col ">
        <OnBoardingHeader />
        <div className="w-1/3 h-[0.18rem] bg-[#2563EB]"></div>

        <div className="w-full flex flex-col items-center py-20">
          <div className="w-[80%] sm:w-[55%] flex justify-between text-sm font-medium text-grey60 leading-9">
            <span>가이드</span>
            <span>1/3</span>
          </div>

          <div className="w-[80%] sm:w-[55%] flex flex-col items-start leading-9">
            <span className="text-2xl font-bold">링킷에서 활동할 프로필을 선택해주세요</span>
            <span className="text-grey60">
              언제든 두 프로필 모두 만들 수 있어요. 먼저 만들 프로필 양식을 선택해주세요
            </span>
          </div>

          <div className="flex flex-col lg:flex-row w-[55%] gap-[0.5rem] pt-16 items-center">
            {/* left box */}
            <div className="w-[350px] sm:w-[418px] h-56 border rounded-xl border-grey30 shadow-box-shadow3 flex flex-col p-7 justify-between">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <span className="text-xs leading-5">내 이력서</span>
                  <span className="font-semibold w-44 h-20 leading-5 pt-3">
                    뛰어난 팀 안에서 내 역량을 발휘하고 싶어요
                  </span>
                </div>
                <Image
                  src="/assets/icons/Default profile.svg"
                  width={100}
                  height={100}
                  alt="profile icon"
                  className="rounded-lg xl:flex lg:hidden flex"
                />
              </div>

              {/* button */}
              <div className="w-full flex justify-center">
                <div className="flex w-44 h-11 bg-[#282C31] hover:bg-[#3c4249] rounded-full justify-center items-center gap-x-3 pl-2 cursor-pointer ">
                  <span className="text-sm text-[#fff]">내 이력서 등록하기</span>
                  <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
                </div>
              </div>
            </div>

            {/* right box */}
            <div className="w-[350px] sm:w-[418px] h-56 border rounded-xl border-grey30 shadow-box-shadow3 flex flex-col p-7 justify-between">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <span className="text-xs leading-5">팀 소개서</span>
                  <span className="font-semibold w-48 leading-5 pt-3">
                    우리팀에 필요한 역량을 가진 멤버를 구하고 싶어요
                  </span>
                </div>
                <Image
                  src="/assets/icons/Team.svg"
                  width={100}
                  height={100}
                  alt="profile icon"
                  className="rounded-lg xl:flex lg:hidden flex"
                />
              </div>

              {/* button */}
              <div className="w-full flex justify-center">
                <div className="flex w-44 h-11 bg-[#282C31] hover:bg-[#3c4249] rounded-full justify-center items-center gap-x-3 pl-2 cursor-pointer">
                  <span className="text-sm text-[#fff]">팀 소개서 등록하기</span>
                  <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

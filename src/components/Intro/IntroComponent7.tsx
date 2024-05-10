import Image from 'next/image'

export default function IntroComponent7() {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(180deg, #F1F3F7 19.19%, rgba(252, 252, 253, 0) 112.86%), url("/assets/intro/section7bg.png")',
      }}
      className="w-full snap-start h-screen flex flex-col justify-center items-center  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden py-24"
    >
      <div className="w-[1200px] flex">
        {/* left */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className=" flex flex-col items-left pb-20">
            <div className="p-[0.6rem] w-[9.75rem] bg-[#fff] rounded-lg">2. 간결한 매칭 서비스</div>
            <span className="text-[2.62rem] font-bold pt-3 leading-[3.625rem] text-left">
              프로필만 등록하면
              <br />
              쏟아지는 추천 매칭
              <br />
              <span className="text-xl text-grey70 font-medium pt-5 text-center leading-8">
                항목에 맞게 프로필만 등록해도 다른 사용자들이 매칭을 요청해요
              </span>
            </span>
          </div>
        </div>
        {/* right */}

        <div className="w-[50%] h-full flex flex-col gap-3 pt-2  justify-center">
          <div className="w-[41rem] flex flex-col gap-4 items-center">
            <div className="flex justify-start w-full">
              <div className="text-[1.36rem] font-bold">내가 받은 매칭</div>
            </div>
            <div className="w-full h-[7.1rem] flex items-center bg-[#fff] rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
              <Image src={'/assets/intro/profile3.png'} width={75} height={75} alt="profile" />
              <div className="flex flex-col pl-5">
                <span className="font-semibold text-[1.1rem]">Jina kim</span>
                <span className=" text-[0.82rem]">안녕하세요, AI 프로젝트 everywhere의 김진아입니다!...</span>
              </div>
              <div className="flex  h-full items-end gap-1 pl-11">
                <div className="cursor-pointer w-24 h-9 bg-[#2563EB] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  수락
                </div>
                <div className="cursor-pointer w-24 h-9 bg-[#7E7E7E] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  거절
                </div>
              </div>
            </div>

            <div className="w-[33.5rem] h-[5rem] flex items-center bg-[#fff] rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
              <Image src={'/assets/intro/profile4.png'} width={60} height={60} alt="profile" className="rounded-full" />
              <div className="flex flex-col pl-5">
                <span className="font-semibold text-[0.75rem]">최서윤</span>
                <span className=" text-[0.58rem]">저는 현재 경영학과 학사 과정에 있으며, 콘텐츠 마케팅을... </span>
              </div>
              <div className="flex  h-full items-end gap-1 pl-11">
                <div className="cursor-pointer w-[4.4rem] h-[1.4rem] bg-[#2563EB] rounded-[0.29rem] text-[0.53rem] flex items-center justify-center text-[#fff]">
                  수락
                </div>
                <div className="cursor-pointer w-[4.4rem] h-[1.4rem] bg-[#7E7E7E] rounded-[0.29rem] text-[0.53rem] flex items-center justify-center text-[#fff]">
                  거절
                </div>
              </div>
            </div>

            <div className="flex gap-5 pr-8">
              <Image src={'assets/icons/blue_right_arrow.svg'} width={20} height={1} alt="right arrow" className="" />

              <div className="w-[31.5rem] h-[4.69rem] backdrop-blur-[53px] flex items-center bg-white-alpha-20 rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
                <Image
                  src={'/assets/intro/profile4.png'}
                  width={60}
                  height={60}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="w-full flex flex-col pl-5">
                  <span className="font-semibold text-[0.7rem]">박서연님께 매칭 요청을 보냈습니다.</span>
                  <span className=" text-[0.58rem]">안녕하세요, 공모전 참여건으로 문의 드립니다... </span>
                </div>
                <div className="flex h-full items-end justify-end gap-1 pl-11">
                  <div className="cursor-pointer w-[4.4rem] h-[1.4rem] bg-[#BBBBBB78] rounded-[0.29rem] text-[0.53rem] flex items-center justify-center text-[#fff]">
                    매칭 대기중
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

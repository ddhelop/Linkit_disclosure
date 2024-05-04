import Image from 'next/image'

export default function IntroComponent2() {
  return (
    <>
      <div className="relative snap-start h-screen flex flex-col min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div className="w-full h-[55%] bg-[#F6F8FC] flex flex-col pt-24 pl-[11rem] relative">
          <span className="text-5xl font-bold">자유로운</span>
          <span className="text-5xl font-bold pt-4">자기 PR의 공간</span>

          <span className="text-[1.375rem] font-medium text-grey70 pt-8">링킷에서 자유롭게 나를 홍보하세요,</span>
          <span className="text-[1.375rem] font-medium text-grey70 pt-1">수도권 대학 20여개 학생들이 함께 합니다.</span>

          <div className="w-[19.5rem] h-[26.9rem] absolute bg-[#CBD4E1] rounded-xl right-6 top-[9.5rem]"></div>
          <div className="w-[24.5rem] h-[33.8rem] absolute bg-[#E2E8F0] rounded-xl right-60"></div>
        </div>
      </div>
    </>
  )
}

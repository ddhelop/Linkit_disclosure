import Image from 'next/image'

export default function MatchingTeamMiniProfile() {
  return (
    <div className="flex w-[21rem] flex-col bg-[#fff] p-5">
      <div className="flex justify-between gap-5">
        <p className="text-xl font-semibold">2024 회화과 졸업사이트 개발 맡아주실 프론트 구해요</p>
        <Image src="/assets/icons/saveIcon.svg" width={20} height={20} alt="close" />
      </div>

      <div className="mt-8 flex">
        <div className="rounded-[0.45rem] bg-grey10 px-[0.57rem] py-1 text-sm text-grey60">홍익대 졸업전시</div>
      </div>

      <div className="mt-[0.94rem] flex justify-between">
        <div className="flex gap-4">
          <Image src="/assets/images/DefaultProfile.png" width={45} height={45} alt="heart" className="rounded-full" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-grey70">Kim mina</p>
            <p className="text-sm text-grey60">서양화과</p>
          </div>
        </div>

        <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.56rem] text-[#fff]">보기</button>
      </div>
    </div>
  )
}

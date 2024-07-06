import Image from 'next/image'

export default function TeamMemberMiniProfile() {
  return (
    <>
      <div className="flex w-[23rem] flex-col gap-[2.69rem] rounded-[0.63rem] bg-[#fff] p-5">
        <div className="flex w-full justify-between">
          <p className="text-sm font-semibold text-[#2563EB]">D-12</p>
          <Image src="/assets/icons/saveIcon.svg" width={17} height={20} alt="save" className="cursor-pointer" />
        </div>

        <div className="w-[80%] text-xl font-semibold leading-8 opacity-80">
          ’앱 수익화 목적’ 사이드 프로젝트 개발자 팀원 구합니다.
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap">
            <div className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-1 text-[#2563EB]">
              2024 레드닷 수상
            </div>
          </div>

          <div className="flex justify-between pt-[0.94rem]">
            <div className="flex gap-4">
              <Image
                src="/assets/images/DefaultProfile.png"
                width={55}
                height={55}
                alt="Image"
                className="rounded-full"
              />
              <div className="flex flex-col justify-center gap-1">
                <p className="font-semibold text-grey70">Sukki</p>
                <p className="text-sm text-grey60">리서치, UXUI 디자인</p>
              </div>
            </div>
            <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.57rem] text-[#fff]">보기</button>
          </div>
        </div>
      </div>
    </>
  )
}

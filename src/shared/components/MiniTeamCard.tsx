import Image from 'next/image'

export default function MiniTeamCard() {
  return (
    <div
      className="flex w-[28.125rem] flex-col rounded-xl bg-white px-7 py-[1.12rem]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">팀 찾는중</div>
          <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">팀 찾는중</div>
          <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">+2</div>
        </div>
        <Image src="/common/icons/not_save.svg" alt="close" width={20} height={20} className="cursor-pointer" />
      </div>

      <div className="mt-5 flex gap-4">
        <Image src="/common/default_profile.svg" alt="folder" width={70} height={70} />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-grey90">팀이름</span>
            <span className="text-xs text-grey70">스크랩수 50</span>
          </div>

          <div className="mt-1 flex flex-col ">
            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">팀원</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">5인</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">지역</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">서울시 마포구</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-grey90">
        한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개...
      </div>
    </div>
  )
}

import Image from 'next/image'

export default function TeamEditProduct() {
  return (
    <div className="mt-5 flex flex-col gap-5">
      {/* 단일 요소 */}
      <div className="flex flex-col gap-5 rounded-lg bg-white p-[1.76rem]">
        {/* 프로필 */}
        <div className="flex gap-[0.8rem]">
          <Image src="/common/default_profile.svg" alt="default profile" width={48} height={48} />

          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-grey80">프로덕트명</span>
              <span className="text-[0.5rem] text-grey60">|</span>
              <span className="text-xs font-normal text-grey60">2024.10.27 ~ 진행 중</span>
            </div>
            <span className="text-xs text-grey70">
              한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
            </span>
          </div>
        </div>

        <hr />

        {/* 링크 */}
        <div className="flex gap-[0.8rem]">
          {/*  */}
          <div className="flex cursor-pointer gap-1 rounded-lg bg-grey10 py-2 pl-4 pr-12 text-xs text-grey80 hover:bg-grey30">
            <span>홈페이지1</span>
            <Image src="/common/icons/share.svg" alt="link" width={14} height={14} />
          </div>

          {/*  */}
          <div className="flex cursor-pointer gap-1 rounded-lg bg-grey10 py-2 pl-4 pr-12 text-xs text-grey80 hover:bg-grey30">
            <span>홈페이지2</span>
            <Image src="/common/icons/share.svg" alt="link" width={14} height={14} />
          </div>
        </div>
        <div className="rounded-lg bg-grey10 p-4 text-xs font-normal text-grey70">
          내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용...
        </div>
      </div>
    </div>
  )
}

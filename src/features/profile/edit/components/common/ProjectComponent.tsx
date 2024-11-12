import Image from 'next/image'

export default function ProjectComponent() {
  return (
    <div className="relative flex gap-6 rounded-xl bg-grey10 px-6 py-7">
      <Image
        src="/common/icons/more_row.svg"
        width={22}
        height={22}
        alt="more"
        className="absolute right-5 top-5 cursor-pointer"
      />
      <Image src="/common/images/no_thumbnail.svg" width={256} height={144} alt="no_thumbnail" />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">프로젝트명</span>
          <span className="flex items-center rounded-[62.5rem] bg-[#D3E1FE] px-[0.88rem] text-xs">팀</span>
        </div>

        <div className="mt-3 text-xs font-normal text-grey60">
          한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
        </div>

        <div className="mt-[1.12rem] flex gap-1 text-xs text-grey70">
          <span className="text-grey60">기간 | </span>2024.06 ~ 2024.11
        </div>
        <div className="mt-2 flex gap-1 text-xs text-grey70">
          <span className="text-grey60">역할 |</span> 컨텐츠 제작, 브랜딩, 계정 관리
        </div>
      </div>
    </div>
  )
}

import ContentLayout from '@/components/Resume/MyResume/Contents/ContentLayout'
import TeamContentLayout from '@/components/Resume/TeamResume/Contents/ContentLayout'
import TeamResumeNav from '@/components/Resume/TeamResume/Nav/TeamResumeNav'
import Link from 'next/link'

export default function TeamResumePage() {
  return (
    <div className="flex flex-col pt-[70px]">
      {/* Header */}
      <div className="flex h-[4rem] w-full items-center gap-[3.17rem] bg-[#fff] px-[9.72rem]">
        <Link href={'/myResume'}>
          <span className="cursor-pointer  text-lg text-grey100 opacity-50">내 이력서</span>
        </Link>
        <Link href={'/TeamResume'}>
          <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-lg ">팀 소개서</span>
        </Link>
      </div>

      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-6">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <TeamResumeNav />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <TeamContentLayout />
        </div>
      </div>
    </div>
  )
}

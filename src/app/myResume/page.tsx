import ContentLayout from '@/components/Resume/MyResume/Contents/ContentLayout'
import MyResumNav from '@/components/Resume/MyResume/Nav/MyResumeNav'

export default function MyResumePage() {
  return (
    <div className="flex flex-col pt-[70px]">
      {/* Header */}
      <div className="flex h-[4rem] w-full items-center gap-[3.17rem] bg-[#fff] px-[9.72rem]">
        <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-lg text-grey100">내 이력서</span>
        <span className="cursor-pointer text-lg text-grey100 opacity-50">팀 소개서</span>
      </div>

      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-6">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <MyResumNav />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <ContentLayout />
        </div>
      </div>
    </div>
  )
}

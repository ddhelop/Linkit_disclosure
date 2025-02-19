import FindAnnouncementFilter from '@/features/find/components/filters/FindAnnouncementFilter'
import AnnouncementFilterResult from '@/features/find/components/resultFilter/AnnouncementFilterResult'

export default function FindAnnouncementPage() {
  return (
    <div className={`relative w-full pb-20`}>
      {/* 고정된 배경 이미지 */}
      <div
        className="absolute right-0 top-0 h-[14.1rem] w-full"
        style={{
          backgroundImage: `url('/common/images/find_announcement_background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>
      {/* 컨텐츠 컨테이너 */}
      <div className="relative flex w-full justify-center">
        <div className="flex w-[95%] flex-col pt-9 lg:w-[78%]">
          <div className="flex flex-col gap-2 lg:px-16">
            <h1 className="text-grey30">모집 공고</h1>
            <span className="text-2xl font-semibold text-white">
              모집 중인 공고를 확인하고 원하는 팀에 지원해 보세요
            </span>
          </div>

          {/* 필터 */}
          <div className="mt-[2.19rem]">
            <FindAnnouncementFilter />
          </div>

          {/* 필터링 결과 */}
          <div className="mt-12">
            <AnnouncementFilterResult />
          </div>
        </div>
      </div>
    </div>
  )
}

import FindAnnouncementFilter from '@/features/find/components/FindAnnouncementFilter'
import AnnouncementFilterResult from '@/features/find/components/resultFilter/AnnouncementFilterResult'

export default function FindAnnouncementPage() {
  return (
    <div className={`relative h-[calc(100vh-14.1rem)] w-full`}>
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
      <div className="relative flex w-full justify-center" style={{ zIndex: 1 }}>
        <div className="flex w-[78%] flex-col pt-9">
          <div className="flex flex-col gap-2 px-16">
            <h1 className="text-grey30">모집 공고</h1>
            <span className="text-2xl font-semibold text-white">각 팀에서 진행 중인 공고를 보고 지원 해보세요!</span>
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

import FindTeamFilter from '@/features/find/components/FindTeamFilter'

export default function FindTeamPage() {
  return (
    <div className={`relative h-[calc(100vh-14.1rem)] w-full`}>
      {/* 고정된 배경 이미지 */}
      <div
        className="absolute right-0 top-0 h-[14.1rem] w-full"
        style={{
          backgroundImage: `url('/common/images/find_team_background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>
      {/* 컨텐츠 컨테이너 */}
      <div className="relative flex w-full justify-center" style={{ zIndex: 1 }}>
        <div className="flex w-[78%] flex-col pt-9">
          <div className="flex flex-col gap-2 px-16">
            <h1 className="text-grey30">팀 찾기</h1>
            <span className="text-2xl font-semibold text-white">
              사이드 프로젝트부터 창업까지, 합류하고 싶은 팀을 찾아보세요
            </span>
          </div>
          {/* 필터 */}
          <div className="mt-[2.19rem]">
            <FindTeamFilter />
          </div>
        </div>
      </div>
    </div>
  )
}

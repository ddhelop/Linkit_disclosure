'use client'

export default function AnnouncementCardSkeleton() {
  return (
    <div className="flex min-w-[17rem] flex-col gap-3 border-t border-grey40 px-[1.62rem] py-[1.38rem] md:min-w-[unset]">
      <div className="flex justify-between">
        {/* 모집 상태 스켈레톤 */}
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>

        {/* 스크랩 아이콘 스켈레톤 */}
        <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      {/* 팀 정보 스켈레톤 */}
      <div className="flex items-center gap-2">
        {/* 팀 로고 스켈레톤 */}
        <div className="h-[22px] w-[22px] animate-pulse rounded-lg bg-gray-200"></div>

        {/* 팀 이름 스켈레톤 */}
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* 공고 제목 및 스크랩 수 스켈레톤 */}
      <div className="flex w-[90%] flex-col gap-1">
        <div className="h-6 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* 포지션 태그 스켈레톤 */}
      <div className="flex gap-2">
        <div className="h-8 w-24 animate-pulse rounded-[0.38rem] bg-gray-200"></div>
      </div>
    </div>
  )
}

'use client'

export default function MiniProfileCardSkeleton() {
  return (
    <div
      className="flex min-w-[16rem] flex-col rounded-xl border border-transparent bg-white p-[1.12rem] px-7 md:min-w-[unset]"
      style={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        margin: '1px',
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {/* 상태 태그 스켈레톤 */}
          <div className="h-6 w-16 animate-pulse rounded-[0.38rem] bg-gray-200"></div>
          <div className="h-6 w-8 animate-pulse rounded-[0.38rem] bg-gray-200"></div>
        </div>

        {/* 스크랩 버튼 스켈레톤 */}
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      {/* 프로필 정보 스켈레톤 */}
      <div className="mt-5 flex gap-4">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="h-[70px] w-[70px] animate-pulse rounded-lg bg-gray-200"></div>

        <div className="flex flex-col justify-center gap-1">
          {/* 이름 스켈레톤 */}
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>

          {/* 포지션 스켈레톤 */}
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>

          {/* 지역 스켈레톤 */}
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

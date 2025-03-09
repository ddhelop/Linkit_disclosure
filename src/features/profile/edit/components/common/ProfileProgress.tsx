'use client'
import { useQuery } from '@tanstack/react-query'
import { getProfileDetail } from '@/features/profile-view/api/ProfileViewApi'

export default function ProfileProgress({ emailId }: { emailId: string }) {
  const { data } = useQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000, // 1분 동안 캐싱 유지
  })

  // 프로필 완성도 (progress)를 가져옵니다.
  const progress = data?.result?.profileCompletionMenu?.profileCompletion || 0

  return (
    <div className="flex w-[17.5rem] flex-col gap-4 rounded-lg border border-grey40 px-[0.94rem] py-5">
      <div className="mb-1 text-grey80">프로필 완성도</div>
      <div className="relative h-1.5 rounded-full bg-grey40">
        {/* 시작 지점 동그라미 */}
        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-blue-500"></div>

        {/* 프로그레스 바 */}
        <div
          className="absolute z-10 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
          style={{ width: `${progress}%` }}
        ></div>

        {/* 완료 지점 도형 (마름모 모양) */}
        {progress > 0 && (
          <div
            className="absolute top-1/2 z-10 h-3 w-3 -translate-y-1/2 rotate-45 transform bg-teal-400"
            style={{ left: `calc(${progress}% - 0.75rem)` }}
          ></div>
        )}

        {/* 끝 지점 동그라미 */}
        {progress > 0 && (
          <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-grey40"></div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import MiniProfileCardSkeleton from '@/shared/components/MiniProfileCardSkeleton'
import { getStaticFindPrivateData, getFindPrivateProfile } from '../api/FindPrivateApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { SearchParams } from '../FindPrivateType'
import { usePrivateFilterStore } from '../store/usePrivateFilterStore'

export default function FindPrivateResult() {
  const searchParams = useSearchParams()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 스켈레톤 UI가 갑자기 나타나고 사라지는 것을 방지하기 위한 상태
  const [showSkeleton, setShowSkeleton] = useState(false)

  // Zustand 스토어에서 필터 상태 가져오기
  const { filters } = usePrivateFilterStore()

  // URL 파라미터에서 검색 조건 추출 - Zustand 스토어 사용
  const params: SearchParams = {
    subPosition: filters.subPositions,
    cityName: filters.cityNames,
    profileStateName: filters.profileStateNames,
    skillName: searchParams.getAll('skillName'), // 스킬은 URL 파라미터에서 가져옴
    size: 20,
  }

  // 필터 적용 여부 확인 - Zustand 스토어 사용
  const isFilterApplied = () => {
    return (
      filters.subPositions.length > 0 ||
      params.skillName.length > 0 ||
      filters.cityNames.length > 0 ||
      filters.profileStateNames.length > 0
    )
  }

  // 정적 프로필 데이터 가져오기
  const { data: staticProfiles, isLoading: isStaticLoading } = useQuery({
    queryKey: ['staticFindPrivateData'],
    queryFn: getStaticFindPrivateData,
  })

  // 무한 스크롤을 위한 프로필 데이터 가져오기
  const {
    data: infiniteProfiles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['infinitePrivateProfiles', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getFindPrivateProfile({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인하고, 있다면 마지막 프로필의 emailId를 cursor로 사용
      const profiles = lastPage.result.content
      if (profiles.length > 0 && lastPage.result.hasNext) {
        return profiles[profiles.length - 1].emailId
      }
      return undefined
    },
  })

  // 무한 스크롤 설정
  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        {
          threshold: 0.1,
          // rootMargin을 사용하여 요소가 화면에 보이기 전에 미리 감지
          // 아래쪽으로 20% 더 확장된 영역을 관찰 영역으로 설정
          rootMargin: '0px 0px 20% 0px',
        },
      )

      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  // 로딩 상태가 변경될 때 부드러운 전환을 위한 효과
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isFetching || isInfiniteLoading) {
      // 로딩이 시작되면 즉시 스켈레톤 표시
      setShowSkeleton(true)
    } else {
      // 로딩이 끝나면 약간의 지연 후 스켈레톤 숨김 (부드러운 전환을 위해)
      timeoutId = setTimeout(() => {
        setShowSkeleton(false)
      }, 300)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isFetching, isInfiniteLoading])

  // 모든 프로필 데이터 합치기
  const allProfiles = infiniteProfiles?.pages.flatMap((page) => page.result.content) || []

  // 데이터 로딩 상태 - 초기 로딩이나 필터 변경시 로딩
  const isLoadingResults = showSkeleton || isInfiniteLoading

  // 스켈레톤 UI 렌더링 함수
  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <MiniProfileCardSkeleton key={`skeleton-${index}`} />)
  }

  return (
    <main className="flex flex-col gap-6 md:px-12">
      {/* 완성도 높은 팀원 (필터가 없을 때만 표시) */}
      {!isFilterApplied() && (
        <section aria-labelledby="top-profiles-heading">
          <h2 id="top-profiles-heading" className="text-lg font-semibold text-black">
            🔥 프로필 완성도가 가장 높은 팀원이에요!
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {isStaticLoading
              ? renderSkeletons(6) // 상위 프로필 로딩 중 스켈레톤 6개 표시
              : staticProfiles?.result?.topCompletionProfiles?.map((profile, index) => (
                  <article key={`${profile.emailId}-${index}`}>
                    <MiniProfileCard_2 profile={profile} />
                  </article>
                ))}
          </div>
        </section>
      )}

      {/* 필터링된 프로필 리스트 */}
      <section aria-labelledby="profile-list-heading">
        <h2 id="profile-list-heading" className="text-lg font-semibold text-black">
          {isFilterApplied() ? '검색 결과' : '🔍 나에게 필요한 팀원을 더 찾아보세요!'}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoadingResults
            ? renderSkeletons(12) // 무한 스크롤 데이터 로딩 중 스켈레톤 12개 표시
            : allProfiles.map((profile, index) => (
                <article key={`${profile.emailId}-${index}`}>
                  <MiniProfileCard_2 profile={profile} />
                </article>
              ))}
        </div>
      </section>

      {/* 추가 데이터 로딩 중 스켈레톤 UI */}
      {isFetchingNextPage && (
        <section aria-label="추가 데이터 로딩 중">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {renderSkeletons(6)} {/* 추가 로딩 시 스켈레톤 6개 표시 */}
          </div>
        </section>
      )}

      {/* 무한 스크롤을 위한 관찰 요소 */}
      <div ref={loadMoreRef} className="h-10" aria-hidden="true" />

      {/* 필터링된 결과가 없을 때 */}
      {isFilterApplied() && allProfiles.length === 0 && !isLoadingResults && (
        <section aria-label="검색 결과 없음" className="py-10 text-center">
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </section>
      )}
    </main>
  )
}

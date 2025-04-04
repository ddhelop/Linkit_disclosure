'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import AnnouncementCard from '@/shared/components/AnnouncementCard'
import { FindAnnouncementSearchParams } from '../FindAnnouncementType'
import { getFindAnnouncementProfile, getStaticFindAnnouncementData } from '../api/FindAnnouncementApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import AnnouncementCardSkeleton from '@/shared/components/AnnouncementCardSkeleton'
import SortToggleButtons from '@/features/find/ui/\bSortToggleButtons'
import { useFilterStore } from '../store/useFilterStore'

export default function AnnouncementFilterResult() {
  const searchParams = useSearchParams()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 스켈레톤 UI가 갑자기 나타나고 사라지는 것을 방지하기 위한 상태
  const [showSkeleton, setShowSkeleton] = useState(false)

  // Zustand 스토어에서 필터 상태 가져오기
  const { filters } = useFilterStore()

  // URL 파라미터에서 검색 조건 추출 - Zustand 스토어 사용
  const params: FindAnnouncementSearchParams = {
    subPosition: filters.subPositions,
    cityName: filters.cityNames,
    scaleName: filters.scaleName,
    projectType: filters.projectType,
    size: 20,
  }

  const isFilterApplied = () => {
    return (
      filters.subPositions.length > 0 ||
      filters.cityNames.length > 0 ||
      filters.scaleName.length > 0 ||
      filters.projectType.length > 0
    )
  }

  // 정적 프로필 데이터 가져오기
  const { data: staticAnnouncements, isLoading: isStaticLoading } = useQuery({
    queryKey: ['staticFindAnnouncementData'],
    queryFn: getStaticFindAnnouncementData,
  })

  const sortBy = searchParams.get('sortBy')
  // 무한 스크롤을 위한 프로필 데이터 가져오기
  const {
    data: infiniteAnnouncements,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['infiniteAnnouncements', params, sortBy],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getFindAnnouncementProfile({ ...params, cursor: pageParam, sortBy }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인하고, 있다면 마지막 프로필의 emailId를 cursor로 사용
      const announcements = lastPage.result.content
      if (announcements.length > 0 && lastPage.result.hasNext) {
        return announcements[announcements.length - 1].teamMemberAnnouncementId
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
  const allAnnouncements = infiniteAnnouncements?.pages.flatMap((page) => page.result.content) || []

  // 데이터 로딩 상태 - 초기 로딩이나 필터 변경시 로딩
  const isLoadingResults = showSkeleton

  // 스켈레톤 UI 렌더링 함수
  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <AnnouncementCardSkeleton key={`skeleton-${index}`} variant="wide" />)
  }

  return (
    <main className="flex flex-col md:px-5">
      {!isFilterApplied() && (
        <section aria-labelledby="hot-announcements-heading">
          <h2 id="hot-announcements-heading" className="text-lg font-semibold text-black">
            🔥 지금 핫한 공고예요!
          </h2>

          <div className="mt-6 grid grid-cols-1">
            {isStaticLoading
              ? renderSkeletons(6)
              : staticAnnouncements?.result?.hotAnnouncements?.map((announcement, index) => (
                  <AnnouncementCard key={`announcement-${index}`} announcement={announcement} variant="wide" />
                ))}
          </div>
        </section>
      )}

      {/* 공고 리스트 */}
      <section aria-labelledby="announcement-list-heading">
        <div className="flex w-full items-center justify-between">
          <h2 id="announcement-list-heading" className="mt-5 text-lg font-semibold text-black">
            {isFilterApplied() ? '검색 결과' : '🔍 나에게 맞는 모집 공고를 더 찾아보세요!'}
          </h2>
          <div className="hidden md:block">{isFilterApplied() && <SortToggleButtons />}</div>
        </div>

        {/* 스켈레톤 UI와 결과 목록 간의 부드러운 전환을 위한 컨테이너 */}
        <div className="mt-6 grid grid-cols-1">
          {isLoadingResults
            ? renderSkeletons(6)
            : allAnnouncements.map((announcement, index) => (
                <AnnouncementCard key={`announcement-${index}`} announcement={announcement} variant="wide" />
              ))}
        </div>
      </section>

      {/* 추가 데이터 로딩 중 스켈레톤 UI */}
      {isFetchingNextPage && (
        <section aria-label="추가 데이터 로딩 중">
          <div className="grid grid-cols-1">
            {renderSkeletons(3)} {/* 추가 로딩 시 스켈레톤 3개 표시 */}
          </div>
        </section>
      )}

      {/* 무한 스크롤을 위한 관찰 요소 */}
      <div ref={loadMoreRef} className="h-10" aria-hidden="true" />

      {/* 필터링된 결과가 없을 때 */}
      {isFilterApplied() && allAnnouncements.length === 0 && !isLoadingResults && (
        <section aria-label="검색 결과 없음" className="py-10 text-center">
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </section>
      )}
    </main>
  )
}

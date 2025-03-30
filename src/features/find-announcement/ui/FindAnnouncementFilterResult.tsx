'use client'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

import AnnouncementCard from '@/shared/components/AnnouncementCard'
import { FindAnnouncementSearchParams } from '../FindAnnouncementType'
import { getFindAnnouncementProfile, getStaticFindAnnouncementData } from '../api/FindAnnouncementApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import AnnouncementCardSkeleton from '@/shared/components/AnnouncementCardSkeleton'

export default function AnnouncementFilterResult() {
  const searchParams = useSearchParams()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // URL 파라미터에서 검색 조건 추출
  const params: FindAnnouncementSearchParams = {
    subPosition: searchParams.getAll('subPosition'),
    cityName: searchParams.getAll('cityName'),
    scaleName: searchParams.getAll('scaleName'),
    projectType: searchParams.getAll('projectType'),
    size: 20,
  }

  const isFilterApplied = () => {
    return (
      searchParams.getAll('subPosition').length > 0 ||
      searchParams.getAll('cityName').length > 0 ||
      searchParams.getAll('scaleName').length > 0 ||
      searchParams.getAll('projectType').length > 0
    )
  }

  // 정적 프로필 데이터 가져오기
  const { data: staticAnnouncements, isLoading: isStaticLoading } = useQuery({
    queryKey: ['staticFindAnnouncementData'],
    queryFn: getStaticFindAnnouncementData,
  })

  // 무한 스크롤을 위한 프로필 데이터 가져오기
  const {
    data: infiniteAnnouncements,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
  } = useInfiniteQuery({
    queryKey: ['infiniteAnnouncements', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getFindAnnouncementProfile({ ...params, cursor: pageParam }),
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

  // 모든 프로필 데이터 합치기
  const allAnnouncements = infiniteAnnouncements?.pages.flatMap((page) => page.result.content) || []

  // 스켈레톤 UI 렌더링 함수
  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <AnnouncementCardSkeleton key={`skeleton-${index}`} variant="wide" />)
  }

  return (
    <main className="flex flex-col md:px-12">
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
        <h2 id="announcement-list-heading" className="text-lg font-semibold text-black">
          {isFilterApplied() ? '검색 결과' : '🔍 나에게 맞는 모집 공고를 더 찾아보세요!'}
        </h2>
        <div className="mt-6 grid grid-cols-1">
          {isInfiniteLoading
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
      {isFilterApplied() && allAnnouncements.length === 0 && !isInfiniteLoading && (
        <section aria-label="검색 결과 없음" className="py-10 text-center">
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </section>
      )}
    </main>
  )
}

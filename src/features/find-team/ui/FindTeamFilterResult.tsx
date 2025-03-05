'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import { getFindTeam } from '../../find/api/FindApi'
import { Team, TeamSearchParams } from '../../find/types/FindTypes'
import { FindTeamSearchParams } from '../FindTeamType'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getStaticFindTeamData } from '../api/FindTeamApi'
import { getFindTeamProfile } from '@/features/find-private/api/FindTeamApi'
import MiniProfileCardSkeleton from '@/shared/components/MiniProfileCardSkeleton'
import MiniTeamCardSkeleton from '@/shared/components/MiniTeamCardSkeleton'

export default function TeamFilterResult() {
  const searchParams = useSearchParams()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // URL 파라미터에서 검색 조건 추출
  const params: FindTeamSearchParams = {
    scaleName: searchParams.getAll('scaleName'),
    cityName: searchParams.getAll('cityName'),
    teamStateName: searchParams.getAll('teamStateName'),
    size: 20,
  }

  // 필터 적용 여부 확인
  const isFilterApplied = () => {
    return (
      searchParams.getAll('scaleName').length > 0 ||
      searchParams.getAll('cityName').length > 0 ||
      searchParams.getAll('teamStateName').length > 0
    )
  }

  // 정적 프로필 데이터 가져오기
  const { data: staticTeams, isLoading: isStaticLoading } = useQuery({
    queryKey: ['staticFindTeamData'],
    queryFn: getStaticFindTeamData,
    staleTime: 1000 * 60 * 5, // 5분
  })

  // 무한 스크롤을 위한 프로필 데이터 가져오기
  const {
    data: infiniteTeams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
  } = useInfiniteQuery({
    queryKey: ['infiniteTeams', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => getFindTeamProfile({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인하고, 있다면 마지막 프로필의 emailId를 cursor로 사용
      const profiles = lastPage.result.content
      if (profiles.length > 0 && lastPage.result.hasNext) {
        return profiles[profiles.length - 1].teamCode
      }
      return undefined
    },
    staleTime: 1000 * 60 * 5, // 5분
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
  const allTeams = infiniteTeams?.pages.flatMap((page) => page.result.content) || []

  // 스켈레톤 UI 렌더링 함수
  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <MiniTeamCardSkeleton key={`skeleton-${index}`} />)
  }

  return (
    <div className="flex flex-col gap-16 md:px-12">
      {/* 벤처 팀 */}
      {!isFilterApplied() && (
        <div>
          <div className="text-lg font-semibold text-black">🔥 창업을 위한 팀원을 찾고 있어요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            {staticTeams?.result?.ventureTeams?.map((team, index) => (
              <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />
            ))}
          </div>
        </div>
      )}

      {/* 지원 사업 팀 */}
      {/* {supportProjectTeams?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">💰 지원사업을 준비 중인 팀이에요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {supportProjectTeams?.map((team, index) => (
              <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />
            ))}
          </div>
        </div>
      )} */}

      {/* 팀 리스트 */}
      <div>
        <div className="text-lg font-semibold text-black">
          {isFilterApplied() ? '검색 결과' : '🔍 나에게 필요한 팀을 더 찾아보세요!'}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {isInfiniteLoading
            ? renderSkeletons(12)
            : allTeams.map((team, index) => <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />)}
        </div>
      </div>

      {/* 추가 데이터 로딩 중 스켈레톤 UI */}
      {isFetchingNextPage && (
        <div>
          <div className="grid grid-cols-1 gap-6  md:grid-cols-2">
            {renderSkeletons(6)} {/* 추가 로딩 시 스켈레톤 6개 표시 */}
          </div>
        </div>
      )}

      {/* 무한 스크롤을 위한 관찰 요소 */}
      <div ref={loadMoreRef} className="h-10" />

      {/* 필터링된 결과가 없을 때 */}
      {isFilterApplied() && allTeams.length === 0 && !isInfiniteLoading && (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}

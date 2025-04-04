'use client'
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import TeamFilterModal from './TeamFilterModal'
import { useQueryClient } from '@tanstack/react-query'
import { useTeamFilterStore } from '../store/useTeamFilterStore'

export default function FindTeamFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'size' | 'location' | 'status' | null>(null)

  // Zustand 스토어에서 필터 상태와 액션들 가져오기
  const { filters, setFilters, removeSize, removeLocation, removeStatus, resetFilters } = useTeamFilterStore()

  // URL 파라미터에서 필터 상태 가져올 때 사용할 변수
  const selectedSize = filters.scaleNames
  const selectedLocations = filters.cityNames
  const selectedStatus = filters.teamStateNames

  // 컴포넌트 마운트 시 URL 파라미터 확인하여 필터 설정
  useEffect(() => {
    const hasUrlParams =
      searchParams.getAll('scaleName').length > 0 ||
      searchParams.getAll('cityName').length > 0 ||
      searchParams.getAll('teamStateName').length > 0

    // URL 파라미터가 있으면 Zustand 상태 업데이트
    if (hasUrlParams) {
      setFilters({
        scaleNames: searchParams.getAll('scaleName'),
        cityNames: searchParams.getAll('cityName'),
        teamStateNames: searchParams.getAll('teamStateName'),
      })
    } else {
      // URL 파라미터가 없으면 Zustand 스토어 상태(로컬스토리지)로 URL 업데이트
      if (selectedSize.length > 0 || selectedLocations.length > 0 || selectedStatus.length > 0) {
        updateURLParams(filters)
      }
    }
  }, []) // 컴포넌트 마운트 시 한 번만 실행

  // 필터 적용 핸들러
  const handleApplyFilters = (newFilters: { scaleNames: string[]; cityNames: string[]; teamStateNames: string[] }) => {
    // Zustand 스토어 업데이트
    setFilters(newFilters)
    // URL 업데이트
    updateURLParams(newFilters)
  }

  // URL 파라미터 업데이트 함수
  const updateURLParams = useCallback(
    (filtersToApply: { scaleNames: string[]; cityNames: string[]; teamStateNames: string[] }) => {
      // React Query 캐시를 먼저 무효화
      queryClient.invalidateQueries({ queryKey: ['infiniteTeams'] })

      // requestAnimationFrame을 사용하여 브라우저 렌더링 사이클에 맞춰 URL 업데이트
      requestAnimationFrame(() => {
        const params = new URLSearchParams()

        // 각 필터 타입별로 여러 값을 추가
        filtersToApply.scaleNames.forEach((size) => {
          params.append('scaleName', size)
        })

        filtersToApply.cityNames.forEach((city) => {
          params.append('cityName', city)
        })

        filtersToApply.teamStateNames.forEach((state) => {
          params.append('teamStateName', state)
        })

        params.set('page', '0')

        // URL을 업데이트하기만 하고 페이지 리프레시는 하지 않습니다
        router.push(`/find/team?${params.toString()}`, { scroll: false })
      })
    },
    [queryClient, router],
  )

  // 필터 제거 핸들러 - Zustand 액션 사용 및 URL 업데이트
  const handleRemoveSize = (size: string) => {
    removeSize(size)
    updateURLParams({
      ...filters,
      scaleNames: filters.scaleNames.filter((s) => s !== size),
    })
  }

  const handleRemoveLocation = (location: string) => {
    removeLocation(location)
    updateURLParams({
      ...filters,
      cityNames: filters.cityNames.filter((l) => l !== location),
    })
  }

  const handleRemoveStatus = (status: string) => {
    removeStatus(status)
    updateURLParams({
      ...filters,
      teamStateNames: filters.teamStateNames.filter((s) => s !== status),
    })
  }

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    resetFilters()
    updateURLParams({
      scaleNames: [],
      cityNames: [],
      teamStateNames: [],
    })
  }

  const handleSectionClick = (section: 'size' | 'location' | 'status') => {
    setActiveSection(section)
    setIsFilterOpen(true)
  }

  return (
    <>
      <section className="relative space-y-4" aria-label="팀 필터">
        {/* Reset button */}
        <button
          onClick={handleResetFilters}
          className="absolute right-0 top-[-2.3rem] flex items-center gap-1 px-3 py-2 text-sm text-grey70"
          aria-label="필터 초기화"
        >
          <Image src="/common/icons/reset.svg" alt="초기화 아이콘" width={16} height={16} />
          <span className="text-xs sm:text-sm">필터 초기화</span>
        </button>
        <nav
          className="rounded-xl bg-white px-6 py-5"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          aria-label="필터 옵션"
        >
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleSectionClick('size')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="규모 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">규모</h3>
              <p className="hidden text-grey50 md:flex">선호하는 팀 규모를 선택해 주세요</p>
            </button>
            <button
              onClick={() => handleSectionClick('location')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="활동 지역 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">활동 지역</h3>
              <p className="hidden text-grey50 md:flex">선호하는 지역을 선택해 주세요</p>
            </button>
            <button
              onClick={() => handleSectionClick('status')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="현재 상태 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">현재 상태</h3>
              <p className="hidden text-grey50 md:flex">어떤 팀을 찾고 있는지 선택해 주세요</p>
            </button>
          </div>

          {/* 선택된 필터들 표시 */}
          {(selectedSize.length > 0 || selectedLocations.length > 0 || selectedStatus.length > 0) && (
            <ul className="mt-2 flex w-full items-center gap-2 overflow-x-auto" aria-label="선택된 필터 목록">
              {selectedSize.map((size) => (
                <li
                  key={size}
                  onClick={() => handleRemoveSize(size)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 규모: ${size} (클릭하여 제거)`}
                >
                  <span className="text-xs text-main sm:text-sm">{size}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
              {selectedLocations.map((location) => (
                <li
                  key={location}
                  onClick={() => handleRemoveLocation(location)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 지역: ${location} (클릭하여 제거)`}
                >
                  <span className="text-xs text-main sm:text-sm">{location}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
              {selectedStatus.map((status) => (
                <li
                  key={status}
                  onClick={() => handleRemoveStatus(status)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 상태: ${status} (클릭하여 제거)`}
                >
                  <span className="text-xs text-main sm:text-sm">{status}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
            </ul>
          )}
        </nav>
      </section>

      {isFilterOpen && (
        <TeamFilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onApplyFilters={handleApplyFilters}
          initialFilters={{
            scaleNames: selectedSize,
            cityNames: selectedLocations,
            teamStateNames: selectedStatus,
          }}
          activeSection={activeSection}
        />
      )}
    </>
  )
}

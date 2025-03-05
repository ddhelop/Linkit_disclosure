'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import PrivateFilterModal from './FindPrivateFilterModal'

export default function FindPrivateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'position' | 'location' | 'status' | null>(null)

  // URL에서 필터 상태 가져오기 - 여러 값을 배열로 가져오도록 수정
  const selectedPositions = searchParams.getAll('subPosition')
  const selectedLocations = searchParams.getAll('cityName')
  const selectedStatus = searchParams.getAll('profileStateName')

  // 필터 적용 핸들러
  const handleApplyFilters = (filters: {
    subPositions: string[]
    cityNames: string[]
    profileStateNames: string[]
  }) => {
    updateURLParams(filters)
  }

  // URL 파라미터 업데이트 함수
  const updateURLParams = (filters: { subPositions: string[]; cityNames: string[]; profileStateNames: string[] }) => {
    const params = new URLSearchParams()

    // 각 필터 타입별로 여러 값을 추가
    filters.subPositions.forEach((position) => {
      params.append('subPosition', position)
    })

    filters.cityNames.forEach((city) => {
      params.append('cityName', city)
    })

    filters.profileStateNames.forEach((state) => {
      params.append('profileStateName', state)
    })

    params.set('page', '1')
    router.push(`/find/private?${params.toString()}`)
  }

  // 개별 필터 제거 핸들러
  const removePosition = (position: string) => {
    updateURLParams({
      subPositions: selectedPositions.filter((p) => p !== position),
      cityNames: selectedLocations,
      profileStateNames: selectedStatus,
    })
  }

  const removeLocation = (location: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations.filter((l) => l !== location),
      profileStateNames: selectedStatus,
    })
  }

  const removeStatus = (status: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations,
      profileStateNames: selectedStatus.filter((s) => s !== status),
    })
  }

  // 필터 초기화 핸들러
  const resetFilters = () => {
    updateURLParams({
      subPositions: [],
      cityNames: [],
      profileStateNames: [],
    })
  }

  const handleSectionClick = (section: 'position' | 'location' | 'status') => {
    setActiveSection(section)
    setIsFilterOpen(true)
  }

  return (
    <>
      <section className="relative space-y-4" aria-label="프로필 필터">
        {/* Reset button */}
        <button
          onClick={resetFilters}
          className="absolute right-0 top-[-2.3rem] flex items-center gap-1 px-3 py-2 text-xs text-grey70 sm:text-sm"
          aria-label="필터 초기화"
        >
          <Image src="/common/icons/reset.svg" alt="초기화 아이콘" width={16} height={16} />
          <span className="">필터 초기화</span>
        </button>
        <nav
          className="rounded-xl bg-white p-4 sm:px-6 sm:py-5"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          aria-label="필터 옵션"
        >
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleSectionClick('position')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 py-2 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="포지션 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">포지션</h3>
              <p className="hidden text-grey50 md:flex">포지션을 선택해 주세요</p>
            </button>
            <button
              onClick={() => handleSectionClick('location')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 py-2 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="활동 지역 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">활동 지역</h3>
              <p className="hidden text-grey50 md:flex">선호하는 지역을 선택해 주세요</p>
            </button>
            <button
              onClick={() => handleSectionClick('status')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 py-2 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="현재 상태 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">현재 상태</h3>
              <p className="hidden text-grey50 md:flex">어떤 팀원을 찾고 있는지 선택해 주세요</p>
            </button>
          </div>

          {/* 선택된 필터들 표시 */}
          {(selectedPositions.length > 0 || selectedLocations.length > 0 || selectedStatus.length > 0) && (
            <ul className="mt-2 flex w-full items-center gap-2 overflow-x-auto" aria-label="선택된 필터 목록">
              {selectedPositions.map((position) => (
                <li
                  key={position}
                  onClick={() => removePosition(position)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 포지션: ${position} (클릭하여 제거)`}
                >
                  <span className="text-xs text-main sm:text-sm">{position}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
              {selectedLocations.map((location) => (
                <li
                  key={location}
                  onClick={() => removeLocation(location)}
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
                  onClick={() => removeStatus(status)}
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
        <PrivateFilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onApplyFilters={handleApplyFilters}
          initialFilters={{
            subPositions: selectedPositions,
            cityNames: selectedLocations,
            profileStateNames: selectedStatus,
          }}
          activeSection={activeSection}
        />
      )}
    </>
  )
}

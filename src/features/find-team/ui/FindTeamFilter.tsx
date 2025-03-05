'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import TeamFilterModal from './TeamFilterModal'

export default function FindTeamFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'size' | 'location' | 'status' | null>(null)

  // URL에서 필터 상태 가져오기 - 여러 값을 배열로 가져오도록 수정
  const selectedSize = searchParams.getAll('scaleName')
  const selectedLocations = searchParams.getAll('cityName')
  const selectedStatus = searchParams.getAll('teamStateName')

  // 필터 적용 핸들러
  const handleApplyFilters = (filters: { scaleNames: string[]; cityNames: string[]; teamStateNames: string[] }) => {
    updateURLParams(filters)
  }

  // URL 파라미터 업데이트 함수
  const updateURLParams = (filters: { scaleNames: string[]; cityNames: string[]; teamStateNames: string[] }) => {
    const params = new URLSearchParams()

    // 각 필터 타입별로 여러 값을 추가
    filters.scaleNames.forEach((size) => {
      params.append('scaleName', size)
    })

    filters.cityNames.forEach((city) => {
      params.append('cityName', city)
    })

    filters.teamStateNames.forEach((state) => {
      params.append('teamStateName', state)
    })

    params.set('page', '0')
    router.push(`/find/team?${params.toString()}`)
  }

  // 개별 필터 제거 핸들러
  const removeSize = (size: string) => {
    updateURLParams({
      scaleNames: selectedSize.filter((s) => s !== size),
      cityNames: selectedLocations,
      teamStateNames: selectedStatus,
    })
  }

  const removeLocation = (location: string) => {
    updateURLParams({
      scaleNames: selectedSize,
      cityNames: selectedLocations.filter((l) => l !== location),
      teamStateNames: selectedStatus,
    })
  }

  const removeStatus = (status: string) => {
    updateURLParams({
      scaleNames: selectedSize,
      cityNames: selectedLocations,
      teamStateNames: selectedStatus.filter((s) => s !== status),
    })
  }

  // 필터 초기화 핸들러
  const resetFilters = () => {
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
      <div className="relative space-y-4">
        {/* Reset button */}
        <button
          onClick={resetFilters}
          className="absolute right-0 top-[-2.3rem] flex items-center gap-1 px-3 py-2 text-sm text-grey70"
        >
          <Image src="/common/icons/reset.svg" alt="reset" width={16} height={16} />
          <span className="text-xs sm:text-sm">필터 초기화</span>
        </button>
        <div className="rounded-xl bg-white px-6 py-5" style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}>
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => handleSectionClick('size')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
            >
              <p className="flex justify-center text-grey70 md:justify-start">규모</p>
              <p className="hidden text-grey50 md:flex">선호하는 팀 규모를 선택해 주세요</p>
            </div>
            <div
              onClick={() => handleSectionClick('location')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
            >
              <p className="flex justify-center text-grey70 md:justify-start">활동 지역</p>
              <p className="hidden text-grey50 md:flex">선호하는 지역을 선택해 주세요</p>
            </div>
            <div
              onClick={() => handleSectionClick('status')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
            >
              <p className="flex justify-center text-grey70 md:justify-start">현재 상태</p>
              <p className="hidden text-grey50 md:flex">어떤 팀을 찾고 있는지 선택해 주세요</p>
            </div>
          </div>

          {/* 선택된 필터들 표시 */}
          {(selectedSize.length > 0 || selectedLocations.length > 0 || selectedStatus.length > 0) && (
            <div className="mt-2 flex w-full items-center gap-2 overflow-x-auto">
              {selectedSize.map((size) => (
                <div
                  key={size}
                  onClick={() => removeSize(size)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-xs text-main sm:text-sm">{size}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
              {selectedLocations.map((location) => (
                <div
                  key={location}
                  onClick={() => removeLocation(location)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-xs text-main sm:text-sm">{location}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
              {selectedStatus.map((status) => (
                <div
                  key={status}
                  onClick={() => removeStatus(status)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-xs text-main sm:text-sm">{status}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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

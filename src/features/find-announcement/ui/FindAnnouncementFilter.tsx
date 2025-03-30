'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import AnnouncementFilterModal from './FindAnnoucementFilterModal'

export default function FindAnnouncementFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'position' | 'location' | 'size' | 'projectType' | null>(null)

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // URL에서 필터 상태 가져오기 - 여러 값을 배열로 가져오도록 수정
  const selectedPositions = searchParams.getAll('subPosition')
  const selectedLocations = searchParams.getAll('cityName')
  const selectedSize = searchParams.getAll('scaleName')
  const selectedProjectType = searchParams.getAll('projectType')
  const handleSectionClick = (section: 'position' | 'location' | 'size' | 'projectType') => {
    setActiveSection(section)
    setIsFilterOpen(true)
  }

  // 필터 적용 핸들러
  const handleApplyFilters = (filters: {
    subPositions: string[]
    cityNames: string[]
    scaleName: string[]
    projectType: string[]
  }) => {
    updateURLParams(filters)
  }

  // URL 파라미터 업데이트 함수
  const updateURLParams = (filters: {
    subPositions: string[]
    cityNames: string[]
    scaleName: string[]
    projectType: string[]
  }) => {
    const params = new URLSearchParams()

    // 각 필터 타입별로 여러 값을 추가
    filters.subPositions.forEach((position) => {
      params.append('subPosition', position)
    })

    filters.cityNames.forEach((city) => {
      params.append('cityName', city)
    })

    filters.scaleName.forEach((size) => {
      params.append('scaleName', size)
    })

    filters.projectType.forEach((projectType) => {
      params.append('projectType', projectType)
    })

    params.set('page', '1')
    router.push(`/find/announcement?${params.toString()}`)
  }

  // 개별 필터 제거 핸들러
  const removePosition = (position: string) => {
    updateURLParams({
      subPositions: selectedPositions.filter((p) => p !== position),
      cityNames: selectedLocations,
      scaleName: selectedSize,
      projectType: selectedProjectType,
    })
  }

  const removeLocation = (location: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations.filter((l) => l !== location),
      scaleName: selectedSize,
      projectType: selectedProjectType,
    })
  }

  const removeSize = (size: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations,
      scaleName: selectedSize.filter((s) => s !== size),
      projectType: selectedProjectType,
    })
  }

  // 필터 초기화 핸들러
  const resetFilters = () => {
    updateURLParams({
      subPositions: [],
      cityNames: [],
      scaleName: [],
      projectType: [],
    })
  }

  return (
    <>
      <section className="relative space-y-4" aria-label="공고 필터">
        {/* Reset button */}
        <button
          onClick={resetFilters}
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
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => handleSectionClick('position')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="포지션 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">포지션</h3>
              <p className="hidden text-grey50 md:flex">포지션을 선택해 주세요</p>
            </button>
            <button
              onClick={() => handleSectionClick('projectType')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="활동 지역 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">프로젝트 유형</h3>
              <p className="hidden text-grey50 md:flex">어떤 프로젝트를 찾고 계신가요?</p>
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
              onClick={() => handleSectionClick('size')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 p-3 text-xs hover:bg-[#EDF3FF] sm:px-5 sm:py-4 sm:text-sm"
              aria-label="규모 필터"
            >
              <h3 className="flex justify-center text-grey70 md:justify-start">규모</h3>
              <p className="hidden text-grey50 md:flex">선호하는 팀 규모를 선택해 주세요</p>
            </button>
          </div>

          {/* 선택된 필터들 표시 */}
          {(selectedPositions.length > 0 || selectedLocations.length > 0 || selectedSize.length > 0) && (
            <ul className="mt-2 flex w-full items-center gap-2 overflow-x-auto" aria-label="선택된 필터 목록">
              {selectedPositions.map((position) => (
                <li
                  key={position}
                  onClick={() => removePosition(position)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 포지션: ${position} (클릭하여 제거)`}
                >
                  <span className="text-sm text-main">{position}</span>
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
                  <span className="text-sm text-main">{location}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
              {selectedSize.map((size) => (
                <li
                  key={size}
                  onClick={() => removeSize(size)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  aria-label={`선택된 규모: ${size} (클릭하여 제거)`}
                >
                  <span className="text-sm text-main">{size}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="삭제" width={16} height={16} />
                </li>
              ))}
            </ul>
          )}
        </nav>
      </section>

      {isFilterOpen && (
        <AnnouncementFilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onApplyFilters={handleApplyFilters}
          initialFilters={{
            subPositions: selectedPositions,
            cityNames: selectedLocations,
            scaleName: selectedSize,
            projectType: selectedProjectType,
          }}
          activeSection={activeSection}
        />
      )}
    </>
  )
}

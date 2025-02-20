'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import PrivateFilterModal from '../modal/PrivateFilterModal'
import AnnouncementFilterModal from '../modal/AnnoucementFilterModal'

export default function FindAnnouncementFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'position' | 'location' | 'size' | null>(null)

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // URL에서 필터 상태 가져오기 - 여러 값을 배열로 가져오도록 수정
  const selectedPositions = searchParams.getAll('subPosition')
  const selectedLocations = searchParams.getAll('cityName')
  const selectedSize = searchParams.getAll('scaleName')

  const handleSectionClick = (section: 'position' | 'location' | 'size') => {
    setActiveSection(section)
    setIsFilterOpen(true)
  }

  // 필터 적용 핸들러
  const handleApplyFilters = (filters: { subPositions: string[]; cityNames: string[]; scaleName: string[] }) => {
    updateURLParams(filters)
  }

  // URL 파라미터 업데이트 함수
  const updateURLParams = (filters: { subPositions: string[]; cityNames: string[]; scaleName: string[] }) => {
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

    params.set('page', '1')
    router.push(`/find/announcement?${params.toString()}`)
  }

  // 개별 필터 제거 핸들러
  const removePosition = (position: string) => {
    updateURLParams({
      subPositions: selectedPositions.filter((p) => p !== position),
      cityNames: selectedLocations,
      scaleName: selectedSize,
    })
  }

  const removeLocation = (location: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations.filter((l) => l !== location),
      scaleName: selectedSize,
    })
  }

  const removeSize = (size: string) => {
    updateURLParams({
      subPositions: selectedPositions,
      cityNames: selectedLocations,
      scaleName: selectedSize.filter((s) => s !== size),
    })
  }

  // 필터 초기화 핸들러
  const resetFilters = () => {
    updateURLParams({
      subPositions: [],
      cityNames: [],
      scaleName: [],
    })
  }

  return (
    <>
      <div className=" relative space-y-4">
        {/* Reset button */}
        <button
          onClick={resetFilters}
          className="absolute right-0 top-[-2.3rem] flex items-center gap-1 px-3 py-2 text-sm text-grey70"
        >
          <Image src="/common/icons/reset.svg" alt="reset" width={16} height={16} />
          <span>필터 초기화</span>
        </button>
        <div className="rounded-xl bg-white px-6 py-5" style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}>
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => handleSectionClick('position')}
              className="flex cursor-pointer flex-col  gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
            >
              <p className="flex justify-center text-grey70 md:justify-start">포지션</p>
              <p className="hidden text-grey50 md:flex">포지션을 선택해 주세요</p>
            </div>
            <div
              onClick={() => handleSectionClick('location')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
            >
              <p className="flex justify-center text-grey70 md:justify-start">활동 지역</p>
              <p className="hidden text-grey50 md:flex">선호하는 지역을 선택해 주세요</p>
            </div>
            <div
              onClick={() => handleSectionClick('size')}
              className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
            >
              <p className="flex justify-center text-grey70 md:justify-start">규모</p>
              <p className="hidden text-grey50 md:flex">선호하는 팀 규모를 선택해 주세요</p>
            </div>
          </div>

          {/* 선택된 필터들 표시 */}
          {(selectedPositions.length > 0 || selectedLocations.length > 0 || selectedSize.length > 0) && (
            <div className="mt-2 flex w-full items-center gap-2 overflow-x-auto">
              {selectedPositions.map((position) => (
                <div
                  key={position}
                  onClick={() => removePosition(position)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-sm text-main">{position}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
              {selectedLocations.map((location) => (
                <div
                  key={location}
                  onClick={() => removeLocation(location)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-sm text-main">{location}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
              {selectedSize.map((size) => (
                <div
                  key={size}
                  onClick={() => removeSize(size)}
                  className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                >
                  <span className="text-sm text-main">{size}</span>
                  <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isFilterOpen && (
        <AnnouncementFilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          onApplyFilters={handleApplyFilters}
          initialFilters={{
            subPositions: selectedPositions,
            cityNames: selectedLocations,
            scaleName: selectedSize,
          }}
          activeSection={activeSection}
        />
      )}
    </>
  )
}

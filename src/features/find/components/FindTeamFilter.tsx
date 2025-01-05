'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import ScaleFilter from './filters/ScaleFilter'
import RecruitmentFilter from './filters/RecruitmentFilter'
import LocationFilter from './filters/LocationFilter'
import StatusFilter from './filters/StatusFilter'

export default function FindTeamFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 초기 상태를 URL 파라미터에서 가져오기
  const [isScaleOpen, setIsScaleOpen] = useState(false)
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false)
  const [selectedScales, setSelectedScales] = useState<string[]>(searchParams.getAll('scaleName'))
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(searchParams.get('isAnnouncement') === 'true')
  const [scaleSearchText, setScaleSearchText] = useState('')
  const [recruitmentSearchText, setRecruitmentSearchText] = useState('')
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>(searchParams.getAll('cityName'))
  const [locationSearchText, setLocationSearchText] = useState('')
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string[]>(searchParams.getAll('teamStateName'))
  const [statusSearchText, setStatusSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [pageSize, setPageSize] = useState<number>(Number(searchParams.get('size')) || 20)
  const [isFocused, setIsFocused] = useState({
    scale: false,
    recruitment: false,
    location: false,
    status: false,
  })

  // URL 업데이트 함수
  const updateURL = (page?: number) => {
    const params = new URLSearchParams()

    // 선택된 값들을 URL 파라미터로 변환
    selectedScales.forEach((scale) => {
      params.append('scaleName', scale)
    })

    if (isAnnouncement) {
      params.append('isAnnouncement', 'true')
    }

    selectedLocations.forEach((location) => {
      params.append('cityName', location)
    })

    selectedStatus.forEach((status) => {
      params.append('teamStateName', status)
    })

    // 페이지네이션 파라미터
    params.set('page', String(page !== undefined ? page : currentPage))
    params.set('size', String(pageSize))

    // URL 업데이트 (replace 옵션 사용)
    router.push(`/find/team?${params.toString()}`, { scroll: false })
  }

  // 필터 값이 변경될 때 페이지를 0으로 초기화하고 URL 업데이트
  useEffect(() => {
    setCurrentPage(0)
    updateURL(0)
  }, [selectedScales, isAnnouncement, selectedLocations, selectedStatus])

  // 페이지 또는 페이지 크기가 변경될 때 URL 업데이트
  useEffect(() => {
    updateURL()
  }, [currentPage, pageSize])

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1) // 페이지 크기가 변경되면 첫 페이지로 이동
  }

  const handleScaleSelect = (scale: string) => {
    if (selectedScales.includes(scale)) {
      setSelectedScales(selectedScales.filter((s) => s !== scale))
    } else {
      setSelectedScales([...selectedScales, scale])
    }
  }

  const removeScale = (scale: string) => {
    setSelectedScales(selectedScales.filter((s) => s !== scale))
  }

  const handleRecruitmentSelect = (recruitment: string) => {
    setIsAnnouncement(recruitment === '모집 중')
  }

  const removeRecruitment = () => {
    setIsAnnouncement(false)
  }

  const handleLocationSelect = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    } else {
      setSelectedLocations([...selectedLocations, location])
    }
  }

  const removeLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l !== location))
  }

  const handleStatusSelect = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status))
    } else {
      setSelectedStatus([...selectedStatus, status])
    }
  }

  const removeStatus = (status: string) => {
    setSelectedStatus(selectedStatus.filter((s) => s !== status))
  }

  return (
    <div className="space-y-4">
      <div>
        <div
          className="grid grid-cols-4 gap-4 rounded-xl bg-white px-6 py-5"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <ScaleFilter
            searchText={scaleSearchText}
            isOpen={isScaleOpen}
            isFocused={isFocused.scale}
            selectedItems={selectedScales}
            onSearchChange={(e) => setScaleSearchText(e.target.value)}
            onFocus={() => {
              setIsScaleOpen(true)
              setIsFocused((prev) => ({ ...prev, scale: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsScaleOpen(false)
                setIsFocused((prev) => ({ ...prev, scale: false }))
              }, 150)
            }}
            onSelect={handleScaleSelect}
            onRemove={removeScale}
          />

          <RecruitmentFilter
            searchText={recruitmentSearchText}
            isOpen={isRecruitmentOpen}
            isFocused={isFocused.recruitment}
            selectedItems={isAnnouncement ? ['모집 중'] : []}
            onSearchChange={(e) => setRecruitmentSearchText(e.target.value)}
            onFocus={() => {
              setIsRecruitmentOpen(true)
              setIsFocused((prev) => ({ ...prev, recruitment: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsRecruitmentOpen(false)
                setIsFocused((prev) => ({ ...prev, recruitment: false }))
              }, 150)
            }}
            onSelect={handleRecruitmentSelect}
            onRemove={removeRecruitment}
          />

          <LocationFilter
            searchText={locationSearchText}
            isOpen={isLocationOpen}
            isFocused={isFocused.location}
            selectedItems={selectedLocations}
            onSearchChange={(e) => setLocationSearchText(e.target.value)}
            onFocus={() => {
              setIsLocationOpen(true)
              setIsFocused((prev) => ({ ...prev, location: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsLocationOpen(false)
                setIsFocused((prev) => ({ ...prev, location: false }))
              }, 150)
            }}
            onSelect={handleLocationSelect}
            onRemove={removeLocation}
          />

          <StatusFilter
            searchText={statusSearchText}
            isOpen={isStatusOpen}
            isFocused={isFocused.status}
            selectedItems={selectedStatus}
            onSearchChange={(e) => setStatusSearchText(e.target.value)}
            onFocus={() => {
              setIsStatusOpen(true)
              setIsFocused((prev) => ({ ...prev, status: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsStatusOpen(false)
                setIsFocused((prev) => ({ ...prev, status: false }))
              }, 150)
            }}
            onSelect={handleStatusSelect}
            onRemove={removeStatus}
          />

          {/* 선택된 필터들 표시 */}
          {(selectedScales.length > 0 ||
            isAnnouncement ||
            selectedLocations.length > 0 ||
            selectedStatus.length > 0) && (
            <div className="col-span-4 w-full">
              <div className="mt-2 flex w-full items-center gap-2 overflow-x-auto">
                {selectedScales.map((scale) => (
                  <div
                    key={scale}
                    onClick={() => removeScale(scale)}
                    className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  >
                    <span className="text-sm text-main">{scale}</span>
                    <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                  </div>
                ))}
                {isAnnouncement && (
                  <div
                    onClick={removeRecruitment}
                    className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  >
                    <span className="text-sm text-main">모집 중</span>
                    <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                  </div>
                )}
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
                {selectedStatus.map((status) => (
                  <div
                    key={status}
                    onClick={() => removeStatus(status)}
                    className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                  >
                    <span className="text-sm text-main">{status}</span>
                    <Image src="/common/icons/delete_icon.svg" alt="close" width={16} height={16} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

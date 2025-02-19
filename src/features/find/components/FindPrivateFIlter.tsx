'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import PrivateFilterModal from './PrivateFilterModal'

export default function FindPrivateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // 초기 상태를 URL 파라미터에서 가져오기

  const [selectedPositions, setSelectedPositions] = useState<string[]>(searchParams.getAll('subPosition'))
  const [selectedSkills, setSelectedSkills] = useState<string[]>(searchParams.getAll('skillName'))
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    [searchParams.get('cityName')].filter(Boolean) as string[],
  )

  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    [searchParams.get('profileStateName')].filter(Boolean) as string[],
  )

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()

    // 포지션 처리 - 중복 제거
    selectedPositions.forEach((position) => {
      params.append('subPosition', position)
    })

    selectedSkills.forEach((skill) => {
      params.append('skillName', skill)
    })

    selectedLocations.forEach((location) => {
      params.append('cityName', location)
    })

    selectedStatus.forEach((status) => {
      params.append('profileStateName', status)
    })

    params.set('page', '1')
    router.push(`/find/private?${params.toString()}`)
  }

  // 선택 값이 변경될 때마다 URL 업데이트
  useEffect(() => {
    updateURL()
  }, [selectedPositions, selectedSkills, selectedLocations, selectedStatus])

  const removePosition = (position: string) => {
    setSelectedPositions([])
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  const removeLocation = (location: string) => {
    setSelectedLocations([])
  }

  const removeStatus = (status: string) => {
    setSelectedStatus([])
  }

  const resetFilters = () => {
    setSelectedPositions([])
    setSelectedSkills([])
    setSelectedLocations([])
    setSelectedStatus([])
  }

  // 필터 모달
  const handleFilterOpen = () => {
    setIsFilterOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <div className=" rounded-xl bg-white px-6 py-5" style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}>
            {/* Reset button */}
            <button
              onClick={resetFilters}
              className="absolute right-44 top-24 flex items-center gap-1  px-3 py-2 text-sm text-grey70"
            >
              <Image src="/common/icons/reset.svg" alt="reset" width={16} height={16} />
              <span>필터 초기화</span>
            </button>

            <div className="grid grid-cols-3 gap-4">
              <div
                onClick={handleFilterOpen}
                className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
              >
                <p className="text-grey70">포지션</p>
                <p className="text-grey50">포지션을 선택해 주세요</p>
              </div>
              <div
                onClick={handleFilterOpen}
                className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
              >
                <p className="text-grey70">활동 지역</p>
                <p className="text-grey50">선호하는 지역을 선택해 주세요</p>
              </div>
              <div
                onClick={handleFilterOpen}
                className="flex cursor-pointer flex-col gap-2 rounded-xl border border-grey30 px-5 py-4 text-sm hover:bg-[#EDF3FF]"
              >
                <p className="text-grey70">현재 상태</p>
                <p className="text-grey50">어떤 팀원을 찾고 있는지 선택해 주세요</p>
              </div>
            </div>

            {/* 선택된 필터들 표시 */}
            {(selectedPositions.length > 0 ||
              selectedSkills.length > 0 ||
              selectedLocations.length > 0 ||
              selectedStatus.length > 0) && (
              <div className="col-span-4 w-full">
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
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => removeSkill(skill)}
                      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-[0.25rem] bg-grey10 px-3 py-2"
                    >
                      <span className="text-sm text-main">{skill}</span>
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
      {isFilterOpen && <PrivateFilterModal isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />}
    </>
  )
}

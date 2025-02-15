'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import PositionFilter from './filters/PositionFilter'
import SkillFilter from './filters/SkillFilter'
import LocationFilter from './filters/LocationFilter'
import ScaleFilter from './filters/ScaleFilter'

export default function FindAnnouncementFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 초기 상태를 URL 파라미터에서 가져오기
  const [isPositionOpen, setIsPositionOpen] = useState(false)
  const [isSkillOpen, setIsSkillOpen] = useState(false)
  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    [searchParams.get('subPosition')].filter(Boolean) as string[],
  )
  const [selectedSkills, setSelectedSkills] = useState<string[]>(searchParams.getAll('skillName'))
  const [positionSearchText, setPositionSearchText] = useState('')
  const [skillSearchText, setSkillSearchText] = useState('')
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    [searchParams.get('cityName')].filter(Boolean) as string[],
  )
  const [locationSearchText, setLocationSearchText] = useState('')
  const [isScaleOpen, setIsScaleOpen] = useState(false)
  const [selectedScales, setSelectedScales] = useState<string[]>(
    [searchParams.get('scale')].filter(Boolean) as string[],
  )
  const [scaleSearchText, setScaleSearchText] = useState('')
  const [isFocused, setIsFocused] = useState({
    position: false,
    skill: false,
    location: false,
    scale: false,
  })

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()

    selectedPositions.forEach((position) => {
      params.append('subPosition', position)
    })

    selectedSkills.forEach((skill) => {
      params.append('skillName', skill)
    })

    selectedLocations.forEach((location) => {
      params.append('cityName', location)
    })

    if (selectedScales.length > 0) {
      selectedScales.forEach((scale) => {
        params.append('scale', scale)
      })
    }

    // 페이지 초기화
    params.set('page', '1')

    // URL 업데이트
    router.push(`/find/announcement?${params.toString()}`)
  }

  // 선택 값이 변경될 때마다 URL 업데이트
  useEffect(() => {
    updateURL()
  }, [selectedPositions, selectedSkills, selectedLocations, selectedScales])

  const handlePositionSelect = (position: string) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter((p) => p !== position))
    } else {
      setSelectedPositions([...selectedPositions, position])
    }
  }

  const removePosition = (position: string) => {
    setSelectedPositions(selectedPositions.filter((p) => p !== position))
  }

  const handleSkillSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
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

  return (
    <div className="space-y-4">
      <div>
        <div
          className="grid grid-cols-4 gap-4 rounded-xl bg-white px-6 py-5"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <PositionFilter
            searchText={positionSearchText}
            isOpen={isPositionOpen}
            isFocused={isFocused.position}
            selectedItems={selectedPositions}
            onSearchChange={(e) => setPositionSearchText(e.target.value)}
            onFocus={() => {
              setIsPositionOpen(true)
              setIsFocused((prev) => ({ ...prev, position: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsPositionOpen(false)
                setIsFocused((prev) => ({ ...prev, position: false }))
              }, 150)
            }}
            onSelect={handlePositionSelect}
            onRemove={removePosition}
          />

          <SkillFilter
            searchText={skillSearchText}
            isOpen={isSkillOpen}
            isFocused={isFocused.skill}
            selectedItems={selectedSkills}
            onSearchChange={(e) => setSkillSearchText(e.target.value)}
            onFocus={() => {
              setIsSkillOpen(true)
              setIsFocused((prev) => ({ ...prev, skill: true }))
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsSkillOpen(false)
                setIsFocused((prev) => ({ ...prev, skill: false }))
              }, 150)
            }}
            onSelect={handleSkillSelect}
            onRemove={removeSkill}
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

          {/* 선택된 필터들 표시 */}
          {(selectedPositions.length > 0 ||
            selectedSkills.length > 0 ||
            selectedLocations.length > 0 ||
            selectedScales.length > 0) && (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import PositionFilter from './filters/PositionFilter'
import SkillFilter from './filters/SkillFilter'
import LocationFilter from './filters/LocationFilter'
import StatusFilter from './filters/StatusFilter'

export default function FindPrivateFilter() {
  const [isPositionOpen, setIsPositionOpen] = useState(false)
  const [isSkillOpen, setIsSkillOpen] = useState(false)
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [positionSearchText, setPositionSearchText] = useState('')
  const [skillSearchText, setSkillSearchText] = useState('')
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [locationSearchText, setLocationSearchText] = useState('')
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [statusSearchText, setStatusSearchText] = useState('')
  const [isFocused, setIsFocused] = useState({
    position: false,
    skill: false,
    location: false,
    status: false,
  })

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
  )
}

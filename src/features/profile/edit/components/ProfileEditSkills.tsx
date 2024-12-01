'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { toolsData } from '@/shared/data/tools'
import Select from '@/shared/ui/Select/Select'
import { Button } from '@/shared/ui/Button/Button'
import { updateProfileSkills, getProfileSkills } from '../api/profileApi'

interface Skill {
  name: string
  proficiency: string
}

export default function ProfileEditSkills() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getProfileSkills()
        setSelectedSkills(
          skills.map((skill) => ({
            name: skill.skillName,
            proficiency: skill.skillLevel,
          })),
        )
      } catch (error) {
        console.error('스킬 조회 중 오류 발생:', error)
      }
    }

    fetchSkills()
  }, [])

  const filteredTools = searchTerm
    ? toolsData.tools.filter((tool) => tool.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const handleAddSkill = (skillName: string) => {
    if (!selectedSkills.find((skill) => skill.name === skillName)) {
      setSelectedSkills([...selectedSkills, { name: skillName, proficiency: '중' }])
    }
    setSearchTerm('')
    setShowResults(false)
  }

  const handleRemoveSkill = (skillName: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.name !== skillName))
  }

  const handleProficiencyChange = (skillName: string, newProficiency: string) => {
    setSelectedSkills(
      selectedSkills.map((skill) => (skill.name === skillName ? { ...skill, proficiency: newProficiency } : skill)),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || !searchTerm) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && filteredTools[focusedIndex]) {
          handleAddSkill(filteredTools[focusedIndex])
          setFocusedIndex(-1)
        }
        break
      case 'Escape':
        setShowResults(false)
        setFocusedIndex(-1)
        break
    }
  }

  const handleSubmit = async () => {
    try {
      const skillsData = selectedSkills.map((skill) => ({
        skillName: skill.name,
        skillLevel: skill.proficiency,
      }))

      await updateProfileSkills(skillsData)
      alert('스킬이 성공적으로 업데이트되었습니다.')
    } catch (error) {
      console.error('스킬 업데이트 중 오류 발생:', error)
      alert('스킬 업데이트에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowResults(true)
              }}
              onFocus={() => setShowResults(true)}
              placeholder="스킬을 영어로 검색해보세요"
              className="w-full rounded-xl border border-grey40 bg-white px-6 py-4 placeholder-grey40 focus:outline-none focus:ring-2 focus:ring-main"
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Image src={'/common/icons/search.svg'} alt="search" width={24} height={24} />
            </div>

            {/* Search Results */}
            {showResults && searchTerm && (
              <div className="absolute z-10 mt-2 max-h-[300px] w-full overflow-y-auto rounded-xl border border-grey40 bg-white shadow-lg">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer px-6 py-3 ${
                        focusedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleAddSkill(tool)}
                    >
                      {tool}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-3 text-grey40">검색 결과가 없습니다</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 스킬 목록 */}
        <div className="flex flex-col gap-5 rounded-xl bg-white px-[2.88rem] py-10">
          <div className="flex w-full gap-5">
            <div className="flex-1">
              <span className="mb-2 block text-grey80">스킬</span>
            </div>
            <div className="w-32">
              <span className="mb-2 block text-grey80">숙련도</span>
            </div>
            <div className="w-[24px]"></div>
          </div>

          <div className="flex flex-col gap-2">
            {selectedSkills.length > 0 ? (
              selectedSkills.map((skill, index) => (
                <div key={index} className="flex w-full gap-5">
                  <div className="flex-1 rounded-xl bg-grey20 py-3 pl-6 text-lg text-grey80">{skill.name}</div>
                  <Select
                    className="w-32"
                    value={skill.proficiency}
                    onChange={(value) => handleProficiencyChange(skill.name, value)}
                    options={[
                      { value: '상', label: '상' },
                      { value: '중상', label: '중상' },
                      { value: '중', label: '중' },
                      { value: '중하', label: '중하' },
                      { value: '하', label: '하' },
                    ]}
                  />
                  <Image
                    src={'/common/icons/delete_x.svg'}
                    alt="close"
                    width={24}
                    height={24}
                    className="ml-[1.38rem] shrink-0 cursor-pointer"
                    onClick={() => handleRemoveSkill(skill.name)}
                  />
                </div>
              ))
            ) : (
              <div className="flex h-[100px] w-full items-center justify-center rounded-lg bg-grey10">
                <p className="text-grey60">등록된 스킬이 없습니다. 위 검색창에서 스킬을 추가해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Button mode="main" animationMode="main" onClick={handleSubmit}>
          저장하기
        </Button>
      </div>
    </>
  )
}

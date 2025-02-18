'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { skillsData } from '@/shared/data/skillsData'
import Select from '@/shared/ui/Select/Select'
import { Button } from '@/shared/ui/Button/Button'
import { updateProfileSkills, getProfileSkills } from '../api/profileApi'
import { SkillListSkeleton } from './skeletons/ListSkeletons'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { SearchDropdown } from '@/shared/ui/SearchDropdown/SearchDropdown'
import { useToast } from '@/shared/hooks/useToast'
import { useProfileMenuStore } from '../../store/useProfileMenuStore'

interface Skill {
  name: string
  proficiency: string
}

export default function ProfileEditSkills() {
  const toast = useToast()
  const { updateProfileMenu } = useProfileMenuStore()
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [originalSkills, setOriginalSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getProfileSkills()
        const formattedSkills = skills.map((skill) => ({
          name: skill.skillName,
          proficiency: skill.skillLevel,
        }))
        setSelectedSkills(formattedSkills)
        setOriginalSkills(formattedSkills)

        // 스킬 데이터가 있으면 profileBooleanMenu 업데이트
        if (formattedSkills.length > 0) {
          updateProfileMenu({ isProfileSkill: true })
        }
      } catch (error) {
        console.error('스킬 조회 중 오류 발생:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [updateProfileMenu])

  const hasChanges = () => {
    if (selectedSkills.length !== originalSkills.length) return true

    return selectedSkills.some((skill) => {
      const originalSkill = originalSkills.find((orig) => orig.name === skill.name)
      return !originalSkill || originalSkill.proficiency !== skill.proficiency
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
          <div className="relative w-full">
            <div className="h-12 w-full animate-pulse rounded-xl bg-grey20" />
          </div>
        </div>
        <div className="flex flex-col gap-5 rounded-xl bg-white px-[2.88rem] py-10">
          <SkillListSkeleton />
        </div>
      </div>
    )
  }

  const handleAddSkill = (skillName: string) => {
    if (!selectedSkills.find((skill) => skill.name === skillName)) {
      setSelectedSkills([...selectedSkills, { name: skillName, proficiency: '중' }])
    }
  }

  const handleRemoveSkill = (skillName: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.name !== skillName))
  }

  const handleProficiencyChange = (skillName: string, newProficiency: string) => {
    setSelectedSkills(
      selectedSkills.map((skill) => (skill.name === skillName ? { ...skill, proficiency: newProficiency } : skill)),
    )
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const skillsData = selectedSkills.map((skill) => ({
        skillName: skill.name,
        skillLevel: skill.proficiency,
      }))

      await updateProfileSkills(skillsData)
      setOriginalSkills(selectedSkills)

      // 스킬 저장 성공 시 profileBooleanMenu 업데이트
      if (selectedSkills.length > 0) {
        updateProfileMenu({ isProfileSkill: true })
      } else {
        updateProfileMenu({ isProfileSkill: false })
      }

      toast.success('스킬이 성공적으로 업데이트되었습니다.')
    } catch (error) {
      console.error('스킬 업데이트 중 오류 발생:', error)
      toast.alert('스킬 업데이트에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 rounded-xl bg-white p-5 md:px-[2.88rem] md:py-10">
          <SearchDropdown
            items={skillsData.map((skill) => skill.name)}
            filterFunction={(tool, searchTerm) => tool.toLowerCase().includes(searchTerm.toLowerCase())}
            onSelect={handleAddSkill}
            placeholder="스킬을 영어로 검색해 보세요"
          />
        </div>

        {/* 스킬 목록 */}
        <div className="flex flex-col gap-5 rounded-xl bg-white p-5 md:px-[2.88rem] md:py-10">
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
                    className="md:w-32"
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
              <div className="flex w-full items-center rounded-lg bg-grey10 px-6 py-3 text-sm text-grey60">
                <p className="text-grey60">아직 스킬이 없어요! 나의 보유 스킬을 검색하고 추가해 보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Button
          mode="main"
          animationMode="main"
          onClick={handleSubmit}
          disabled={!hasChanges() || isSubmitting}
          className={`${!hasChanges() || isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>저장 중...</span>
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </div>
    </>
  )
}

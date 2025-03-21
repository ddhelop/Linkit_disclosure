'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { usePositionSelect } from '@/shared/hooks/usePositionSelect'
import Input from '@/shared/ui/Input/Input'
import { SearchDropdown } from '@/shared/ui/SearchDropdown/SearchDropdown'
import Select from '@/shared/ui/Select/Select'
import { skillsData } from '@/shared/data/skillsData'

import Textarea from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'

import {
  createRecruitment,
  getTeamAnnouncement,
  TeamAnnouncementDetail,
  updateTeamAnnouncement,
} from '../../api/teamApi'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import Checkbox from '@/shared/ui/Checkbox/Checkbox'

export default function TeamEditRecruitment({ params }: { params: { teamName: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const toast = useToast()
  // 원본 데이터 저장용 state
  const [originalData, setOriginalData] = useState<TeamAnnouncementDetail['result'] | null>(null)
  const [isDataChanged, setIsDataChanged] = useState(false)

  const {
    selectedCategory,
    selectedSubCategory,
    selectedProjectType,
    selectedWorkType,
    mainPositionOptions,
    subPositionOptions,
    projectTypeOptions,
    workTypeOptions,
    setSelectedCategory,
    setSelectedSubCategory,
    setSelectedProjectType,
    setSelectedWorkType,
  } = usePositionSelect()

  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [endDate, setEndDate] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [mainTasks, setMainTasks] = useState('')
  const [workMethod, setWorkMethod] = useState('')
  const [idealCandidate, setIdealCandidate] = useState('')
  const [preferredQualifications, setPreferredQualifications] = useState('')
  const [joiningProcess, setJoiningProcess] = useState('')
  const [benefits, setBenefits] = useState('')
  const [isPermanentRecruitment, setIsPermanentRecruitment] = useState(false)

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove))
  }

  const formatDateInput = (input: string) => {
    const numbers = input.replace(/\D/g, '')
    if (numbers.length <= 4) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}`
    } else {
      return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`
    }
  }

  const validateDate = (date: string) => {
    if (!date) return true
    const regex = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/
    if (!regex.test(date)) return false

    const [year, month, day] = date.split('.').map(Number)
    const currentYear = new Date().getFullYear()

    // 날짜 유효성 검사
    const dateObj = new Date(year, month - 1, day)
    return (
      year >= 1900 &&
      year <= currentYear + 1 && // 현재 년도 + 1년까지 허용
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    )
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setEndDate(formatted)
  }

  const handlePermanentRecruitmentChange = () => {
    setIsPermanentRecruitment(!isPermanentRecruitment)
    if (!isPermanentRecruitment) {
      setEndDate('') // 상시 모집 체크 시 날짜 초기화
    }
  }

  const isFormValid = () => {
    const requiredFields = [
      title,
      selectedCategory,
      selectedSubCategory,
      mainTasks,
      workMethod,
      idealCandidate,
      selectedProjectType,
      selectedWorkType,
    ]

    const hasRequiredFields = requiredFields.every((field) => field.trim() !== '')
    const isDateValid = isPermanentRecruitment || (endDate !== '' && validateDate(endDate))

    return hasRequiredFields && isDateValid
  }

  const handleSubmit = async () => {
    try {
      const formattedEndDate = endDate ? new Date(endDate.replace(/\./g, '-')).toISOString().split('T')[0] : undefined

      const recruitmentData = {
        announcementTitle: title,
        majorPosition: selectedCategory,
        subPosition: selectedSubCategory,
        announcementSkillNames: selectedSkills.map((skill) => ({
          announcementSkillName: skill,
        })),
        announcementEndDate: isPermanentRecruitment ? '' : formattedEndDate || '',
        isPermanentRecruitment,
        cityName: '',
        divisionName: '',
        isRegionFlexible: false,
        mainTasks: mainTasks,
        workMethod: workMethod,
        workTypeName: selectedWorkType,
        idealCandidate: idealCandidate,
        preferredQualifications: isExpanded ? preferredQualifications : undefined,
        joiningProcess: isExpanded ? joiningProcess : undefined,
        benefits: isExpanded ? benefits : undefined,
        projectTypeName: selectedProjectType,
      }

      if (id) {
        await updateTeamAnnouncement(params.teamName, Number(id), recruitmentData)
        toast.success('모집 공고가 성공적으로 수정되었습니다.')
      } else {
        await createRecruitment(recruitmentData, params.teamName)
        toast.success('모집 공고가 성공적으로 등록되었습니다.')
      }

      router.push(`/team/${params.teamName}/edit/recruit`)
    } catch (error) {
      console.error('Failed to save recruitment:', error)
      toast.alert(id ? '채용 공고 수정에 실패했습니다.' : '채용 공고 등록에 실패했습니다.')
    }
  }

  // 데이터 로딩
  useEffect(() => {
    const loadAnnouncementData = async () => {
      if (id) {
        try {
          const data = await getTeamAnnouncement(params.teamName, Number(id))
          setOriginalData(data.result)

          // 각 필드에 데이터 설정
          setTitle(data.result.announcementTitle)
          setSelectedCategory(data.result.announcementPositionItem.majorPosition)
          setSelectedSubCategory(data.result.announcementPositionItem.subPosition)
          setSelectedSkills(data.result.announcementSkillNames.map((skill) => skill.announcementSkillName))
          setIsPermanentRecruitment(data.result.isPermanentRecruitment)
          setEndDate(data.result.isPermanentRecruitment ? '' : data.result.announcementEndDate)
          setMainTasks(data.result.mainTasks)
          setWorkMethod(data.result.workMethod)
          setSelectedProjectType(data.result.projectType)
          setSelectedWorkType(data.result.workType)
          setIdealCandidate(data.result.idealCandidate)

          if (data.result.preferredQualifications || data.result.joiningProcess || data.result.benefits) {
            setIsExpanded(true)
            setPreferredQualifications(data.result.preferredQualifications || '')
            setJoiningProcess(data.result.joiningProcess || '')
            setBenefits(data.result.benefits || '')
          }
        } catch (error) {
          console.error('Failed to load announcement:', error)
          toast.alert('공고 정보를 불러오는데 실패했습니다.')
        }
      }
    }

    loadAnnouncementData()
  }, [id, params.teamName])

  // 데이터 변경 감지
  useEffect(() => {
    if (id) {
      // 수정 모드: 기존 데이터와 비교
      if (!originalData) return

      const currentData = {
        announcementTitle: title,
        announcementPositionItem: {
          majorPosition: selectedCategory,
          subPosition: selectedSubCategory,
        },
        announcementSkillNames: selectedSkills,
        announcementEndDate: endDate,
        mainTasks,
        workMethod,
        idealCandidate,
        preferredQualifications,
        joiningProcess,
        benefits,
      }

      const isChanged = JSON.stringify(currentData) !== JSON.stringify(originalData)
      setIsDataChanged(isChanged)
    } else {
      // 생성 모드: 필수 항목 검증
      const isValid = isFormValid()
      setIsDataChanged(isValid)
    }
  }, [
    id,
    originalData,
    title,
    selectedCategory,
    selectedSubCategory,
    selectedSkills,
    endDate,
    mainTasks,
    selectedProjectType,
    selectedWorkType,
    workMethod,
    idealCandidate,
    preferredQualifications,
    joiningProcess,
    benefits,
    isPermanentRecruitment,
  ])

  return (
    <>
      <div className="mt-5 flex flex-col gap-10 rounded-xl bg-white p-5 md:px-[2.88rem] md:py-10">
        {/* 공고 제목 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              공고 제목<span className="placeholder:-1 text-main">*</span>
            </span>
            <span className="text-xs text-grey50">
              <span className="pr-1 text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="공고 제목을 작성해 주세요 (100자 이내)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 찾는 포지션 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              찾는 포지션<span className="pl-1 text-main">*</span>
            </span>
          </div>
          <div className="flex w-full flex-col gap-[1.38rem] md:flex-row md:gap-[1.38rem]">
            <div className="flex w-full flex-col gap-2 md:w-[48%]">
              <span className="text-sm text-grey70">대분류</span>
              <Select
                options={mainPositionOptions}
                value={selectedCategory}
                placeholder="대분류 선택"
                onChange={setSelectedCategory}
              />
            </div>

            <div className="flex w-full flex-col gap-2 md:w-[48%]">
              <span className="text-sm text-grey70">소분류</span>
              <Select
                options={subPositionOptions}
                value={selectedSubCategory}
                placeholder={selectedCategory ? '소분류 선택' : '대분류를 먼저 선택해주세요'}
                onChange={setSelectedSubCategory}
                disabled={!selectedCategory}
              />
            </div>
          </div>
        </div>

        {/* 요구 스킬 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">요구 스킬</span>
          </div>
          <div className="flex flex-col">
            {/* 선택된 스킬 표시 */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="mb-2 flex items-center gap-2 rounded-lg border border-[#7EA5F8] bg-[#EDF3FF] px-4 py-2 text-main"
                >
                  <span className="">{skill}</span>
                  <button onClick={() => handleRemoveSkill(skill)} className="text-grey60 hover:text-grey80">
                    ×
                  </button>
                </div>
              ))}
            </div>
            <SearchDropdown
              items={skillsData.map((skill) => skill.name)}
              filterFunction={(tool, searchTerm) => tool.toLowerCase().includes(searchTerm.toLowerCase())}
              onSelect={handleAddSkill}
              placeholder="스킬을 영어로 검색해 보세요"
            />
          </div>
        </div>

        {/* 프로젝트 유형 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              프로젝트 유형<span className="pl-1 text-main">*</span>
            </span>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <Select
              options={projectTypeOptions}
              value={selectedProjectType}
              placeholder="프로젝트 유형 선택"
              onChange={setSelectedProjectType}
            />
          </div>
        </div>

        {/* 업무 형태 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              업무 형태<span className="pl-1 text-main">*</span>
            </span>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <Select
              options={workTypeOptions}
              value={selectedWorkType}
              placeholder="업무 형태 선택"
              onChange={setSelectedWorkType}
            />
          </div>
        </div>

        {/* 모집기간 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              모집 마감일<span className="pl-1 text-main">*</span>
            </span>
          </div>
          <Input
            placeholder="YYYY.MM.DD"
            value={endDate}
            onChange={handleEndDateChange}
            maxLength={10}
            disabled={isPermanentRecruitment}
          />
          <Checkbox checked={isPermanentRecruitment} onChange={handlePermanentRecruitmentChange} label="상시 모집" />
        </div>

        <hr />

        {/* 세부 공고 작성 */}

        {/* 주요 업무 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              주요 업무<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <Textarea
            placeholder="새롭게 합류할 팀원의 주요 업무를 작성해 주세요 (500자 이내)"
            value={mainTasks}
            onChange={(e) => setMainTasks(e.target.value)}
          />
        </div>

        {/* 요구 사항 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              요구 사항<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <Textarea
            placeholder="새롭게 합류할 팀원이 갖춰야 할 역량이나 자격을 작성해 주세요 (500자 이내)"
            value={idealCandidate}
            onChange={(e) => setIdealCandidate(e.target.value)}
          />
        </div>

        {/* 업무 방식 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              업무 방식<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <Textarea
            placeholder="팀의 업무 방식에 대해 설명해 주세요 (500자 이내)"
            value={workMethod}
            onChange={(e) => setWorkMethod(e.target.value)}
          />
        </div>

        {/* 확장/축소 버튼 */}
        <div className="flex w-full justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 rounded-full border border-grey30 bg-[#EDF3FF] px-6 py-3 text-sm text-grey80 hover:bg-[#bfd4ff]"
          >
            <Image
              src={isExpanded ? '/common/icons/arrow-top.svg' : '/common/icons/arrow-bottom.svg'}
              alt={isExpanded ? '접기' : '펼치기'}
              width={32}
              height={32}
            />
            {isExpanded ? '지금은 필수 항목만 작성하기' : '더 작성하고 지원율 높이기'}
          </button>
        </div>

        {/* 추가되는 폼들 (조건부 렌더링) */}
        {isExpanded && (
          <>
            {/* 우대사항 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-grey80">우대사항</span>
              </div>
              <Textarea
                placeholder="추가적으로 고려할 우대 사항을 작성해 주세요 (500자 이내)"
                value={preferredQualifications}
                onChange={(e) => setPreferredQualifications(e.target.value)}
              />
            </div>

            {/* 합류 절차 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-grey80">합류 절차</span>
              </div>
              <Textarea
                placeholder="새롭게 합류할 팀원이 거치게 될 절차와 일정에 대해 작성해 주세요 (500자 이내)"
                value={joiningProcess}
                onChange={(e) => setJoiningProcess(e.target.value)}
              />
            </div>

            {/* 기타 사항 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-grey80">기타 사항</span>
              </div>
              <Textarea
                placeholder="추가로 전달하고 싶은 내용을 작성해 주세요 (500자 이내)"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          mode="main"
          animationMode="main"
          className="rounded-xl font-semibold"
          disabled={!isDataChanged}
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>
    </>
  )
}

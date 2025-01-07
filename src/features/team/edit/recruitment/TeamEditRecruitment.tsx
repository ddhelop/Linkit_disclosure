'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { usePositionSelect } from '@/shared/hooks/usePositionSelect'
import Input from '@/shared/ui/Input/Input'
import { SearchDropdown } from '@/shared/ui/SearchDropdown/SearchDropdown'
import Select from '@/shared/ui/Select/Select'
import { toolsData } from '@/shared/data/tools'

import { useDateRange } from '@/shared/hooks/useDateRange'
import DateRange from '@/shared/ui/Input/DateRange'
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

export default function TeamEditRecruitment({ params }: { params: { teamName: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  // 원본 데이터 저장용 state
  const [originalData, setOriginalData] = useState<TeamAnnouncementDetail['result'] | null>(null)
  const [isDataChanged, setIsDataChanged] = useState(false)

  const {
    selectedCategory,
    selectedSubCategory,
    mainPositionOptions,
    subPositionOptions,
    setSelectedCategory,
    setSelectedSubCategory,
  } = usePositionSelect()

  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange()
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [mainTasks, setMainTasks] = useState('')
  const [workMethod, setWorkMethod] = useState('')
  const [idealCandidate, setIdealCandidate] = useState('')
  const [preferredQualifications, setPreferredQualifications] = useState('')
  const [joiningProcess, setJoiningProcess] = useState('')
  const [benefits, setBenefits] = useState('')

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = async () => {
    try {
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0]
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0]

      const recruitmentData = {
        announcementTitle: title,
        majorPosition: selectedCategory,
        subPosition: selectedSubCategory,
        announcementSkillNames: selectedSkills.map((skill) => ({
          announcementSkillName: skill,
        })),
        announcementStartDate: formattedStartDate,
        announcementEndDate: formattedEndDate,
        cityName: '', // 활동 지역 관련 state 추가 필요
        divisionName: '', // 활동 지역 관련 state 추가 필요
        isRegionFlexible: false, // 지역 유연성 관련 state 추가 필요
        mainTasks: mainTasks,
        workMethod: workMethod,
        idealCandidate: idealCandidate,
        preferredQualifications: isExpanded ? preferredQualifications : undefined,
        joiningProcess: isExpanded ? joiningProcess : undefined,
        benefits: isExpanded ? benefits : undefined,
      }

      if (id) {
        // 수정
        await updateTeamAnnouncement(params.teamName, Number(id), recruitmentData)
        alert('채용 공고가 성공적으로 수정되었습니다.')
      } else {
        // 생성
        await createRecruitment(recruitmentData, params.teamName)
        alert('채용 공고가 성공적으로 등록되었습니다.')
      }

      router.push(`/team/${params.teamName}/edit/recruit`)
    } catch (error) {
      console.error('Failed to save recruitment:', error)
      alert(id ? '채용 공고 수정에 실패했습니다.' : '채용 공고 등록에 실패했습니다.')
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
          setStartDate(data.result.announcementStartDate)
          setEndDate(data.result.announcementEndDate)
          setMainTasks(data.result.mainTasks)
          setWorkMethod(data.result.workMethod)
          setIdealCandidate(data.result.idealCandidate)

          if (data.result.preferredQualifications || data.result.joiningProcess || data.result.benefits) {
            setIsExpanded(true)
            setPreferredQualifications(data.result.preferredQualifications || '')
            setJoiningProcess(data.result.joiningProcess || '')
            setBenefits(data.result.benefits || '')
          }
        } catch (error) {
          console.error('Failed to load announcement:', error)
          alert('공고 정보를 불러오는데 실패했습니다.')
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
        announcementStartDate: startDate,
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
      const isValid =
        title.trim() !== '' &&
        selectedCategory !== '' &&
        selectedSubCategory !== '' &&
        selectedSkills.length > 0 &&
        startDate !== '' &&
        endDate !== '' &&
        mainTasks.trim() !== '' &&
        workMethod.trim() !== '' &&
        idealCandidate.trim() !== ''

      setIsDataChanged(isValid)
    }
  }, [
    id,
    originalData,
    title,
    selectedCategory,
    selectedSubCategory,
    selectedSkills,
    startDate,
    endDate,
    mainTasks,
    workMethod,
    idealCandidate,
    preferredQualifications,
    joiningProcess,
    benefits,
  ])

  return (
    <>
      <div className="mt-5 flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
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
            placeholder="어떤 포지션 공고인지, 어떤 팀인지 간단하게 적어주세요"
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
          <div className="flex w-full gap-[1.38rem]">
            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">대분류</span>
              <Select
                options={mainPositionOptions}
                value={selectedCategory}
                placeholder="대분류 선택"
                onChange={setSelectedCategory}
              />
            </div>

            <div className="flex w-[48%] flex-col gap-2">
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
            <span className="text-grey80">
              요구 스킬<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {/* 선택된 스킬 표시 */}
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-lg border border-[#7EA5F8] bg-[#EDF3FF] px-4 py-2 text-main"
                >
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSkill(skill)} className="text-grey60 hover:text-grey80">
                    ×
                  </button>
                </div>
              ))}
              {selectedSkills.length === 0 && (
                <div className="text-xs text-grey60">필요한 기술 스택을 검색하여 추가해주세요</div>
              )}
            </div>
            <SearchDropdown
              items={toolsData.tools}
              filterFunction={(tool, searchTerm) => tool.toLowerCase().includes(searchTerm.toLowerCase())}
              onSelect={handleAddSkill}
              placeholder="스킬을 영어로 검색해보세요"
            />
          </div>
        </div>
        {/* 모집기간 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              모집 기간<span className="pl-1 text-main">*</span>
            </span>
          </div>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        <hr />

        {/* 세부 공고 작성 */}

        {/* 중요 업무 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              중요 업무<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <Textarea
            placeholder="새로 합류할 팀원이 할 업무에 대해 자세히 적어 주세요"
            value={mainTasks}
            onChange={(e) => setMainTasks(e.target.value)}
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
            placeholder="팀의 업무 방식에 대해 설명해 주세요"
            value={workMethod}
            onChange={(e) => setWorkMethod(e.target.value)}
          />
        </div>

        {/* 이런 분을 찾고 있어요 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-grey80">
              업무 방식<span className="placeholder:-1 text-main">*</span>
            </span>
          </div>
          <Textarea
            placeholder="새로 합류할 팀원이 필수적으로 갖추어야 할 역에 대해 알려 주세요"
            value={idealCandidate}
            onChange={(e) => setIdealCandidate(e.target.value)}
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
            {isExpanded ? '지금은 필수 항목만 작성하기' : '더 작성하고 매칭 확률 높이기'}
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
                placeholder="있다면 우대하는 경력이나 경험에 대해 알려주세요"
                value={preferredQualifications}
                onChange={(e) => setPreferredQualifications(e.target.value)}
              />
            </div>

            {/* 복지 및 혜택 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-grey80">복지 및 혜택</span>
              </div>
              <Textarea
                placeholder="팀원들을 위해 제공하는 복지와 혜택을 알려주세요"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </div>

            {/* 기타 유의사항 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-grey80">기타 유의사항</span>
              </div>
              <Textarea
                placeholder="지원자들이 알아야 할 다른 사항이 있다면 알려주세요"
                value={joiningProcess}
                onChange={(e) => setJoiningProcess(e.target.value)}
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

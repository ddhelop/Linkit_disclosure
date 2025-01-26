'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { RoleContributionInput } from '../RoleContribution/RoleContributionInput'
import { RoleContribution } from '../../model/types'
import { SkillInput } from '../SkillInput/SkillInput'
import { useFileValidation } from '@/shared/lib/hooks/useFileValidation'
import { addPortfolio, getPortfolio, updatePortfolio, getPortfolioById } from '../../api/portfolio'
import { useRouter, useSearchParams } from 'next/navigation'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { ImageUploader } from '@/shared/ui/ImageUploader/ImageUploader'
import { useToast } from '@/shared/hooks/useToast'

export default function NewPortFolio() {
  const toast = useToast()
  const accessToken = localStorage.getItem('accessToken') || ''
  const [isTeam, setIsTeam] = useState(false) // 개인/팀 토글 상태 관리
  const [isOngoing, setIsOngoing] = useState(false) // 진행 중 상태 관리
  const [startDate, setStartDate] = useState('') // 시작 날짜 입력 값
  const [endDate, setEndDate] = useState('') // 종료 날짜 입력 값
  const [roles, setRoles] = useState<RoleContribution[]>([{ role: '', contribution: '' }])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [projectName, setProjectName] = useState('')
  const [projectLineDescription, setProjectLineDescription] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [representImage, setRepresentImage] = useState<File | null>(null)
  const [subImages, setSubImages] = useState<{ id: number; file: File }[]>([])
  const [headCount, setHeadCount] = useState('')
  const [teamComposition, setTeamComposition] = useState('')
  const { validateFile } = useFileValidation()
  const [originalData, setOriginalData] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const portfolioId = searchParams.get('id')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [representImageUrl, setRepresentImageUrl] = useState<string | null>(null)
  const [subImageUrls, setSubImageUrls] = useState<string[]>([])

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!portfolioId) return

      try {
        const response = await getPortfolioById(portfolioId)
        const data = response.result

        console.log('Fetched portfolio data:', data)

        // 기본 정보 설정
        setProjectName(data.projectName || '')
        setProjectLineDescription(data.projectLineDescription || '')
        setIsTeam(data.projectSize === 'TEAM')
        setHeadCount(data.projectHeadCount?.toString() || '1')
        setTeamComposition(data.projectTeamComposition || '')

        // 날짜 정보 설정
        setStartDate(data.projectStartDate || '') // 시작 날짜 설정
        setEndDate(data.projectEndDate || '') // 종료 날짜 설정
        setIsOngoing(data.isProjectInProgress)

        // 역할 및 기여도 설정
        if (data.projectRoleAndContributions?.length > 0) {
          setRoles(
            data.projectRoleAndContributions.map((item: any) => ({
              role: item.projectRole || '',
              contribution: item.projectContribution || '',
            })),
          )
        }

        // 스킬 설정
        if (data.projectSkillNames?.length > 0) {
          setSelectedSkills(data.projectSkillNames.map((item: any) => item.projectSkillName))
        }

        setProjectLink(data.projectLink || '')
        setProjectDescription(data.projectDescription || '')

        // 이미지 URL 저장
        if (data.portfolioImages) {
          if (data.portfolioImages.projectRepresentImagePath) {
            setRepresentImageUrl(data.portfolioImages.projectRepresentImagePath)
          }
          if (data.portfolioImages.portfolioSubImages?.length > 0) {
            setSubImageUrls(data.portfolioImages.portfolioSubImages.map((img: any) => img.projectSubImagePath))
          }
        }

        setOriginalData(data)
      } catch (error) {
        console.error('포트폴리오 데이터 조회 실패:', error)
        toast.alert('데이터를 불러오는데 실패했습니다.')
        router.back()
      }
    }

    fetchPortfolioData()
  }, [portfolioId, router])

  const handleToggle = () => {
    setIsTeam((prev) => !prev)
  }

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('') // "진행 중"을 선택할 때 종료 날짜 초기화
  }

  const handleRoleAdd = () => {
    if (roles.length < 3) {
      setRoles([...roles, { role: '', contribution: '' }])
    }
  }

  const handleRoleRemove = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index))
  }

  const handleRoleChange = (index: number, role: string) => {
    const newRoles = [...roles]
    newRoles[index].role = role
    setRoles(newRoles)
  }

  const handleContributionChange = (index: number, contribution: string) => {
    const newRoles = [...roles]
    newRoles[index].contribution = contribution
    setRoles(newRoles)
  }

  const handleSkillAdd = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  const isFormValid = () => {
    return (
      projectName.trim() !== '' &&
      projectLineDescription.trim() !== '' &&
      startDate !== '' &&
      (isOngoing || endDate !== '') &&
      roles.every((role) => role.role.trim() !== '' && role.contribution.trim() !== '')
    )
  }

  const hasChanges = () => {
    if (!originalData) return true // 새로운 포트폴리오 생성인 경우

    // 각 필드별 변경 사항 확인
    const changes = {
      basicInfo:
        originalData.projectName !== projectName ||
        originalData.projectLineDescription !== projectLineDescription ||
        originalData.projectSize !== (isTeam ? 'TEAM' : 'PERSONAL') ||
        originalData.projectHeadCount !== (isTeam ? parseInt(headCount) : 1) ||
        originalData.projectTeamComposition !== teamComposition,

      dates:
        originalData.projectStartDate !== startDate ||
        originalData.projectEndDate !== (isOngoing ? null : endDate) ||
        originalData.isProjectInProgress !== isOngoing,

      roles:
        JSON.stringify(originalData.projectRoleAndContributions) !==
        JSON.stringify(
          roles.map((role) => ({
            projectRole: role.role,
            projectContribution: role.contribution,
          })),
        ),

      skills:
        JSON.stringify(originalData.projectSkillNames) !==
        JSON.stringify(selectedSkills.map((skill) => ({ projectSkillName: skill }))),

      additionalInfo:
        originalData.projectLink !== projectLink || originalData.projectDescription !== projectDescription,

      images:
        representImage !== null ||
        subImages.length > 0 ||
        subImageUrls.length !== originalData.portfolioImages?.portfolioSubImages?.length,
    }

    // 하나라도 변경된 항목이 있으면 true 반환
    return Object.values(changes).some((changed) => changed)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()

      // 대표 이미지 추가
      if (representImage) {
        formData.append('projectRepresentImage', representImage)
      }

      // 서브 이미지들 추가
      subImages.forEach((image) => {
        formData.append('projectSubImages', image.file)
      })

      // JSON 데이터 생성
      const portfolioData = {
        projectName,
        projectLineDescription,
        projectSize: isTeam ? 'TEAM' : 'PERSONAL',
        projectHeadCount: isTeam ? parseInt(headCount) : 1,
        projectTeamComposition: teamComposition,
        projectStartDate: startDate,
        projectEndDate: isOngoing ? null : endDate,
        isProjectInProgress: isOngoing,
        projectRoleAndContributions: roles.map((role) => ({
          projectRole: role.role,
          projectContribution: role.contribution,
        })),
        projectSkillNames: selectedSkills.map((skill) => ({
          projectSkillName: skill,
        })),
        projectLink,
        projectDescription,
      }

      // 수정 시에는 'updateProfilePortfolioRequest'로, 생성 시에는 'addProfilePortfolioRequest'로 전송
      const requestKey = portfolioId ? 'updateProfilePortfolioRequest' : 'addProfilePortfolioRequest'

      formData.append(requestKey, new Blob([JSON.stringify(portfolioData)], { type: 'application/json' }))

      if (portfolioId) {
        await updatePortfolio(portfolioId, formData)
      } else {
        await addPortfolio(formData, accessToken)
      }

      toast.success('포트폴리오가 성공적으로 저장되었습니다.')
      router.back()
    } catch (error) {
      console.error('Error:', error)
      toast.alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMainImageUpload = (file: File) => {
    const validation = validateFile(file)
    if (!validation.isValid) {
      alert(validation.error)
      return
    }
    setRepresentImage(file)
  }

  const handleSubImageUpload = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validation = validateFile(file)
      if (!validation.isValid) {
        alert(validation.error)
        return false
      }
      return true
    })

    if (subImages.length + validFiles.length > 4) {
      alert('최대 4개의 이미지만 업로드 가능합니다.')
      return
    }

    setSubImages((prev) => [...prev, ...validFiles.map((file) => ({ id: Date.now() + Math.random(), file }))])
  }

  const isButtonDisabled = () => {
    if (!isFormValid()) return true // 필수 필드가 비어있는 경우
    if (portfolioId && !hasChanges()) return true // 수정 모드에서 변경사항이 없는 경우
    return false
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 프로젝트 이름 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              프로젝트명<span className="text-main">*</span>
            </span>

            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>

          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="프로젝트명을 입력해주세요"
          />
        </div>

        {/* 한줄소개 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              한줄소개<span className="text-main">*</span>
            </span>
          </div>

          <Input
            onChange={(e) => setProjectLineDescription(e.target.value)}
            value={projectLineDescription}
            placeholder="프로젝트를 한 줄로 소개해주세요 (60자 이내)"
          />
        </div>

        {/* 규모, 인원, 팀 구성 */}
        <div className="flex gap-8">
          {/* 규모 */}
          <div className="flex flex-col gap-3">
            <span className="flex w-[10.6rem]">
              규모<span className="text-main">*</span>
            </span>
            <div className="flex">
              <button
                onClick={handleToggle}
                className={`w-[5.3rem] rounded-l-[0.625rem] py-2 ${
                  !isTeam ? 'bg-main2 text-white' : 'border border-grey40 bg-grey10 text-grey40'
                }`}
              >
                개인
              </button>
              <button
                onClick={handleToggle}
                className={`w-[5.3rem] rounded-r-[0.625rem] py-2 ${
                  isTeam ? 'bg-main2 text-white' : 'border border-grey40 bg-grey10 text-grey40'
                }`}
              >
                팀
              </button>
            </div>
          </div>

          {/* 인원 */}
          <div className="flex w-[4rem] flex-col gap-3">
            <span>인원</span>
            <Input
              placeholder="2"
              disabled={!isTeam}
              className="px-0 text-center"
              type="number"
              value={headCount}
              onChange={(e) => setHeadCount(e.target.value)}
            />
          </div>

          {/* 팀 구성 */}
          <div className="flex w-full flex-col gap-3">
            <span>팀 구성</span>
            <Input
              placeholder="자유롭게 작성해주세요 (ex. 기획 1, 디자인 1)"
              disabled={!isTeam}
              value={teamComposition}
              onChange={(e) => setTeamComposition(e.target.value)}
            />
          </div>
        </div>

        {/* 기간 */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          isOngoing={isOngoing}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onToggleOngoing={handleOngoingToggle}
        />

        {/* 역할 및 기여도 */}
        <RoleContributionInput
          roles={roles}
          onRoleAdd={handleRoleAdd}
          onRoleRemove={handleRoleRemove}
          onRoleChange={handleRoleChange}
          onContributionChange={handleContributionChange}
        />

        {/* 사용 스킬 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">사용 스킬</span>
          <SkillInput onSkillAdd={handleSkillAdd} onSkillRemove={handleSkillRemove} selectedSkills={selectedSkills} />
        </div>

        {/* 링크 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">링크</span>
          <Input
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="링크를 입력해 주세요"
          />
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-3">
          <span className="flex w-[10.6rem]">설명</span>
          <Textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="프로젝트에 대한 설명을 입력해주세요"
            className="min-h-[8.5rem]"
          />
        </div>

        {/* 이미지 */}
        <ImageUploader
          mainImage={representImage}
          mainImageUrl={representImageUrl}
          subImages={subImages}
          subImageUrls={subImageUrls}
          onMainImageUpload={handleMainImageUpload}
          onMainImageDelete={() => setRepresentImage(null)}
          onSubImageUpload={handleSubImageUpload}
          onSubImageDelete={(id) => setSubImages((prev) => prev.filter((img) => img.id !== id))}
          onSubImageUrlDelete={(index) => setSubImageUrls((prev) => prev.filter((_, i) => i !== index))}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          mode="main"
          animationMode="main"
          className="rounded-xl font-semibold"
          onClick={handleSubmit}
          disabled={isButtonDisabled() || isSubmitting}
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

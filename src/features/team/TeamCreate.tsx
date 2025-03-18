'use client'

import { addressData } from '@/shared/data/addressSelectData'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Radio from '@/shared/ui/Radio/Radio'
import Select from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { useState } from 'react'
import { createTeam } from './api/teamApi'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { validateTeamName } from '@/shared/utils/validation'
export default function TeamCreate() {
  const router = useRouter()
  const toast = useToast()
  // 필수 입력 항목
  const [teamName, setTeamName] = useState('')
  const [teamNameError, setTeamNameError] = useState('')
  const [teamIntro, setTeamIntro] = useState('')
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [isTeamPublic, setIsTeamPublic] = useState<boolean>(true)
  const [teamCode, setTeamCode] = useState('')
  const [teamCodeError, setTeamCodeError] = useState('')
  const [isTeamCodeValid, setIsTeamCodeValid] = useState(true)
  // 선택 입력 항목
  const [teamLogo, setTeamLogo] = useState<File | null>(null)
  const [teamLogoPreview, setTeamLogoPreview] = useState<string>('')
  const [teamLogoPath, setTeamLogoPath] = useState('/common/default_profile.svg')
  const [recruitmentStatus, setRecruitmentStatus] = useState<string[]>([])

  // 팀 공개 여부 옵션
  const options = [
    { label: '전체공개', value: 'true' },
    { label: '비공개', value: 'false' },
  ]

  // 팀 규모 옵션
  const teamSizeOptions = ['1인', '2~5인', '6~9인', '10인 이상']

  // 팀 모집 상태 옵션
  const recruitmentOptions = [
    '팀원 찾는 중',
    '대회 준비 중',
    '공모전 준비 중',
    '지원사업 준비 중',
    '둘러보는 중',
    '프로젝트 진행 중',
    '아이디어 찾는 중',
    '투자 유치 중',
  ]

  // 팀동 지역 옵션
  const mainAreaOptions = addressData.map((city) => ({
    label: city.name,
    value: city.name,
  }))

  const subAreaOptions =
    addressData
      .find((city) => city.name === selectedCity)
      ?.subArea.map((district) => ({
        label: district,
        value: district,
      })) || []

  // 이벤트 핸들러
  const handleStatusClick = (status: string) => {
    setRecruitmentStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleRemoveStatus = (status: string) => {
    setRecruitmentStatus((prev) => prev.filter((s) => s !== status))
  }

  const handleTeamVisibilityChange = (value: string) => {
    setIsTeamPublic(value === 'true')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTeamLogo(file)
      setTeamLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleImageDelete = () => {
    setTeamLogo(null)
    setTeamLogoPreview('')
    setTeamLogoPath('/common/default_team.svg')
  }

  // 팀 아이디 유효성 검사 (영문 또는 영문+숫자)
  const validateTeamCode = (code: string) => {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(code)
  }

  //팀 아이디 변경 핸들러
  const handleTeamCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value
    setTeamCode(newCode)
    setTeamCodeError('')
    setIsTeamCodeValid(true)

    if (newCode && !validateTeamCode(newCode)) {
      setTeamCodeError('영문 또는 영문+숫자 조합만 가능합니다')
      setIsTeamCodeValid(false)
    }
  }

  // 필수 데이터 유효성 검사
  const isFormValid = () => {
    return (
      teamName.trim() !== '' &&
      teamIntro.trim() !== '' &&
      selectedTeamSize !== '' &&
      selectedCity !== '' &&
      selectedDistrict !== '' &&
      teamCode !== '' &&
      isTeamCodeValid &&
      teamNameError === ''
    )
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      if (teamLogo) {
        formData.append('teamLogoImage', teamLogo)
      }

      const teamData = {
        teamName,
        teamShortDescription: teamIntro,
        scaleName: selectedTeamSize,
        cityName: selectedCity,
        divisionName: selectedDistrict,
        teamStateNames: recruitmentStatus,
        isTeamPublic,
        teamCode,
      }

      formData.append('addTeamRequest', new Blob([JSON.stringify(teamData)], { type: 'application/json' }))

      const response = await createTeam(formData)
      if (response.ok) {
        router.push('/team/select')
      }
    } catch (error: any) {
      console.error('팀 생성 실패:', error)
      if (error.message.includes('409')) {
        setTeamCodeError('이미 사용 중인 팀 아이디입니다')
        setIsTeamCodeValid(false)
      } else {
        toast.alert('팀 생성 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 rounded-xl bg-white p-3 md:gap-10 md:p-5 lg:px-[2.88rem] lg:py-10">
        {/* 팀 로고 */}
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span className="text-grey80">팀 로고</span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:gap-8">
            <Image
              src={teamLogoPreview || teamLogoPath || '/common/default_profile.svg'}
              width={150}
              height={150}
              alt="team logo"
              className="h-[120px] w-[120px] rounded-[1.25rem] object-cover md:h-[150px] md:w-[150px]"
            />

            <div className="flex flex-col justify-end">
              <p className="text-xs text-grey50">*10MB 이하의 PNG, JPG, GIF, SVG 파일을 업로드 해주세요</p>
              <div className="flex items-end gap-3 md:gap-4">
                <input
                  type="file"
                  id="teamLogoInput"
                  accept="image/png,image/jpeg,image/gif,image/svg+xml"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  className="mt-2 rounded-xl"
                  animationMode="main"
                  mode="main"
                  onClick={() => document.getElementById('teamLogoInput')?.click()}
                >
                  사진 업로드
                </Button>
                <p className="cursor-pointer text-xs text-grey50 underline" onClick={handleImageDelete}>
                  삭제하기
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 팀명 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            팀명<p className="text-main">*</p>
          </span>
          <Input
            placeholder="팀 이름을 입력해 주세요"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value)
              setTeamNameError(validateTeamName(e.target.value).errorMessage)
            }}
            error={!!teamNameError}
          />
          {teamNameError && <span className="text-sm text-[#FF345F]">{teamNameError}</span>}
        </div>

        {/* 팀 아이디 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            팀 아이디<p className="text-main">*</p>
          </span>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="영문 또는 영문+숫자 조합만 가능합니다"
              value={teamCode}
              onChange={handleTeamCodeChange}
              className={`${!isTeamCodeValid ? 'border-[#FF345F]' : ''}`}
            />
            {teamCodeError && <span className="text-sm text-[#FF345F]">{teamCodeError}</span>}
          </div>
        </div>

        {/* 한줄 소개 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            한 줄 소개<p className="text-main">*</p>
          </span>
          <Input
            placeholder="한 줄 소개를 입력해주세요"
            value={teamIntro}
            onChange={(e) => setTeamIntro(e.target.value)}
          />
        </div>

        {/* 팀 규모 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            규모 <p className="text-main">*</p>
          </span>

          <div className="flex flex-wrap gap-3 md:gap-5">
            {teamSizeOptions.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedTeamSize(selectedTeamSize === size ? '' : size)}
                className={`w-[4.5rem] cursor-pointer rounded-full border py-[0.38rem] text-center text-xs font-normal md:w-[5.75rem] md:text-sm
                  ${
                    selectedTeamSize === size
                      ? 'border-main bg-[#EEF4FF] text-main'
                      : 'border-grey40 bg-grey10 text-grey60'
                  }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* 활동 지역 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            활동 지역 <p className="text-main">*</p>
          </span>

          <div className="flex w-full flex-col gap-4 md:flex-row md:gap-[1.38rem]">
            <div className="flex w-full flex-col gap-2 md:w-[48%]">
              <span className="text-sm text-grey70">시/도</span>
              <Select
                options={mainAreaOptions}
                value={selectedCity}
                placeholder="시/도 선택"
                onChange={(value) => setSelectedCity(value)}
              />
            </div>

            <div className="flex w-full flex-col gap-2 md:w-[48%]">
              <span className="text-sm text-grey70">시/군/구</span>
              <Select
                options={selectedCity ? subAreaOptions : []}
                value={selectedDistrict}
                placeholder={selectedCity ? '시/군/구 선택' : '시/도를 먼저 선택해주세요'}
                onChange={(value) => setSelectedDistrict(value)}
              />
            </div>
          </div>
        </div>

        {/* 팀 현재 상태 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <span className="flex items-center text-grey80">
              현재 상태<p className="text-main">*</p>
            </span>

            {/* 선택된 상태 표시 */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {recruitmentStatus.map((status) => (
                <div
                  onClick={() => handleRemoveStatus(status)}
                  key={status}
                  className="flex min-w-fit cursor-pointer items-center rounded-lg border border-main bg-[#EEF4FF] px-2 py-2 text-xs text-main md:px-4 md:py-3 md:text-sm"
                >
                  <span className="whitespace-nowrap">{status}</span>
                  <button className="ml-1 text-main md:ml-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* 상태 선택 옵션 */}
          <div className="flex w-full flex-wrap gap-2 rounded-xl bg-grey10 p-4 md:gap-3 md:px-6 md:py-7">
            {recruitmentOptions.map((status) => (
              <span
                key={status}
                onClick={() => handleStatusClick(status)}
                className={`min-w-fit cursor-pointer whitespace-nowrap rounded-lg border px-2 py-2 text-xs md:px-4 md:py-3 md:text-sm ${
                  recruitmentStatus.includes(status)
                    ? 'border-main bg-[#EEF4FF] text-main'
                    : 'border-grey40 bg-[#FCFCFD] text-grey50'
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        {/* 팀 공개 여부 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="flex text-grey80">
            팀 공개 여부 <p className="text-main">*</p>
          </span>

          <Radio
            options={options}
            selectedValue={isTeamPublic.toString()}
            onChange={handleTeamVisibilityChange}
            labelClassName=""
          />
        </div>
      </div>

      <div className="mt-4 flex  w-full justify-center md:mt-[1.31rem] lg:justify-end">
        <Button
          className="w-[97%] rounded-xl px-4 py-3 md:px-5 lg:w-full"
          animationMode="main"
          mode="main"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          팀 생성하기
        </Button>
      </div>
    </>
  )
}

'use client'
import { addressData } from '@/shared/data/addressSelectData'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Radio from '@/shared/ui/Radio/Radio'
import Select from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getTeamBasicInfo, updateTeamBasicInfo } from '../../api/teamApi'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'

export default function TeamEditBasic({ params }: { params: { teamName: string } }) {
  const router = useRouter()
  const toast = useToast()
  // 필수 입력 항목
  const [teamName, setTeamName] = useState('')
  const [teamIntro, setTeamIntro] = useState('')
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [isTeamPublic, setIsTeamPublic] = useState<boolean>(true)
  const [teamCode, setTeamCode] = useState('')

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

  const handleImageDelete = async () => {
    try {
      // default_profile.svg를 File 객체로 변환
      const response = await fetch('/common/default_profile.svg')
      const blob = await response.blob()
      const defaultImage = new File([blob], 'default_profile.svg', { type: 'image/svg+xml' })

      setTeamLogo(defaultImage)
      setTeamLogoPreview('')
      setTeamLogoPath('/common/default_profile.svg')
    } catch (error) {
      console.error('기본 이미지 설정 중 오류 발생:', error)
      toast.alert('이미지 삭제 중 오류가 발생했습니다.')
    }
  }

  // 필수 데이터 유효성 검사
  const isFormValid = () => {
    return (
      teamName.trim() !== '' &&
      teamIntro.trim() !== '' &&
      selectedTeamSize !== '' &&
      selectedCity !== '' &&
      selectedDistrict !== ''
    )
  }

  const [initialData, setInitialData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const data = await getTeamBasicInfo(params.teamName)
        const { teamInformMenu } = data.result

        // 초기 데이터 저장
        setInitialData({
          teamName: teamInformMenu.teamName,
          teamIntro: teamInformMenu.teamShortDescription,
          teamSize: teamInformMenu.teamScaleItem.teamScaleName,
          city: teamInformMenu.regionDetail.cityName,
          district: teamInformMenu.regionDetail.divisionName,
          logoPath: teamInformMenu.teamLogoImagePath,
          status: teamInformMenu.teamCurrentStates.map((state) => state.teamStateName),
          teamCode: teamInformMenu.teamCode,
        })

        // 폼 데이터 설정
        setTeamName(teamInformMenu.teamName)
        setTeamIntro(teamInformMenu.teamShortDescription)
        setSelectedTeamSize(teamInformMenu.teamScaleItem.teamScaleName)
        setSelectedCity(teamInformMenu.regionDetail.cityName)
        setSelectedDistrict(teamInformMenu.regionDetail.divisionName)
        setTeamLogoPath(teamInformMenu.teamLogoImagePath)
        setRecruitmentStatus(teamInformMenu.teamCurrentStates.map((state) => state.teamStateName))
        setTeamCode(teamInformMenu.teamCode)
      } catch (error) {
        console.error('Failed to fetch team info:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamInfo()
  }, [params.teamName])

  // 변경사항 감지
  const hasChanges = () => {
    if (!initialData) return false

    return (
      teamName !== initialData.teamName ||
      teamIntro !== initialData.teamIntro ||
      selectedTeamSize !== initialData.teamSize ||
      selectedCity !== initialData.city ||
      selectedDistrict !== initialData.district ||
      teamLogo !== null || // 새로운 로고가 선택된 경우
      teamCode !== initialData.teamCode ||
      JSON.stringify(recruitmentStatus) !== JSON.stringify(initialData.status)
    )
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      if (teamLogo) {
        formData.append('teamLogoImage', teamLogo)
      }

      const updateTeamRequest = {
        teamName,
        teamShortDescription: teamIntro,
        scaleName: selectedTeamSize,
        cityName: selectedCity,
        divisionName: selectedDistrict,
        teamStateNames: recruitmentStatus,
        isTeamPublic,
        teamCode,
      }

      formData.append(
        'updateTeamRequest',
        new Blob([JSON.stringify(updateTeamRequest)], {
          type: 'application/json',
        }),
      )

      const response = await updateTeamBasicInfo(formData, params.teamName)

      if (response.isSuccess) {
        toast.success('팀 정보가 성공적으로 수정되었습니다.')
        const newTeamCode = response.result.teamCode
        router.push(`/team/${newTeamCode}/edit/basic`)

        // 초기 데이터 업데이트
        setInitialData({
          teamName,
          teamIntro,
          teamSize: selectedTeamSize,
          city: selectedCity,
          district: selectedDistrict,
          logoPath: teamLogoPath,
          status: recruitmentStatus,
          teamCode,
        })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error('Failed to update team info:', error)
      toast.alert('팀 정보 수정에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        {/* 팀 로고 */}
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span className="text-grey80">팀 로고</span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>

          <div className="mt-3 flex gap-8">
            <Image
              src={teamLogoPreview || teamLogoPath || '/common/default_profile.svg'}
              width={150}
              height={150}
              alt="team logo"
              className="h-[150px] w-[150px] rounded-[1.25rem] object-cover"
            />

            <div className="flex flex-col justify-end">
              <p className="text-xs text-grey50">*10MB 이하의 PNG, JPG, GIF, SVG 파일을 업로드 해주세요</p>
              <div className="flex items-end gap-4">
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
                  로고 업로드
                </Button>
                <p className="cursor-pointer text-xs text-grey50 underline" onClick={handleImageDelete}>
                  삭제하기
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 팀명 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            팀명<p className="text-main">*</p>
          </span>
          <Input placeholder="팀명을 입력해주세요" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </div>

        {/* 팀 코드 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            팀 아이디<p className="text-main">*</p>
          </span>
          <Input placeholder="팀명을 입력해주세요" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
        </div>

        {/* 한줄 소개 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            한줄 소개<p className="text-main">*</p>
          </span>
          <Input
            placeholder="한줄 소개를 입력해주세요"
            value={teamIntro}
            onChange={(e) => setTeamIntro(e.target.value)}
          />
        </div>

        {/* 팀 규모 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            규모 <p className="text-main">*</p>
          </span>

          <div className="flex gap-5">
            {teamSizeOptions.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedTeamSize(selectedTeamSize === size ? '' : size)}
                className={`w-[5.75rem] cursor-pointer rounded-full border py-[0.38rem] text-center text-sm font-normal
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
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            활동 지역 <p className="text-main">*</p>
          </span>

          <div className="flex w-full gap-[1.38rem]">
            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">시/도</span>
              <Select
                options={mainAreaOptions}
                value={selectedCity}
                placeholder="도/광역시 선택"
                onChange={(value) => setSelectedCity(value)}
              />
            </div>

            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">시/군/구</span>
              <Select
                options={selectedCity ? subAreaOptions : []}
                value={selectedDistrict}
                placeholder={selectedCity ? '구/군 선택' : '도/광역시를 먼저 선택해주세요'}
                onChange={(value) => setSelectedDistrict(value)}
              />
            </div>
          </div>
        </div>

        {/* 팀 현재 상태 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <span className="flex text-grey80">현재 상태</span>

            <div className="flex flex-wrap gap-2">
              {recruitmentStatus.map((status) => (
                <div
                  onClick={() => handleRemoveStatus(status)}
                  key={status}
                  className="flex cursor-pointer items-center rounded-lg border border-main bg-[#EEF4FF] px-4 py-3 text-sm text-main"
                >
                  <span>{status}</span>
                  <button className="ml-2 text-main">✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-wrap gap-3 rounded-xl bg-grey10 px-6 py-7">
            {recruitmentOptions.map((status) => (
              <span
                key={status}
                onClick={() => handleStatusClick(status)}
                className={`cursor-pointer rounded-lg border px-4 py-3 text-sm ${
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
        <div className="flex flex-col gap-3">
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

      <div className="mt-[1.31rem] flex w-full justify-end">
        <Button
          className="rounded-xl px-5 py-[0.38rem]"
          animationMode="main"
          mode="main"
          onClick={handleSubmit}
          disabled={isLoading || !hasChanges() || !isFormValid()}
        >
          저장하기
        </Button>
      </div>
    </>
  )
}

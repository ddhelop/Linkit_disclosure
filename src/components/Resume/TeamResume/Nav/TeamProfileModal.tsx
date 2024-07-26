// 팀 프로필 수정 모달 컴포넌트
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ApiPayload,
  FormInputs,
  PostTeamProfileResponse,
  TeamMiniProfilePlusResponse,
  TeamMiniProfileResponse,
} from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { PostTeamProfile, TeamOnBoardingData, UpdateTeamOnBoardingField } from '@/lib/action'

interface BasicData {
  teamName: string
  sectorName: string
  sizeType: string
  teamBuildingFieldNames: string | null
}

interface ExtendedFormInputs extends FormInputs {
  teamName: string
  teamSize: string
  teamField: string
}

interface TeamProfileModalProps {
  isOpen: boolean
  onClose: () => void
  data: TeamMiniProfilePlusResponse | null
  onUpdate: (data: TeamMiniProfilePlusResponse) => void
}

export default function TeamProfileModal({ isOpen, onClose, data, onUpdate }: TeamProfileModalProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const { control, handleSubmit, watch, setValue } = useForm<ExtendedFormInputs>({
    defaultValues: {
      teamProfileTitle: '',
      isTeamActivate: true,
      skills: '',
      teamName: '',
      teamSize: '',
      teamField: '',
    },
  })

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [basicData, setBasicData] = useState<BasicData>({
    teamName: '',
    sectorName: '',
    sizeType: '',
    teamBuildingFieldNames: null,
  })

  // 소개 항목
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddSkill = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLInputElement>,
  ) => {
    event?.preventDefault()
    if (inputValue.trim() !== '' && skills.length < 3) {
      setSkills([...skills, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSkill(event)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeamOnBoardingData(accessToken)

      if (response.onBoardingFieldTeamInformResponse) {
        setBasicData(response.onBoardingFieldTeamInformResponse)
        setValue('teamName', response.onBoardingFieldTeamInformResponse.teamName || '')
        setValue('teamSize', response.onBoardingFieldTeamInformResponse.sizeType || '')
        setValue('teamField', response.onBoardingFieldTeamInformResponse.sectorName || '')
      }

      if (response.teamMiniProfileResponse) {
        const { teamProfileTitle, isTeamActivate, teamLogoImageUrl, teamKeywordNames, teamDetailInform } =
          response.teamMiniProfileResponse

        setValue('teamProfileTitle', teamProfileTitle || '')
        setValue('isTeamActivate', isTeamActivate || false)

        if (teamLogoImageUrl) {
          setProfileImageUrl(teamLogoImageUrl)
        }

        if (teamKeywordNames) {
          setSkills(teamKeywordNames)
        }
      }
    }
    fetchData()
  }, [setValue, accessToken])

  const isTeamActivate = watch('isTeamActivate')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.size > 2 * 1024 * 1024) {
        alert('이미지 크기는 최대 2MB까지 업로드할 수 있습니다.')
        return
      }
      setValue('profileImage', files)
      setProfileImageUrl(URL.createObjectURL(file))
    }
  }

  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isTeamActivate', event.target.value === '활성화')
  }

  const handleBasicDataSubmit = async () => {
    if (basicData) {
      const response = await UpdateTeamOnBoardingField(accessToken, {
        teamName: basicData.teamName,
        teamSize: basicData.sizeType,
        teamField: basicData.sectorName,
        teamBuildingFieldNames: null,
      })
      if (!response.ok) {
        alert('팀 기본 데이터 저장 실패')
      }
    }
  }

  const handleProfileSubmit = async (data: ExtendedFormInputs) => {
    const payload: ApiPayload = {
      teamProfileTitle: data.teamProfileTitle,
      isTeamActivate: data.isTeamActivate,
      teamKeywordNames: skills,
    }

    const image = data.profileImage && data.profileImage.length > 0 ? data.profileImage[0] : undefined
    const response: PostTeamProfileResponse = await PostTeamProfile(accessToken, payload, image)

    if (response.ok) {
      onUpdate({
        ...data,
        teamKeywordNames: skills,
        teamLogoImageUrl: profileImageUrl || '',
        sectorName: basicData.sectorName,
        sizeType: basicData.sizeType,
        teamBuildingFieldNames: basicData.teamBuildingFieldNames ? [basicData.teamBuildingFieldNames] : [],
        teamDetailInform: data.teamProfileTitle, // Ensure this field is included
      })
      onClose()
    } else {
      alert('프로필 데이터 저장에 실패했습니다.')
    }
  }

  const handleCombinedSubmit = async (data: ExtendedFormInputs) => {
    await handleBasicDataSubmit()
    await handleProfileSubmit(data)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000] bg-opacity-30 transition-opacity duration-300"
      onClick={() => onClose()}
    >
      <motion.div
        className="h-[45rem] max-h-[90vh] w-[30rem] overflow-y-auto rounded-[1.25rem] bg-[#fff] px-6 pt-6"
        initial={{ y: '30px', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-[1.19rem] text-xl font-bold">팀 프로필 수정</h2>
        <form onSubmit={handleSubmit(handleCombinedSubmit)} className="flex w-full flex-col gap-[2.44rem] ">
          {/* 팀명 */}
          <div className="flex flex-col">
            <span className="font-semibold text-grey100">팀명</span>
            <Controller
              name="teamName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  placeholder="팀명"
                  value={field.value || basicData?.teamName || ''}
                  onChange={(e) => {
                    setBasicData({ ...basicData, teamName: e.target.value })
                    field.onChange(e)
                  }}
                />
              )}
            />
          </div>
          {/* 팀 규모 */}
          <div className="flex justify-between">
            <div className="flex w-[48%] flex-col">
              <span className="font-semibold text-grey100">규모</span>
              <Controller
                name="teamSize"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className=" mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                    value={field.value || basicData?.sizeType || ''}
                    onChange={(e) => {
                      setBasicData({ ...basicData, sizeType: e.target.value })
                      field.onChange(e)
                    }}
                  >
                    <option value="" disabled hidden>
                      선택
                    </option>
                    <option value="1-5인">1-5인</option>
                    <option value="5-10인">5-10인</option>
                    <option value="10-20인">10-20인</option>
                    <option value="20인 이상">20인 이상</option>
                  </select>
                )}
              />
            </div>

            {/* 분야 */}
            <div className="flex w-[48%] flex-col">
              <span className="font-semibold text-grey100">분야</span>
              <Controller
                name="teamField"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                    value={field.value || basicData?.sectorName || ''}
                    onChange={(e) => {
                      setBasicData({ ...basicData, sectorName: e.target.value })
                      field.onChange(e)
                    }}
                  >
                    <option value="" disabled hidden>
                      선택
                    </option>
                    <option value="딥테크">딥테크</option>
                    <option value="핀테크">핀테크</option>
                    <option value="이커머스">이커머스</option>
                    <option value="패션/뷰티">패션/뷰티</option>
                    <option value="바이오/의료">바이오/의료</option>
                    <option value="물류/유통">물류/유통</option>
                    <option value="블록체인">블록체인</option>
                    <option value="AI">AI</option>
                    <option value="SaaS">SaaS</option>
                    <option value="플랫폼">플랫폼</option>
                    <option value="ESG">ESG</option>
                    <option value="라이프스타일">라이프스타일</option>
                    <option value="기타">기타</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* 제목 */}
          <div className="flex flex-col">
            <span className="font-semibold text-grey100">
              팀을 소개하는 프로필 제목을 입력해주세요 <span className="font-sm text-[#FF345F]">*</span>
            </span>
            <Controller
              name="teamProfileTitle"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  placeholder="프로필 제목 (최대 20자)"
                  value={field.value || ''}
                />
              )}
            />
          </div>

          {/* 나의 가치 */}
          <div className="flex flex-col">
            <span className="font-semibold text-grey100">
              팀을 소개하는 키워드를 3개 이내로 작성해주세요 <span className="font-sm text-[#FF345F]">*</span>
            </span>

            {/* contents */}
            <div>
              {/* 버튼들 */}
              <div className="flex flex-wrap gap-2 pt-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() => handleRemoveSkill(skill)}
                    className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
                  >
                    <span className="text-[#2563EB]">{skill}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSkill(skill)
                      }}
                      className="ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[#2563EB]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* input container */}
              <div className="mt-[0.88rem] flex flex-col border-t border-grey40">
                <span className="py-[0.88rem] text-sm font-normal">보유 역량을 하나씩 입력해주세요</span>
                <div className="flex w-[17.1rem] items-center gap-[0.63rem]">
                  <input
                    type="text"
                    className="flex-1 rounded border border-grey40 p-2"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="기획"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]"
                    disabled={skills.length >= 3}
                  >
                    추가
                  </button>
                </div>
                {skills.length >= 3 && (
                  <span className="text-sm text-red-500">최대 3개의 항목만 추가할 수 있습니다.</span>
                )}
              </div>
            </div>
          </div>

          {/* 프로필 이미지 */}
          <div className="flex flex-col">
            <div>
              <span className="font-semibold text-grey100">팀 로고</span>
              <span className="font-sm pl-3 text-grey80">추천 사이즈: 512 x 512 px / JPG, PNG, 최대 2MB</span>
            </div>
            <div className="flex items-end gap-[1.19rem] pt-[1.19rem]">
              {profileImageUrl ? (
                <Image src={profileImageUrl} width={125} height={125} alt="profile_image" className="rounded-3xl" />
              ) : (
                <Image src={'/assets/onBoarding/addImage.svg'} width={125} height={125} alt="add_image" />
              )}
              <label className="font-sm flex h-[2rem] cursor-pointer items-center rounded-md bg-[#4D82F3] px-[0.88rem] text-[#fff]">
                이미지 업로드
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
          {/* 프로필 활성화 */}
          <div className="flex flex-col gap-[1.2rem]">
            <p className="font-semibold text-grey100">다른 사람들이 볼 수 있도록 프로필을 게시할까요?</p>
            <div className="flex gap-[1.19rem]">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="active"
                  name="uploadStatus"
                  value="활성화"
                  checked={isTeamActivate === true}
                  onChange={handleUploadStatusChange}
                />
                <label htmlFor="active" className=" text-grey60">
                  활성화
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="inactive"
                  name="uploadStatus"
                  value="비활성화"
                  checked={isTeamActivate === false}
                  onChange={handleUploadStatusChange}
                />
                <label htmlFor="inactive" className=" text-grey60">
                  비활성화
                </label>
              </div>
            </div>
          </div>
          {/* 버튼들 */}
          <div className=" sticky bottom-0 mt-4 flex justify-end gap-2 bg-[#fff] py-4">
            <button type="button" onClick={onClose} className="rounded bg-grey30 px-6 py-2">
              취소
            </button>
            <button type="submit" className="rounded bg-[#2563EB] px-6 py-2 text-sm text-[#fff]">
              수정완료
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiPayload, FormInputs, PostTeamProfileResponse } from '@/lib/types'
import { PostTeamProfile, TeamOnBoardingData } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'

interface BasicData {
  teamName: string
  sectorName: string
  sizeType: string
}

export default function TeamProfile() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const router = useRouter()
  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      profileTitle: '',
      skills: '',
      year: '',
      month: '',
      day: '',
    },
  })

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [uploadDeadline, setUploadDeadline] = useState<boolean>(true)
  const [basicData, setBasicData] = useState<BasicData | undefined>(undefined)

  // 소개 항목
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddSkill = () => {
    event?.preventDefault()
    if (inputValue.trim() !== '') {
      setSkills([...skills, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSkill()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await TeamOnBoardingData(accessToken)
      console.log(response)

      if (response.onBoardingFieldTeamInformResponse) {
        setBasicData(response.onBoardingFieldTeamInformResponse)
      }

      if (response.teamMiniProfileResponse) {
        const { miniProfileTitle, teamUploadPeriod, teamValue, teamDetailInform, teamLogoImageUrl } =
          response.teamMiniProfileResponse
        const [uploadYear, uploadMonth, uploadDay] = teamUploadPeriod
          ? teamUploadPeriod.split('-')
          : ['2024', '01', '01']

        setValue('profileTitle', miniProfileTitle || '')
        setValue('year', uploadYear || '')
        setValue('month', uploadMonth || '')
        setValue('day', uploadDay || '')
        setValue('skills', teamDetailInform || '')

        if (teamLogoImageUrl) {
          setProfileImageUrl(teamLogoImageUrl)
        }
      }
    }
    fetchData()
  }, [setValue, accessToken])

  const profileTitle = watch('profileTitle')

  const year = watch('year')
  const month = watch('month')
  const day = watch('day')
  const profileImage = watch('profileImage')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setValue('profileImage', files)
      setProfileImageUrl(URL.createObjectURL(files[0]))
    }
  }
  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadDeadline(event.target.value === 'completed')
  }
  const isNextButtonEnabled = profileTitle && skills && year && month && day

  const onSubmit = async (data: FormInputs) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    const payload: ApiPayload = {
      teamProfileTitle: data.profileTitle,
      teamUploadPeriod: `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')}`,
      teamUploadDeadline: uploadDeadline,
      teamKeywordNames: skills,
    }

    const image = data.profileImage && data.profileImage.length > 0 ? data.profileImage[0] : undefined
    const response: PostTeamProfileResponse = await PostTeamProfile(accessToken, payload, image)

    if (response.ok) {
      router.push('/onBoarding/complete')
    }
  }

  return (
    <>
      <div className="relative">
        <div className="fixed z-40 mt-[53px] h-[0.18rem] w-4/5 bg-[#2563EB] lg:mt-[62px]"></div>{' '}
      </div>

      <div className="flex w-full flex-col items-center bg-[#fff] p-4 lg:py-16">
        <div className="flex w-full flex-col items-center pb-24 pt-16 lg:w-[901px]">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">팀 이력서가 거의 완성되었어요</span>
            <span className="text-grey60">다른사람들이 보는 팀 프로필이예요. 수정할 사항을 완성해주세요</span>
          </div>

          <div className="flex w-full justify-between gap-14 pt-12">
            {/* left */}
            <div>
              <div className="hidden w-[22.18rem]  flex-col rounded-lg border-[1.67px] border-grey30 p-3 pb-5 lg:flex">
                <span className="pt-2 text-xs font-medium text-grey60">D-59</span>
                <h2 className="text-[1.125rem] font-bold leading-9 text-grey50">
                  {profileTitle || '사이드 프로젝트 함께 할 개발자를 찾고 있어요'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="my-4 bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] text-sm text-grey50">
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 rounded-[0.43rem] bg-grey10 p-[0.62rem]">
                  {profileImageUrl ? (
                    <Image src={profileImageUrl} width={46} height={46} alt="profile_image" className="rounded-3xl" />
                  ) : (
                    <Image src={'/assets/onBoarding/addImage2.svg'} width={46} height={46} alt="add_image" />
                  )}

                  <div className="flex flex-col items-start justify-center gap-[0.12rem]">
                    <span className="text-sm font-semibold text-[#2563EB]">{basicData?.teamName}</span>
                    <div className="flex">
                      <span className="text-xs text-grey60">분야 | {basicData?.sectorName}</span>
                      <span className="text-xs text-grey60">규모 | {basicData?.sizeType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-11 lg:w-[30.7rem]">
              {/* 제목 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  제목을 입력해주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <Controller
                  name="profileTitle"
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

              {/* 프로필 업로드 기간 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  공고 업로드 기간 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <div className="mt-[1.19rem] flex flex-col items-start gap-3 lg:flex-row lg:items-center">
                  <div className="flex gap-2">
                    <Controller
                      name="year"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className="h-8 w-[5.5rem] rounded border border-grey30 px-[0.88rem] text-center"
                          value={field.value || ''}
                        />
                      )}
                    />
                    <Controller
                      name="month"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60">
                          <option value="">월</option>
                          {[...Array(12).keys()].map((month) => (
                            <option key={month + 1} value={month + 1}>
                              {month + 1}월
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <Controller
                      name="day"
                      control={control}
                      render={({ field }) => (
                        <select {...field} className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60">
                          <option value="">일</option>
                          {[...Array(31).keys()].map((d) => (
                            <option key={d + 1} value={d + 1}>
                              {d + 1}일
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadStatus"
                        value="completed"
                        className="form-radio text-blue-500"
                        defaultChecked
                        onChange={handleUploadStatusChange}
                      />
                      <span className="ml-2 text-grey60">마감있음</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadStatus"
                        value="continuous"
                        className="form-radio text-blue-500"
                        onChange={handleUploadStatusChange}
                      />
                      <span className="ml-2 text-grey60">계속 업로드</span>
                    </label>
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

              {/* 나의 가치 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  팀을 홍보할 수 있는 항목을 써주세요 <span className="font-sm text-[#FF345F]">*</span>
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
                    <span className="py-[0.88rem] text-sm font-normal">희망 팀빌딩 분야를 선택해주세요</span>
                    <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                      <input
                        type="text"
                        className="flex-1 rounded border border-grey40 p-2"
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={handleAddSkill}
                        onKeyPress={handleKeyPress}
                        placeholder="ex. Notion"
                      />
                      <button className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]">추가</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
                <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
                  <Link href="/onBoarding/team/member">
                    <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-12 py-2 lg:px-16">
                      이전
                    </button>
                  </Link>

                  <button
                    type="submit"
                    className={`mr-4 rounded px-12 py-2 lg:px-16 ${
                      isNextButtonEnabled ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
                    }`}
                    disabled={!isNextButtonEnabled}
                  >
                    다음
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

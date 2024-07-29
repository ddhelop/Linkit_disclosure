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
import OnBoardingHeader from '../OnBoardingHeader'

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
      teamProfileTitle: '',
      isTeamActivate: true,
      skills: '',
    },
  })

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [basicData, setBasicData] = useState<BasicData | undefined>(undefined)

  // 소개 항목
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
      }

      if (response.teamMiniProfileResponse) {
        const { teamProfileTitle, isTeamActivate, teamLogoImageUrl } = response.teamMiniProfileResponse

        setValue('teamProfileTitle', teamProfileTitle || '')
        setValue('isTeamActivate', isTeamActivate || false)

        if (teamLogoImageUrl) {
          setProfileImageUrl(teamLogoImageUrl)
        }
      }
    }
    fetchData()
  }, [setValue, accessToken])

  const teamProfileTitle = watch('teamProfileTitle')
  const isTeamActivate = watch('isTeamActivate')
  const profileImage = watch('profileImage')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      if (files[0].size > 1024 * 1024 * 2) {
        alert('이미지 크기는 최대 2MB까지 업로드할 수 있습니다.')
        return
      }
      setValue('profileImage', files)
      setProfileImageUrl(URL.createObjectURL(files[0]))
    }
  }

  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isTeamActivate', event.target.value === '활성화')
  }

  const isNextButtonEnabled = teamProfileTitle && skills.length > 0 && skills.length <= 3

  const onSubmit = async (data: FormInputs) => {
    const payload: ApiPayload = {
      teamProfileTitle: data.teamProfileTitle,
      isTeamActivate: data.isTeamActivate,
      teamKeywordNames: skills,
    }

    const image = data.profileImage && data.profileImage.length > 0 ? data.profileImage[0] : undefined
    const response: PostTeamProfileResponse = await PostTeamProfile(accessToken, payload, image)

    if (response.ok) {
      setIsOpen(true)
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div className="flex h-full w-full flex-col items-center bg-[#FCFCFD] p-4">
        <OnBoardingHeader percentage={75} />
        <div className="flex w-full flex-col items-center pb-24 pt-24 lg:w-[988px]">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">팀 소개서가 거의 완성되었어요</span>
            <span className="text-grey60">다른 사용자들이 보는 팀의 프로필이에요. 항목을 채워 넣어주세요!</span>
          </div>

          <div className="flex w-full justify-between gap-4 pt-12">
            {/* left */}
            <div>
              <div className="hidden w-[25rem] flex-col rounded-2xl border border-grey30 bg-white p-4 pb-5 lg:flex">
                <h2 className="text-[1.25rem] font-bold leading-9 text-grey50">
                  {teamProfileTitle || '팀을 소개하는 프로필 제목을 입력해 주세요'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="my-4 bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] text-sm text-grey50">
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex gap-4 rounded-[0.43rem]">
                  {profileImageUrl ? (
                    <Image src={profileImageUrl} width={46} height={46} alt="profile_image" className="rounded-full" />
                  ) : (
                    <Image
                      src={'/assets/onBoarding/addImage2.svg'}
                      width={46}
                      height={46}
                      alt="add_image"
                      className="rounded-full"
                    />
                  )}

                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="text-xs font-semibold text-grey70">{basicData?.teamName}</span>
                    <div className="flex text-xs text-grey60">
                      <span className="">분야 | {basicData?.sectorName}</span>
                      <span className="">규모 | {basicData?.sizeType}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center pt-2">
                <div className="rounded-[0.35rem] bg-grey30 px-[0.56rem] py-1 text-sm text-grey60">예시 이미지</div>
              </div>
            </div>

            {/* right */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-[3.44rem] rounded-2xl border border-grey30 bg-white p-[1.88rem] lg:w-[36.7rem]"
            >
              {/* 제목 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  팀을 소개하는 프로필 제목을 입력해 주세요 <span className="font-sm text-main">*</span>
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
                  팀을 소개하는 키워드를 3개 이내로 작성해주세요 <span className="font-sm text-main">*</span>
                </span>

                {/* contents */}
                <div>
                  {/* 버튼들 */}
                  {skills && skills.length > 0 && (
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
                  )}

                  {/* input container */}
                  <div className="mt-[0.88rem] flex flex-col ">
                    <span className="pb-[0.88rem] text-sm font-normal text-grey50">키워드를 하나씩 입력해주세요.</span>
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
                        className="w-28 rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]"
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
                    <Image src={'/assets/onBoarding/addImage2.svg'} width={125} height={125} alt="add_image" />
                  )}
                  <label className="font-sm flex h-[2rem] cursor-pointer items-center rounded-md bg-main px-[0.88rem] text-[#fff]">
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

              {/* Footer */}
              <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
                <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
                  <Link href="/onBoarding/team/activityWay">
                    <button className=" mr-4 rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16">이전</button>
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
        {/* Modal */}
        <div
          className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#00000033]  ${
            isOpen ? 'visible' : 'hidden'
          }`}
        >
          <div className="flex h-[18.6rem] w-[22.5rem] flex-col items-center rounded-lg bg-white p-4">
            <div className="pt-5 text-[2.5rem]">🎉</div>
            <h2 className="mt-3 text-xl font-bold text-grey100">링킷에 오신 걸 환영합니다!</h2>
            <p className="pb-5 pt-1 text-center text-sm text-grey60">
              미니프로필 작성을 완료하셨어요
              <br /> 팀빌딩이 이루어지려면 프로필 완성이 필요해요
            </p>

            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/TeamResume')
              }}
              className=" w-full rounded-[0.6rem] bg-grey90 py-[0.83rem] text-[#fff]"
            >
              프로필 완성하기
            </button>
            <Link href={'/'}>
              <p className="mt-[0.38rem] cursor-pointer text-sm text-grey60 underline">그냥 둘러볼게요</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

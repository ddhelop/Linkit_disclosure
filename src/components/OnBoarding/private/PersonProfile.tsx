'use client'
import Image from 'next/image'
import { useState, useEffect, ChangeEvent, KeyboardEvent, use } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Link from 'next/link'
import { GetOnBoardingData, PostProfileData } from '@/lib/action'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { useRouter } from 'next/navigation'

interface FormInputs {
  profileTitle: string
  uploadYear: number
  uploadMonth: number
  uploadDay: number
  myValue: string
  skillSets: string
}

export default function RegisterPersonProfile() {
  const { register, handleSubmit, watch, setValue, control } = useForm<FormInputs>()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [dDay, setDDay] = useState<number | null>(null)
  const accessToken = useRecoilState(accessTokenState)[0] || ''
  const [uploadDeadline, setUploadDeadline] = useState<boolean>(true)
  const router = useRouter()

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(file)
        setProfileImageUrl(URL.createObjectURL(file))
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateDDay = (year: number, month: number, day: number) => {
    if (year && month && day) {
      const endDate = new Date(year, month - 1, day)
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDDay(diffDays)
    }
  }

  const handleDateChange = (year: number, month: number, day: number) => {
    if (year && month && day) {
      calculateDDay(year, month, day)
    }
  }

  // 개인 온보딩 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetOnBoardingData(accessToken)
        console.log('OnBoarding Data:', response)

        if (response.miniProfileResponse) {
          const { profileTitle, uploadPeriod, myValue, myKeywordNames, miniProfileImg } = response.miniProfileResponse
          const [uploadYear, uploadMonth, uploadDay] = uploadPeriod.split('-').map(Number)

          setValue('profileTitle', profileTitle)
          setValue('uploadYear', uploadYear)
          setValue('uploadMonth', uploadMonth)
          setValue('uploadDay', uploadDay)
          setValue('myValue', myValue)
          setSkills(myKeywordNames)

          if (miniProfileImg) {
            setProfileImageUrl(miniProfileImg)
          }
        }
      } catch (error) {
        console.error('Failed to fetch onboarding data:', error)
      }
    }
    fetchData()
  }, [setValue])

  useEffect(() => {
    const subscription = watch(({ uploadYear = 2024, uploadMonth = 1, uploadDay = 1 }) => {
      handleDateChange(uploadYear, uploadMonth, uploadDay)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { profileTitle, uploadYear, uploadMonth, uploadDay, myValue } = data

    const uploadPeriod = `${uploadYear}-${String(uploadMonth).padStart(2, '0')}-${String(uploadDay).padStart(2, '0')}`
    const myKeywordNames = skills

    const payload = {
      profileTitle,
      uploadPeriod,
      uploadDeadline,
      myValue,
      myKeywordNames,
    }

    console.log(payload)
    console.log(profileImage)

    // 여기에 fetch API로 POST 요청을 보내는 코드를 추가하세요
    if (!accessToken) return
    try {
      const response = await PostProfileData(accessToken, payload, profileImage)
      console.log('Success:', response)
      if (response.ok) {
        router.push('/onBoarding/complete')
      } else {
        console.error('Error:', response)
      }
    } catch (error) {
      console.error('Error in POST request:', error)
    }
  }

  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadDeadline(event.target.value === 'completed')
  }

  return (
    <>
      <div className="relative">
        <div className="fixed z-40 mt-[53px] h-[0.18rem] w-2/3 bg-[#2563EB] lg:mt-[62px]"></div>
      </div>

      <div className="flex w-full flex-col items-center bg-[#fff] p-4 pb-20 pt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center lg:w-[901px] lg:py-20">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-sm font-medium leading-9 text-grey60">내 이력서 가이드</span>
            <span className="text-2xl font-bold">내 이력서가 거의 완성되었어요</span>
            <span className="pt-1 text-sm text-grey60 lg:text-base">
              다른사람들이 보는 나의 프로필이예요. 수정할 사항을 완성해주세요 :)
            </span>
          </div>

          <div className="flex w-full pt-12 lg:justify-between lg:gap-14">
            {/* left */}
            <div className="hidden h-[16.7rem] w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30 p-[0.77rem] lg:flex">
              <span className="pt-2 text-[0.76rem] font-medium text-grey60">
                D-<span>{dDay !== null ? dDay : 'day'}</span>
              </span>
              <h2 className="text-[1.1rem] font-bold leading-9 text-grey50">
                {watch('profileTitle') || '사이드 프로젝트 함께 할 개발자를 찾고 있어요'}
              </h2>
              <div className="my-4 flex flex-wrap">
                {skills.map((skill, index) => (
                  <div className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] text-[0.94rem] text-[#2563EB]">
                    {skill}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex justify-center py-3">
                  {profileImageUrl ? (
                    <Image src={profileImageUrl} width={45} height={45} alt="profile_image" className="rounded-3xl" />
                  ) : (
                    <Image src={'/assets/onBoarding/addImage.svg'} width={45} height={45} alt="add_image" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[#2563EB]">유나</span>
                  <span className="text-grey60">{watch('skillSets') || '기획, AI 엔지니어, LLM'}</span>
                </div>
              </div>
              <div className="mt-[0.51rem] bg-grey10 px-4 py-3 pr-12 text-sm text-grey50">
                💬 &nbsp; {watch('myValue') || '공동의 목표를 위해 가감없는 피드백'}
              </div>
            </div>

            {/* right */}
            <div className="flex w-full flex-col gap-11 lg:w-[30.7rem]">
              {/* 제목 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나의 프로필 제목을 입력해주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  {...register('profileTitle')}
                  placeholder="프로필 제목 (최대 20자)"
                />
              </div>

              {/* 프로필 업로드 기간 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  프로필 업로드 기간 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <div className="mt-[1.19rem] flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex gap-2">
                    <Controller
                      name="uploadYear"
                      control={control}
                      defaultValue={2024}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          id="year"
                          onChange={(e) => {
                            field.onChange(e)
                            handleDateChange(Number(e.target.value), watch('uploadMonth'), watch('uploadDay'))
                          }}
                          className="h-8 w-[5.5rem] rounded border border-grey30 px-[0.88rem] text-center"
                        />
                      )}
                    />
                    <Controller
                      name="uploadMonth"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="month"
                          onChange={(e) => {
                            field.onChange(e)
                            handleDateChange(watch('uploadYear'), Number(e.target.value), watch('uploadDay'))
                          }}
                          className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60"
                        >
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
                      name="uploadDay"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="day"
                          onChange={(e) => {
                            field.onChange(e)
                            handleDateChange(watch('uploadYear'), watch('uploadMonth'), Number(e.target.value))
                          }}
                          className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60"
                        >
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
                  <div className="flex items-center gap-4 pl-1 lg:pl-0">
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
                  <span className="font-semibold text-grey100">프로필 이미지</span>
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
                  협업 시 중요한 나의 가치를 알려주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  {...register('myValue')}
                  placeholder="공동의 목표를 위해 가감없는 피드백 (최대 20자)"
                />
              </div>

              {/* 스킬셋 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나를 소개할 수 있는 항목을 소개해주세요 <span className="font-sm text-[#FF345F]">*</span>
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
            </div>
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
            <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
              <Link href="/onBoarding/project">
                <button type="button" className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-12 py-2 lg:px-16">
                  이전
                </button>
              </Link>
              <button type="submit" className="mr-4 rounded bg-[#2563EB] px-12 py-2 text-[#fff] lg:px-16">
                다음
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

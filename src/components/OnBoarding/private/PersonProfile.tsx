'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { PostProfileData } from '@/lib/action'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'

interface FormInputs {
  profileTitle: string
  uploadYear: string
  uploadMonth: string
  uploadDay: string
  myValue: string
  skillSets: string
}

export default function RegisterPersonProfile() {
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [dDay, setDDay] = useState<number | null>(null)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [uploadDeadline, setUploadDeadline] = useState<boolean>(true) // 추가된 상태

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateDDay = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const endDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDDay(diffDays)
    }
  }

  const handleDateChange = () => {
    const year = (document.getElementById('year') as HTMLInputElement).value
    const month = (document.getElementById('month') as HTMLSelectElement).value
    const day = (document.getElementById('day') as HTMLSelectElement).value
    calculateDDay(year, month, day)
  }

  useEffect(() => {
    const subscription = watch(({ uploadYear = '', uploadMonth = '', uploadDay = '' }) => {
      calculateDDay(uploadYear, uploadMonth, uploadDay)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { profileTitle, uploadYear, uploadMonth, uploadDay, myValue, skillSets } = data

    const uploadPeriod = `${uploadYear}-${String(uploadMonth).padStart(2, '0')}-${String(uploadDay).padStart(2, '0')}`

    const payload = {
      profileTitle,
      uploadPeriod,
      uploadDeadline,
      myValue: myValue.split(','),
      skillSets: skillSets.split(','),
    }

    console.log('Payload:', payload)
    // 여기에 fetch API로 POST 요청을 보내는 코드를 추가하세요
    if (!accessToken) return
    await PostProfileData(accessToken, payload)
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error))
  }

  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadDeadline(event.target.value === 'completed')
  }

  return (
    <>
      <div className="relative">
        <div className="fixed z-40 mt-[53px] h-[0.18rem] w-2/3 bg-[#2563EB] lg:mt-[69px]"></div>
      </div>

      <div className="flex w-full flex-col items-center bg-[#fff] p-4 pb-20 pt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center lg:w-[901px] lg:py-20">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-sm font-medium leading-9 text-grey60">내 이력서 가이드</span>
            <span className="text-2xl font-bold">내 이력서가 거의 완성되었어요</span>
            <span className="pt-1 text-sm text-grey60 lg:text-base">
              다른사람들이 보는 나의 프로필이예요. 수정할 사항을 완성해주세요
            </span>
          </div>

          <div className="flex w-full pt-12 lg:justify-between lg:gap-14">
            {/* left */}
            <div className="hidden h-[31.4rem] w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30 p-5 lg:flex">
              <h2 className="text-2xl font-bold leading-9 text-grey50">
                {watch('profileTitle') || '사이드 프로젝트 함께 할 개발자를 찾고 있어요'}
              </h2>
              <span className="pt-2 font-medium text-grey60">
                D-<span>{dDay !== null ? dDay : 'day'}</span>
              </span>
              <div className="flex justify-center py-3">
                {profileImage ? (
                  <Image src={profileImage} width={125} height={125} alt="profile_image" className="rounded-3xl" />
                ) : (
                  <Image src={'/assets/onBoarding/addImage.svg'} width={125} height={125} alt="add_image" />
                )}
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold text-[#2563EB]">유나</span>
                <span className="text-grey60">{watch('skillSets') || '기획, AI 엔지니어, LLM'}</span>
                <div className="mt-7 bg-grey10 px-4 py-3 pr-12 text-sm text-grey50">
                  💬 &nbsp; {watch('myValue') || '공동의 목표를 위해 가감없는 피드백'}
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="font-sm flex w-[8.7rem] justify-center rounded-md bg-grey10 px-[0.88rem] py-3 text-grey90">
                    찜하기
                  </div>
                  <div className="font-sm flex w-[8.7rem] justify-center rounded-md bg-grey100 px-[0.88rem] py-3 text-[#fff]">
                    연락하기
                  </div>
                </div>
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
                    <input
                      type="number"
                      defaultValue={2024}
                      id="year"
                      {...register('uploadYear')}
                      onChange={handleDateChange}
                      className="h-8 w-[5.5rem] rounded border border-grey30 px-[0.88rem] text-center"
                    />
                    <select
                      id="month"
                      {...register('uploadMonth')}
                      onChange={handleDateChange}
                      className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60"
                    >
                      <option value="">월</option>
                      {[...Array(12).keys()].map((month) => (
                        <option key={month + 1} value={month + 1}>
                          {month + 1}월
                        </option>
                      ))}
                    </select>
                    <select
                      id="day"
                      {...register('uploadDay')}
                      onChange={handleDateChange}
                      className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60"
                    >
                      <option value="">일</option>
                      {[...Array(31).keys()].map((d) => (
                        <option key={d + 1} value={d + 1}>
                          {d + 1}일
                        </option>
                      ))}
                    </select>
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
                  {profileImage ? (
                    <Image src={profileImage} width={125} height={125} alt="profile_image" className="rounded-3xl" />
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
                  나의 스킬셋 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  {...register('skillSets')}
                  placeholder="스킬셋 (최대 20자)"
                />
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

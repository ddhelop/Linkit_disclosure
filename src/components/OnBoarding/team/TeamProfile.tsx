'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { ChangeEvent } from 'react'

interface FormInputs {
  profileTitle: string
  collaborationValue: string
  skills: string
  year: string
  month: string
  day: string
  profileImage?: string
}

export default function TeamProfile() {
  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      profileTitle: '',
      collaborationValue: '',
      skills: '',
      year: '',
      month: '',
      day: '',
    },
  })

  const profileTitle = watch('profileTitle')
  const collaborationValue = watch('collaborationValue')
  const skills = watch('skills')
  const year = watch('year')
  const month = watch('month')
  const day = watch('day')
  const profileImage = watch('profileImage')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue('profileImage', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isNextButtonEnabled = profileTitle && collaborationValue && skills && year && month && day

  const onSubmit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <>
      <div className="relative">
        <div className="fixed top-[4.5rem] z-40 h-[0.18rem] w-2/3 bg-[#2563EB]"></div>{' '}
      </div>

      <div className="flex w-full flex-col items-center py-16">
        <div className="flex w-[901px] flex-col items-center py-20">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">팀 이력서가 거의 완성되었어요</span>
            <span className="text-grey60">다른사람들이 보는 팀 프로필이예요. 수정할 사항을 완성해주세요</span>
          </div>

          <div className="flex w-full justify-between gap-14 pt-12">
            {/* left */}
            <div className="flex h-[25.6rem]  w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30 p-5">
              <h2 className="text-2xl font-bold leading-9 text-grey50">
                {profileTitle || '사이드 프로젝트 함께 할 개발자를 찾고 있어요'}
              </h2>
              <span className="pt-2 font-medium text-grey60">D-59</span>

              <div className="flex gap-5 py-3">
                {profileImage ? (
                  <Image src={profileImage} width={80} height={80} alt="profile_image" className="rounded-3xl" />
                ) : (
                  <Image src={'/assets/onBoarding/addImage.svg'} width={80} height={80} alt="add_image" />
                )}

                <div className="flex flex-col items-start ">
                  <span className="text-lg font-semibold text-[#2563EB]">링킷(Linkit)</span>
                  <span className="pt-[0.69rem] text-sm text-grey60">분야 | 플랫폼</span>
                  <span className="text-sm text-grey60">규모 | 2-5인</span>
                </div>
              </div>

              <div className="mt-7 max-w-[18.8rem] bg-grey10 px-4 py-3 pr-12 text-sm text-grey50">
                💬 &nbsp; {collaborationValue || '공동의 목표를 위해 가감없는 피드백'}
              </div>

              <div className="pt-6 text-sm text-grey80">#해커톤 #사무실 있음 #서울시</div>
            </div>

            {/* right */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-[30.7rem] flex-col gap-11">
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
                    />
                  )}
                />
              </div>

              {/* 프로필 업로드 기간 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  공고 업로드 기간 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <div className="mt-[1.19rem] flex items-center gap-3">
                  <Controller
                    name="year"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        defaultValue={2024}
                        className="h-8 w-[5.5rem] rounded border border-grey30 px-[0.88rem] text-center"
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
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadStatus"
                        value="completed"
                        className="form-radio text-blue-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-grey60">마감</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="uploadStatus" value="continuous" className="form-radio text-blue-500" />
                      <span className="ml-2 text-grey60">업로드</span>
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
                  팀을 홍보할 수 있는 가치를 써주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <Controller
                  name="collaborationValue"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                      placeholder="빠르게 성장하는 팀, 최단기간 투자유치 달성 (최대 40자)"
                    />
                  )}
                />
              </div>

              {/* 스킬셋 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  팀의 세부정보 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                      placeholder="팀 세부정보 (최대 20자)"
                    />
                  )}
                />
              </div>

              {/* Footer */}
              <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
                <div className="flex justify-end p-4 pr-96">
                  <Link href="/onBoarding/select">
                    <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">이전</button>
                  </Link>
                  <button
                    type="submit"
                    className={`mr-4 rounded px-16 py-2 ${
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

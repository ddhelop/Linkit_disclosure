'use client'
import Image from 'next/image'
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { GetOnBoardingData, PostProfileData } from '@/lib/action'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { useRouter } from 'next/navigation'

interface FormInputs {
  profileTitle: string
  isActivate: boolean
  skillSets: string
  memberName: string
  myKeywordNames: string[]
}

export default function RegisterPersonProfile() {
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const accessToken = useRecoilState(accessTokenState)[0] || ''
  const [uploadDeadline, setUploadDeadline] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // 이름, 역할 항목
  const [memberName, setMemberName] = useState<string>('')
  const [role, setRole] = useState<string[]>([])

  const router = useRouter()

  // 소개 항목
  const [skills, setSkills] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddSkill = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (inputValue.trim() !== '' && skills.length < 3) {
      setSkills((prevSkills) => [...prevSkills, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddSkill(event as unknown as React.MouseEvent<HTMLButtonElement>)
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

  // 개인 온보딩 데이터 GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetOnBoardingData(accessToken)

        if (response.miniProfileResponse) {
          const { profileTitle, isActivate, memberName, myKeywordNames, miniProfileImg } = response.miniProfileResponse
          const {} = response.jobAndSkillResponse

          setValue('profileTitle', profileTitle)
          setValue('isActivate', isActivate)
          setValue('memberName', memberName)
          setMemberName(memberName)
          setRole(response.jobAndSkillResponse.jobRoleNames || [])

          setSkills(myKeywordNames || [])

          if (miniProfileImg) {
            setProfileImageUrl(miniProfileImg)
          }
        }
      } catch (error) {
        console.error('Failed to fetch onboarding data:', error)
      }
    }
    fetchData()
  }, [setValue, accessToken])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { profileTitle } = data

    const myKeywordNames = skills

    const miniProfileRequest = {
      profileTitle,
      myKeywordNames,
      isActivate: uploadDeadline,
    }

    // 여기에 fetch API로 POST 요청을 보내는 코드를 추가하세요
    if (!accessToken) return
    try {
      const response = await PostProfileData(accessToken, miniProfileRequest, profileImage)

      if (response.ok) {
        setIsOpen(true)
      } else {
        console.error('Error:', response)
      }
    } catch (error) {
      console.error('Error in POST request:', error)
    }
  }

  const handleUploadStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadDeadline(event.target.value === '활성화')
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
      <div className="flex w-full flex-col items-center bg-[#fff] p-4 pb-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center lg:w-[988px] lg:py-20">
          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-sm font-medium leading-9 text-grey60">내 이력서 가이드</span>
            <span className="text-2xl font-bold">내 이력서가 거의 완성되었어요</span>
            <span className="pt-1 text-sm text-grey60 lg:text-base">
              다른사람들이 보는 나의 프로필이예요. 수정할 사항을 완성해주세요 :)
            </span>
          </div>

          <div className="flex w-full pt-12 lg:justify-between lg:gap-[8.44rem]">
            {/* left */}
            <div className="">
              <div className="hidden h-auto w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30 p-[0.77rem] lg:flex">
                <h2 className="text-xl font-bold leading-9 text-grey50">
                  {watch('profileTitle') || ' 나를 소개하는 프로필 제목을 입력해 주세요'}
                </h2>
                <div className="flex  flex-wrap gap-1 pt-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="mb-8 mt-3 rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] text-sm  text-grey60"
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex justify-center">
                    {profileImageUrl ? (
                      <Image src={profileImageUrl} width={45} height={45} alt="profile_image" className="rounded-3xl" />
                    ) : (
                      <Image src={'/assets/onBoarding/addImage.svg'} width={45} height={45} alt="add_image" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-grey70">{memberName}</span>
                    <span className="text-xs text-grey60">{role.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="flex w-full flex-col gap-[3.44rem] lg:w-[30.7rem]">
              {/* 제목 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나를 소개하는 프로필 제목을 입력해주세요 <span className="font-sm text-[#2563EB]">*</span>
                </span>
                <input
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  {...register('profileTitle')}
                  placeholder="프로필 제목 (최대 20자)"
                />
              </div>

              {/* 스킬셋 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나를 소개하는 키워드를 3개 이내로 작성해주세요 <span className="font-sm text-[#2563EB]">*</span>
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
                    <span className="py-[0.88rem] text-sm font-normal text-grey50">키워드를 하나씩 입력해주세요</span>
                    <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                      <input
                        type="text"
                        className="flex-1 rounded border border-grey40 p-2"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Text Field"
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
                  <span className="font-semibold text-grey100">프로필 이미지</span>
                  <span className="font-sm pl-3 text-grey80">추천 사이즈: 512 x 512 px / JPG, PNG, 최대 2MB</span>
                </div>
                <div className="flex items-end gap-[1.19rem] pt-[1.19rem]">
                  {profileImageUrl ? (
                    <Image src={profileImageUrl} width={125} height={125} alt="profile_image" className="rounded-3xl" />
                  ) : (
                    <Image src={'/assets/onBoarding/addImage.svg'} width={125} height={125} alt="add_image" />
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
                      checked={uploadDeadline === true}
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
                      checked={uploadDeadline === false}
                      onChange={handleUploadStatusChange}
                    />
                    <label htmlFor="inactive" className=" text-grey60">
                      비활성화
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
            <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
              <Link href="/onBoarding/person/career">
                <button type="button" className=" mr-4 rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16">
                  이전
                </button>
              </Link>
              <button type="submit" className="mr-4 rounded bg-[#2563EB] px-12 py-2 text-[#fff] lg:px-16">
                다음
              </button>
            </div>
          </div>
        </form>

        {/* Modal */}
        <div
          className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#00000033] ${
            isOpen ? 'visible' : 'hidden'
          }`}
        >
          <div className="flex h-[14.7rem] w-[22.5rem] flex-col items-center rounded-lg bg-white p-4">
            <Image src="/assets/icons/blue_check.svg" width={44} height={44} alt="check" className="mt-5" />
            <h2 className="mt-3 text-xl font-bold text-grey100">가입을 축하합니다.</h2>

            <button
              onClick={() => {
                setIsOpen(false)
                router.push('/myResume')
              }}
              className="mt-[1.63rem] w-full rounded-[0.6rem] bg-grey90 py-[0.83rem] text-[#fff]"
            >
              프로필 마무리짓기
            </button>
            <Link href={'/'}>
              <p className="mt-[0.38rem] cursor-pointer text-sm text-grey60 underline">링킷 둘러보기</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

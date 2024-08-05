'use client'
import { accessTokenState } from '@/context/recoil-context'
import { GetOnBoardingData, PostProfileData, PutProfileData } from '@/lib/action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'
import { grayHoverEffect, mainHoverEffect } from '@/lib/animations'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface MiniProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormInputs {
  profileTitle: string
  isActivate: boolean
  skillSets: string
  memberName: string
  myKeywordNames: string[]
}

export default function MiniProfileModal({ isOpen, onClose }: MiniProfileModalProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const accessToken = useRecoilState(accessTokenState)[0] || ''
  const [uploadDeadline, setUploadDeadline] = useState<boolean>(true)

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

  const handleKeyPress = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddSkill(event as unknown as React.MouseEvent<HTMLButtonElement>)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        pushNotification('이미지 파일은 최대 2MB까지 업로드 가능합니다.', 'error')
        return
      }
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

  // 저장하기
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { profileTitle } = data

    const myKeywordNames = skills

    const miniProfileRequest = {
      profileTitle,
      myKeywordNames,
      isActivate: uploadDeadline,
    }

    if (!accessToken) return
    try {
      const response = await PutProfileData(accessToken, miniProfileRequest, profileImage)

      if (response.ok) {
        onClose()
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

  // 스크롤 방지 및 ESC 키 이벤트 처리
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000] bg-opacity-30 transition-opacity duration-300"
      onClick={handleOutsideClick}
    >
      <motion.div
        className="h-[45rem] max-h-[90vh] w-[30rem] overflow-y-auto rounded-[1.25rem] bg-[#fff] px-6 pt-6"
        initial={{ y: '30px', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <h2 className="mb-4 text-lg font-bold">미니 프로필 수정</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-[3.44rem]">
            {/* 제목 */}
            <div className="flex flex-col">
              <span className="font-semibold text-grey100">
                나를 소개하는 프로필 제목을 입력해주세요 <span className="font-sm text-[#FF345F]">*</span>
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
                나를 소개하는 키워드를 3개 이내로 작성해주세요 <span className="font-sm text-[#FF345F]">*</span>
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
                  <div className="flex w-[17.1rem] items-center gap-[0.63rem]">
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
          {/* 버튼들 */}
          <div className=" sticky bottom-0 mt-4 flex justify-end gap-2 bg-[#fff] py-4">
            <motion.button {...grayHoverEffect} type="button" onClick={onClose} className="rounded bg-grey30 px-6 py-2">
              취소
            </motion.button>
            <motion.button
              {...mainHoverEffect}
              type="submit"
              className="rounded bg-[#2563EB] px-6 py-2 text-sm text-[#fff]"
            >
              수정완료
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

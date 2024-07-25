import { TeamMiniProfileResponse } from '@/lib/types'
import Image from 'next/image'
import { useState, ChangeEvent, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface TeamProfileModalProps {
  isOpen: boolean
  onClose: () => void
  data: TeamMiniProfileResponse | null
}

interface FormInputs {
  teamProfileTitle: string
  isTeamActivate: boolean
  teamKeywordNames: string[]
  profileImage: File[]
}

export default function TeamProfileModal({ isOpen, onClose, data }: TeamProfileModalProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      teamProfileTitle: data?.teamProfileTitle || '',
      isTeamActivate: true,
      teamKeywordNames: data?.teamKeywordNames || [],
    },
  })

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(data?.teamLogoImageUrl || null)
  const [inputValue, setInputValue] = useState('')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('이미지 크기는 최대 2MB까지 업로드할 수 있습니다.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue('profileImage', [file])
        setProfileImageUrl(URL.createObjectURL(file))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleAddKeyword = () => {
    if (inputValue.trim() !== '' && watch('teamKeywordNames').length < 3) {
      setValue('teamKeywordNames', [...watch('teamKeywordNames'), inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setValue(
      'teamKeywordNames',
      watch('teamKeywordNames').filter((item) => item !== keyword),
    )
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Submitted data:', data)
    // You can send the data to the server here
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033]" onClick={() => onClose()}>
      <div
        className="h-[45rem] max-h-[90vh] w-[30rem] overflow-y-auto rounded-[1.25rem] bg-[#fff] px-6 pt-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">팀 프로필 수정</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-[3.44rem]">
            {/* 제목 */}
            <div className="flex flex-col">
              <span className="font-semibold text-grey100">
                팀을 소개하는 프로필 제목을 입력해 주세요 <span className="font-sm text-[#FF345F]">*</span>
              </span>
              <input
                className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                {...register('teamProfileTitle')}
                placeholder="프로필 제목 (최대 20자)"
              />
            </div>

            {/* 키워드 */}
            <div className="flex flex-col">
              <span className="font-semibold text-grey100">
                팀을 소개하는 키워드를 3개 이내로 작성해주세요 <span className="font-sm text-[#FF345F]">*</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-4">
                {watch('teamKeywordNames').map((keyword, index) => (
                  <div
                    key={index}
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="flex cursor-pointer items-center rounded-lg border border-[#2563EB] bg-[#E0E7FF] px-3 py-1"
                  >
                    <span className="text-[#2563EB]">{keyword}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveKeyword(keyword)
                      }}
                      className="ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[#2563EB]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-[0.88rem] flex flex-col border-t border-grey40">
                <span className="py-[0.88rem] text-sm font-normal text-grey50">키워드를 하나씩 입력해주세요</span>
                <div className="flex w-[16.1rem] items-center gap-[0.63rem]">
                  <input
                    type="text"
                    className="flex-1 rounded border border-grey40 p-2"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Text Field"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="rounded bg-[#2563EB] px-4 py-2 text-sm text-[#fff]"
                    disabled={watch('teamKeywordNames').length >= 3}
                  >
                    추가
                  </button>
                </div>
                {watch('teamKeywordNames').length >= 3 && (
                  <span className="text-sm text-red-500">최대 3개의 항목만 추가할 수 있습니다.</span>
                )}
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
                    checked={watch('isTeamActivate') === true}
                    onChange={() => setValue('isTeamActivate', true)}
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
                    checked={watch('isTeamActivate') === false}
                    onChange={() => setValue('isTeamActivate', false)}
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
            <button type="button" onClick={onClose} className="rounded bg-grey30 px-6 py-2">
              취소
            </button>
            <button type="submit" className="rounded bg-[#2563EB] px-6 py-2 text-sm text-[#fff]">
              수정완료
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

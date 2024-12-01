'use client'

import { jobCategoriesData } from '@/shared/data/roleSelectData'
import { addressData } from '@/shared/data/addressSelectData'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Radio from '@/shared/ui/Radio/Radio'
import Select from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { fetchProfileData, updateProfile } from '../api/profileApi'
import { validateImageFile, createProfileFormData } from '../../lib/profileHelpers'
import { BasicProfileSkeleton } from './skeletons/BasicProfileSkeleton'

export default function ProfileEditBasic() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [isProfilePublic, setIsProfilePublic] = useState<boolean>(true)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string>('')
  const [name, setName] = useState('')
  const [profileImagePath, setProfileImagePath] = useState('')

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await fetchProfileData()
        setName(profileData.memberName)
        setSelectedCategory(profileData.profilePositionItem.majorPosition)
        setSelectedSubCategory(profileData.profilePositionItem.subPosition)
        setSelectedCity(profileData.cityName)
        setSelectedDistrict(profileData.divisionName)
        setSelectedStatuses(
          profileData.profileCurrentStateItems.profileCurrentStates.map(
            (state: { profileStateName: string }) => state.profileStateName,
          ),
        )
        setIsProfilePublic(profileData.isProfilePublic)
        setProfileImagePath(profileData.profileImagePath)
      } catch (error) {
        console.error('프로필 데이터 로딩 중 오류 발생:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfileData()
  }, [])

  if (isLoading) {
    return <BasicProfileSkeleton />
  }

  const options = [
    { label: '전체공개', value: 'true' },
    { label: '비공개', value: 'false' },
  ]

  // 포지션 대분류 옵션을 구성합니다.
  const mainPositionOptions = jobCategoriesData.map((category) => ({
    label: category.name,
    value: category.name,
  }))

  // 선택된 포지션 대분류에 따라 소분류 옵션을 구성합니다.
  const subPositionOptions =
    jobCategoriesData
      .find((category) => category.name === selectedCategory)
      ?.subCategory.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
      })) || []

  // 활동 지역 대분류 옵션을 구성합니다.
  const mainAreaOptions = addressData.map((city) => ({
    label: city.name,
    value: city.name,
  }))

  // 선택된 활동 지역 대분류에 따라 소분류 옵션을 구성합니다.
  const subAreaOptions =
    addressData
      .find((city) => city.name === selectedCity)
      ?.subArea.map((district) => ({
        label: district,
        value: district,
      })) || []

  const statusOptions = [
    '팀원 찾는 중',
    '팀 찾는 중',
    '대회 준비 중',
    '공모전 준비 중',
    '포폴 쌓는 중',
    '둘러보는 중',
    '프로젝트 진행 중',
    '아이디어 찾는 중',
    '투자 유치 중',
  ]

  const handleStatusClick = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleRemoveStatus = (status: string) => {
    setSelectedStatuses((prev) => prev.filter((s) => s !== status))
  }

  const handleProfileVisibilityChange = (value: string) => {
    setIsProfilePublic(value === 'true')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && validateImageFile(file)) {
      setProfileImage(file)
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageDelete = () => {
    setProfileImage(null)
    setProfileImagePreview('')
    // 기본 이미지로 돌아가기
    setProfileImagePath('/common/default_profile.svg')
  }

  const handleSubmit = async () => {
    try {
      const profileData = {
        majorPosition: selectedCategory,
        subPosition: selectedSubCategory,
        cityName: selectedCity,
        divisionName: selectedDistrict,
        profileStateNames: selectedStatuses,
        isProfilePublic: isProfilePublic,
      }

      const formData = createProfileFormData(profileImage, profileData)
      await updateProfile(formData) // profileId는 적절히 관리 필요
      alert('프로필이 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error)
      alert('프로필 수정 중 오류가 발생했습니다.')
    }
  }

  // 필수 데이터 유효성 검사
  const isFormValid = () => {
    return (
      name.trim() !== '' && // 이름
      selectedCategory !== '' && // 포지션 대분류
      selectedSubCategory !== '' && // 포지션 소분류
      selectedCity !== '' && // 활동지역 시/도
      selectedDistrict !== '' // 활동지역 시/군/구
    )
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        {/* 프로필 사진 */}
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span className="text-grey80">프로필 사진</span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>

          <div className="mt-3 flex gap-8">
            <Image
              src={profileImagePreview || profileImagePath || '/common/default_profile.svg'}
              width={150}
              height={150}
              alt="profile"
              className="h-[150px] w-[150px] rounded-[1.25rem] object-cover"
            />

            <div className="flex flex-col justify-end">
              <p className="text-xs text-grey50">*10MB 이하의 PNG, JPG, GIF, SVG 파일을 업로드 해주세요</p>
              <div className="flex items-end gap-4">
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/png,image/jpeg,image/gif,image/svg+xml"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  className="mt-2 rounded-xl"
                  animationMode="main"
                  mode="main"
                  onClick={() => document.getElementById('profileImageInput')?.click()}
                >
                  사진 업로드
                </Button>
                <p className="cursor-pointer text-xs text-grey50 underline" onClick={handleImageDelete}>
                  삭제하기
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            이름<p className="text-main">*</p>
          </span>
          <Input placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
          <span className="text-xs text-grey50">*이름은 계정 관리 - 계정 설정에서 변경할 수 있어요</span>
        </div>

        {/* 포지션 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            포지션 <p className="text-main">*</p>
          </span>

          <div className="flex w-full gap-[1.38rem]">
            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">대분류</span>
              <Select
                options={mainPositionOptions}
                value={selectedCategory}
                placeholder="대분류 선택"
                onChange={(value) => setSelectedCategory(value)}
              />
            </div>

            <div className="flex w-[48%] flex-col gap-2">
              <span className="text-sm text-grey70">소분류</span>
              <Select
                options={subPositionOptions}
                value={selectedSubCategory}
                placeholder={selectedCategory ? '소분류 선택' : '대분류를 먼저 선택해주세요'}
                onChange={(value) => setSelectedSubCategory(value)}
                disabled={!selectedCategory}
              />
            </div>
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

        <div className="flex flex-col gap-4">
          {/* 현재 상태 - 선택된 상태들 */}
          <div className="flex flex-col gap-3">
            <span className="flex text-grey80">현재 상태</span>

            <div className="flex flex-wrap gap-2">
              {selectedStatuses.map((status) => (
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

          {/* 현재 상태 - 옵션 선택 */}
          <div className="flex w-full flex-wrap gap-3 rounded-xl bg-grey10 px-6 py-7">
            {statusOptions.map((status) => (
              <span
                key={status}
                onClick={() => handleStatusClick(status)}
                className={`cursor-pointer rounded-lg border px-4 py-3 text-sm ${
                  selectedStatuses.includes(status)
                    ? 'border-main bg-[#EEF4FF] text-main'
                    : 'border-grey40 bg-[#FCFCFD] text-grey50'
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        {/* 프로필 공개 여부 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            프로필 공개 여부 <p className="text-main">*</p>
          </span>

          <Radio
            options={options}
            selectedValue={isProfilePublic.toString()}
            onChange={handleProfileVisibilityChange}
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
          disabled={!isFormValid()}
        >
          저장하기
        </Button>
      </div>
    </>
  )
}

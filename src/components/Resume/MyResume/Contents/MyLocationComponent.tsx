'use client'

import { accessTokenState } from '@/context/recoil-context'
import { PostProfileRegion } from '@/lib/action'
import { addressData } from '@/lib/addressSelectData'
import { LocationResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { Button } from '@/components/common/Button'
import Select from '@/components/common/component/Basic/Select'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface MyResumLocationFieldProps {
  data: LocationResponse
}

export default function MyLocationComponent({ data }: MyResumLocationFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = selectStyle
    document.head.append(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    if (data) {
      setSelectedCity(data.cityName)
      setSelectedDistrict(data.divisionName)
    }
  }, [data])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    if (accessToken) {
      const response = await PostProfileRegion(accessToken, selectedCity, selectedDistrict)

      if (response.ok) {
        pushNotification('활동 지역이 수정되었습니다.', 'success')
        setIsEditing(false)
      }
    }
  }

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    setSelectedDistrict('')
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
  }

  const getDistricts = () => {
    const city = addressData.find((c) => c.name === selectedCity)
    return city ? city.subArea : []
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-base font-semibold text-grey100 sm:text-lg">활동 지역</span>
      </div>

      {/* contents */}
      {isEditing ? (
        <div className="mt-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-grey100">시/도</label>
              <Select
                name="city"
                options={[
                  { value: '', label: 'select' },
                  ...addressData.map((city) => ({ value: city.name, label: city.name })),
                ]}
                selectedValue={selectedCity}
                onChange={(event) => handleCityChange(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-grey100">시/군/구</label>
              <Select
                name="district"
                options={[
                  { value: '', label: 'select' },
                  ...getDistricts().map((district) => ({ value: district, label: district })),
                ]}
                selectedValue={selectedDistrict}
                onChange={(event) => handleDistrictChange(event.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex gap-2 text-sm sm:text-base">
            <Image src="/assets/icons/location.svg" width={24} height={24} alt="location" />
            <div className="flex items-center">
              <div className="text-grey100">{selectedCity + ',' || '활동지역을 선택해주세요.'}</div>
            </div>
            <div className="flex items-center">
              <div className="text-grey100">{selectedDistrict || ''}</div>
            </div>
          </div>
        </div>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end gap-2">
        {isEditing && (
          <Button
            mode="sub"
            animationMode="sub"
            onClick={() => {
              setIsEditing(false)
            }}
          >
            취소하기
          </Button>
        )}

        <Button onClick={isEditing ? handleSaveClick : handleEditClick} mode="main" animationMode="main">
          {isEditing ? '수정완료' : '수정하기'}
        </Button>
      </div>
    </div>
  )
}

'use client'

import { accessTokenState } from '@/context/recoil-context'
import { PostProfileRegion } from '@/lib/action'
import { addressData } from '@/lib/addressSelectData'
import { LocationResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import Image from 'next/image'
import { ChangeEvent, useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { mainHoverEffect } from '@/lib/animations'

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

  const handleEditClick = async () => {
    if (accessToken) {
      const response = await PostProfileRegion(accessToken, selectedCity, selectedDistrict)

      if (response.ok) {
        setIsEditing(!isEditing)
      }
    }
  }

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value)
    setSelectedDistrict('')
  }

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value)
  }

  const getDistricts = () => {
    const city = addressData.find((c) => c.name === selectedCity)
    return city ? city.subArea : []
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">활동 지역/위치</span>
      </div>

      {/* contents */}
      {isEditing ? (
        <div className="mt-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <label className=" font-semibold text-grey100">시/도</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="select-with-padding-right rounded border border-grey40 p-3 font-medium text-grey60"
              >
                <option value="">시/도를 선택해주세요</option>
                {addressData.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className=" font-semibold text-grey100">시/군/구</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="select-with-padding-right rounded border border-grey40 p-3 font-medium text-grey60"
              >
                <option value="">시/군/구를 선택해주세요</option>
                {getDistricts().map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex gap-2">
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
      <div className="mt-[0.94rem] flex w-full justify-end">
        <motion.button
          {...mainHoverEffect}
          onClick={handleEditClick}
          className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]"
        >
          {isEditing ? '수정완료' : '수정하기'}
        </motion.button>
      </div>
    </div>
  )
}

'use client'

import { LocationResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MyResumLocationFieldProps {
  data: LocationResponse
}

export default function PrivateLocation({ data }: MyResumLocationFieldProps) {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

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

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">활동 지역/위치</span>
      </div>

      {/* contents */}

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
    </div>
  )
}

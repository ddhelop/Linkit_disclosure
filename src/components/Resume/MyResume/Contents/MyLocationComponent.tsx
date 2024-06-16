'use client'
import { addressData } from '@/lib/addressSelectData'
import { ChangeEvent, useState } from 'react'

export default function MyLocationComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const handleEditClick = () => {
    setIsEditing(!isEditing)
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
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-grey100">시/도</label>
              <select value={selectedCity} onChange={handleCityChange} className="rounded border p-2">
                <option value="">시/도를 선택해주세요</option>
                {addressData.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-grey100">시/군/구</label>
              <select value={selectedDistrict} onChange={handleDistrictChange} className="rounded border p-2">
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
          <div className="flex gap-4">
            <div className="flex flex-col">
              <div className="text-grey50">{selectedCity || '활동지역을 선택해주세요.'}</div>
            </div>
            <div className="flex flex-col">
              <div className="">{selectedDistrict || ''}</div>
            </div>
          </div>
        </div>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button onClick={handleEditClick} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
          {isEditing ? '수정완료' : '수정하기'}
        </button>
      </div>
    </div>
  )
}

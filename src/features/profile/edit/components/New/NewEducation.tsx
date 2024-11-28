'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState } from 'react'
import { UniversityInput } from '../UniversityInput/UniversityInput'
import { createEducation } from '../../api/educationApi'

export default function NewEducation() {
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [majorName, setMajorName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [description, setDescription] = useState('')

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('')
  }

  const handleSubmit = async () => {
    try {
      const educationData = {
        universityName: selectedUniversity,
        majorName,
        admissionYear: startDate,
        graduationYear: endDate,
        isAttendUniversity: isOngoing,
        educationDescription: description,
      }

      await createEducation(educationData)
      // 성공 처리 (예: 알림 표시, 페이지 이동 등)
    } catch (error) {
      // 에러 처리
      console.error('Failed to save education:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex text-grey80">
              학교명<span className="text-main">*</span>
            </span>
            <span className="text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <UniversityInput onUniversitySelect={setSelectedUniversity} selectedUniversity={selectedUniversity} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            전공<span className="text-main">*</span>
          </span>
          <Input
            placeholder="전공을 입력해 주세요"
            className="text-sm"
            value={majorName}
            onChange={(e) => setMajorName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            isOngoing={isOngoing}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onToggleOngoing={handleOngoingToggle}
            ongoingLabel="재학중"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">설명</span>
          <Textarea
            placeholder="설명을 입력해주세요."
            className="text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button mode="main" animationMode="main" className="rounded-xl font-semibold" onClick={handleSubmit}>
          저장하기
        </Button>
      </div>
    </>
  )
}

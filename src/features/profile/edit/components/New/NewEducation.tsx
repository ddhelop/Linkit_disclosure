'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState, useEffect } from 'react'
import { UniversityInput } from '../UniversityInput/UniversityInput'
import { createEducation, getEducationById, updateEducation } from '../../api/educationApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import CertificationForm from './CertificationForm'
import { useToast } from '@/shared/hooks/useToast'
import Image from 'next/image'
import { useProfileMenuStore } from '@/features/profile/store/useProfileMenuStore'

export default function NewEducation() {
  const toast = useToast()
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [majorName, setMajorName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [originalData, setOriginalData] = useState<any>(null)
  const { updateProfileMenu } = useProfileMenuStore()

  const [certificationData, setCertificationData] = useState({
    isActivityCertified: false,
    isActivityInProgress: false,
    isActivityVerified: false,
    activityCertificationAttachFilePath: null as string | null,
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const educationId = searchParams.get('id')

  // 데이터 조회
  useEffect(() => {
    const fetchEducationData = async () => {
      if (!educationId) return

      try {
        const response = await getEducationById(educationId)
        const data = response.result

        setSelectedUniversity(data.universityName || '')
        setMajorName(data.majorName || '')
        setStartDate(data.admissionYear || '')
        setEndDate(data.graduationYear || '')
        setIsOngoing(data.isAttendUniversity || false)
        setDescription(data.educationDescription || '')

        setOriginalData(data)

        setCertificationData({
          isActivityCertified: data.isActivityCertified || false,
          isActivityInProgress: data.isActivityInProgress || false,
          isActivityVerified: data.isActivityVerified || false,
          activityCertificationAttachFilePath: data.activityCertificationAttachFilePath || null,
        })
      } catch (error) {
        console.error('Failed to fetch education:', error)
        toast.alert('데이터를 불러오는데 실패했습니다.')
        router.back()
      }
    }

    fetchEducationData()
  }, [educationId, router, updateProfileMenu])

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('')
  }

  // 필수 필드 검증
  const isFormValid = () => {
    return selectedUniversity !== '' && majorName !== '' && startDate !== ''
  }

  // 변경사항 확인
  const hasChanges = () => {
    if (!originalData) return true // 새로운 교육정보 생성인 경우

    return (
      originalData.universityName !== selectedUniversity ||
      originalData.majorName !== majorName ||
      originalData.admissionYear !== startDate ||
      originalData.graduationYear !== endDate ||
      originalData.isAttendUniversity !== isOngoing ||
      originalData.educationDescription !== description
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const educationData = {
        universityName: selectedUniversity,
        majorName,
        admissionYear: startDate,
        graduationYear: endDate,
        isAttendUniversity: isOngoing,
        educationDescription: description,
      }

      if (educationId) {
        const response = await updateEducation(educationId, educationData)
        toast.success('학력이 성공적으로 수정되었습니다.')
        // 학력 데이터가 있으면 profileBooleanMenu 업데이트

        updateProfileMenu({ isProfileEducation: true })
      } else {
        const reponse = await createEducation(educationData)
        if (reponse.isSuccess) {
          toast.success('학력이 성공적으로 저장되었습니다.')
          updateProfileMenu({ isProfileEducation: true })
          router.push(`/profile/edit/education/new?id=${reponse.result.profileEducationId}`)
        } else {
          toast.alert('학력 저장 중 오류가 발생했습니다.')
        }
      }
    } catch (error) {
      console.error('Failed to save education:', error)
      toast.alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCertificationUpdate = (updatedData: Partial<typeof certificationData>) => {
    setCertificationData((prev) => ({
      ...prev,
      ...updatedData,
    }))
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

        <div className="flex w-full flex-col gap-3">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            isOngoing={isOngoing}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onToggleOngoing={handleOngoingToggle}
            ongoingLabel="재학 중"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">설명</span>
          <Textarea
            placeholder="설명을 입력해 주세요 (300자 이내)"
            className="text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          mode="main"
          animationMode="main"
          className="rounded-xl font-semibold"
          onClick={handleSubmit}
          disabled={!isFormValid() || !hasChanges() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>저장 중...</span>
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </div>

      <div className="mt-5">
        {educationId && <CertificationForm {...certificationData} onCertificationUpdate={handleCertificationUpdate} />}
      </div>
    </>
  )
}

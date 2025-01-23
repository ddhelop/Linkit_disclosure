'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState, useEffect } from 'react'
import CertificationForm from './CertificationForm'
import { useRouter, useSearchParams } from 'next/navigation'
import { getActivityById, saveActivity, updateActivity } from '../../api/profileActivityApi'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { useToast } from '@/shared/hooks/useToast'

export default function NewHistory() {
  const toast = useToast()
  const searchParams = useSearchParams()
  const activityId = searchParams.get('id') // URL 쿼리에서 id 가져오기
  const [activityName, setActivityName] = useState('')
  const [activityRole, setActivityRole] = useState('')
  const [activityDescription, setActivityDescription] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [originalData, setOriginalData] = useState({
    activityName: '',
    activityRole: '',
    activityDescription: '',
    isOngoing: false,
    startDate: '',
    endDate: '',
  })

  const router = useRouter()

  // CertificationForm의 상태 정의
  const [certificationData, setCertificationData] = useState({
    isActivityCertified: false,
    isActivityInProgress: false,
    isActivityVerified: false,
    activityCertificationAttachFilePath: null as string | null, // 타입 수정
  })

  useEffect(() => {
    if (activityId) {
      const fetchActivity = async () => {
        try {
          const activity = await getActivityById(activityId)
          const activityData = {
            activityName: activity.activityName,
            activityRole: activity.activityRole,
            activityDescription: activity.activityDescription,
            startDate: activity.activityStartDate,
            endDate: activity.activityEndDate || '',
            isOngoing: activity.isActivityInProgress,
          }

          // Set both current and original data
          setActivityName(activityData.activityName)
          setActivityRole(activityData.activityRole)
          setActivityDescription(activityData.activityDescription)
          setStartDate(activityData.startDate)
          setEndDate(activityData.endDate)
          setIsOngoing(activityData.isOngoing)
          setOriginalData(activityData)

          // 인증 관련 데이터도 설정
          setCertificationData({
            isActivityCertified: activity.isActivityCertified,
            isActivityInProgress: activity.isActivityInProgress,
            isActivityVerified: activity.isActivityVerified,
            activityCertificationAttachFilePath: activity.activityCertificationAttachFilePath,
          })
        } catch (error) {
          console.error('Failed to load activity:', error)
        }
      }
      fetchActivity()
    }
  }, [activityId])

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('') // "진행 중"을 선택할 때 종료 날짜 초기화
    setCertificationData((prev) => ({
      ...prev,
      isActivityInProgress: !prev.isActivityInProgress,
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    try {
      const activityData = {
        activityName,
        activityRole,
        activityStartDate: startDate,
        activityEndDate: isOngoing ? null : endDate,
        isActivityInProgress: isOngoing,
        activityDescription,
      }

      if (activityId) {
        const result = await updateActivity(activityId, activityData)
        toast.success('활동 이력이 성공적으로 저장되었습니다.')
        router.push(`/profile/edit/history/new?id=${result.result.profileActivityId}`)
      } else {
        const result = await saveActivity(activityData)
        toast.success('활동 이력이 성공적으로 저장되었습니다.')
        router.push(`/profile/edit/history/new?id=${result.result.profileActivityId}`)
      }
    } catch (error) {
      console.error('저장 중 에러 발생:', error)
      toast.alert('활동 이력 저장 중 오류가 발생했습니다.')
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

  const hasChanges = () => {
    return (
      originalData.activityName !== activityName ||
      originalData.activityRole !== activityRole ||
      originalData.activityDescription !== activityDescription ||
      originalData.startDate !== startDate ||
      originalData.endDate !== endDate ||
      originalData.isOngoing !== isOngoing
    )
  }

  const isFormValid = () => {
    if (!activityName.trim() || !activityRole.trim()) return false
    if (!startDate) return false
    if (!isOngoing && !endDate) return false
    return true
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 활동명 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              활동명<span className="text-main">*</span>
            </span>
            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="회사, 동아리, 학회 등 자유롭게 작성할 수 있어요"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>

        {/* 역할 */}
        <div className="flex flex-col gap-3">
          <span className="flex">
            역할<span className="text-main">*</span>
          </span>
          <Input
            placeholder="자신의 역할을 간단하게 작성해 주세요 (ex.기획, 디자이너 등 40자 이내)"
            value={activityRole}
            onChange={(e) => setActivityRole(e.target.value)}
          />
        </div>

        {/* 날짜 */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          isOngoing={isOngoing}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onToggleOngoing={handleOngoingToggle}
        />

        {/* 설명 */}
        <div className="flex flex-col gap-3">
          <span className="flex">설명</span>
          <Textarea
            placeholder="회사, 동아리, 학회 등에 대한 자세한 정보와 자신의 역할을 작성해 보세요"
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            className="min-h-[7.75rem]"
          />
        </div>
      </div>

      <div className="mb-10 mt-5 flex justify-end">
        <Button
          mode="main"
          animationMode="main"
          disabled={!isFormValid() || !hasChanges() || isSubmitting}
          className={`rounded-xl font-semibold ${
            !isFormValid() || !hasChanges() || isSubmitting ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleSave}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              저장 중...
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </div>

      {/* CertificationForm은 상태에 따라 렌더링 */}
      {activityId && <CertificationForm {...certificationData} onCertificationUpdate={handleCertificationUpdate} />}
    </>
  )
}

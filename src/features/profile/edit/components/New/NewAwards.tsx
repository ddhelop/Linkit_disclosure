'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState, useEffect } from 'react'
import { createAwards, getAwardById, updateAwards } from '../../api/awardsApi'
import { useRouter, useSearchParams } from 'next/navigation'
import DatePicker from '@/shared/ui/Select/DatePicker'
import CertificationForm from './CertificationForm'
import { useToast } from '@/shared/hooks/useToast'
import { useProfileMenuStore } from '@/features/profile/store/useProfileMenuStore'

export default function NewAwards() {
  const toast = useToast()
  const searchParams = useSearchParams()
  const awardId = searchParams.get('id')
  const [competitionName, setCompetitionName] = useState('')
  const [awardRank, setAwardRank] = useState('')
  const [awardDate, setAwardDate] = useState('')
  const [hostOrganization, setHostOrganization] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { updateProfileMenu } = useProfileMenuStore()
  const [certificationData, setCertificationData] = useState({
    isActivityCertified: false,
    isActivityVerified: false,
    activityCertificationAttachFilePath: null as string | null,
  })

  useEffect(() => {
    const fetchAwardDetails = async () => {
      if (!awardId) return

      try {
        const awardDetails = await getAwardById(awardId)
        setCompetitionName(awardDetails.awardsName)
        setAwardRank(awardDetails.awardsRanking)
        setAwardDate(awardDetails.awardsDate)
        setHostOrganization(awardDetails.awardsOrganizer)
        setDescription(awardDetails.awardsDescription)

        // 증명서 상태 설정
        setCertificationData({
          isActivityCertified: awardDetails.isAwardsCertified || false,
          isActivityVerified: awardDetails.isAwardsVerified || false,
          activityCertificationAttachFilePath: awardDetails.awardsCertificationAttachFilePath || null,
        })
      } catch (error) {
        console.error('Failed to fetch award details:', error)
        toast.alert('수상 이력을 불러오는데 실패했습니다.')
      }
    }

    fetchAwardDetails()
  }, [awardId])

  const handleSave = async () => {
    try {
      setIsSubmitting(true)

      const awardsData = {
        awardsName: competitionName,
        awardsRanking: awardRank,
        awardsDate: awardDate,
        awardsOrganizer: hostOrganization,
        awardsDescription: description,
      }

      if (awardId) {
        await updateAwards(awardId, awardsData)
        toast.success('수상 이력이 성공적으로 저장되었습니다.')
        router.push('/profile/edit/awards')
      } else {
        const response = await createAwards(awardsData)
        if (response.isSuccess) {
          updateProfileMenu({ isProfileAwards: true })
          router.push(`/profile/edit/awards/new?id=${response.result.profileAwardsId}`)
        }
      }
    } catch (error) {
      console.error('Failed to save awards:', error)
      toast.alert('수상 이력 저장에 실패했습니다.')
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
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 대회명 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              대회명<span className="text-main">*</span>
            </span>
            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="대회명을 입력해 주세요"
            value={competitionName}
            onChange={(e) => setCompetitionName(e.target.value)}
          />
        </div>

        <div className="flex w-full gap-[1.62rem]">
          {/* 훈격 */}
          <div className="flex w-[49%] flex-col gap-3">
            <span className="flex">
              훈격<span className="text-main">*</span>
            </span>
            <Input
              placeholder="상격을 입력해 주세요"
              value={awardRank}
              onChange={(e) => setAwardRank(e.target.value)}
            />
          </div>

          {/* 수상시기 */}
          <div className="flex w-[49%] flex-col gap-3">
            <DatePicker date={awardDate} onDateChange={setAwardDate} label="수상시기" required={true} />
          </div>
        </div>

        {/* 주최/주관 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              주최/주관<span className="text-main">*</span>
            </span>
          </div>
          <Input
            placeholder="주체기관을 입력해 주세요"
            value={hostOrganization}
            onChange={(e) => setHostOrganization(e.target.value)}
          />
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-3">
          <span className="flex">설명</span>

          <Textarea
            placeholder="설명을 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[7.75rem]"
          />
        </div>
      </div>

      <div className="mb-10 mt-5 flex justify-end">
        <Button
          mode="main"
          animationMode="main"
          className="rounded-xl font-semibold"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>

      {awardId && (
        <CertificationForm
          isActivityCertified={certificationData.isActivityCertified}
          isActivityVerified={certificationData.isActivityVerified}
          activityCertificationAttachFilePath={certificationData.activityCertificationAttachFilePath}
          onCertificationUpdate={handleCertificationUpdate}
        />
      )}
    </>
  )
}

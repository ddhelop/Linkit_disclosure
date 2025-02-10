'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { getLicense, License } from '@/features/profile/api/getLicense'
import { createLicense, updateLicense } from '@/features/profile/api/licenseApi'
import DatePicker from '@/shared/ui/Select/DatePicker'
import CertificationForm, { CertificationFormProps } from './CertificationForm'
import { useToast } from '@/shared/hooks/useToast'
import { useProfileMenuStore } from '@/features/profile/store/useProfileMenuStore'

type CertificationDataType = {
  isActivityCertified: boolean
  isActivityVerified: boolean
  activityCertificationAttachFilePath: string | null
}

// LicenseFormData 타입을 사용하도록 변경
type LicenseFormData = {
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  licenseDescription: string
}

export default function NewCertificate() {
  const toast = useToast()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { updateProfileMenu } = useProfileMenuStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    licenseName: '',
    licenseInstitution: '',
    licenseAcquisitionDate: '',
    licenseDescription: '',
  })

  const [certificationData, setCertificationData] = useState<CertificationDataType>({
    isActivityCertified: false,
    isActivityVerified: false,
    activityCertificationAttachFilePath: null,
  })

  const [originalData, setOriginalData] = useState<LicenseFormData | null>(null)

  useEffect(() => {
    const fetchLicense = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const data = await getLicense(id)
        const initialFormData = {
          licenseName: data.licenseName,
          licenseInstitution: data.licenseInstitution,
          licenseAcquisitionDate: data.licenseAcquisitionDate,
          licenseDescription: data.licenseDescription || '',
        }
        setFormData(initialFormData)
        setCertificationData({
          isActivityCertified: data.isLicenseCertified || false,
          isActivityVerified: data.isLicenseVerified || false,
          activityCertificationAttachFilePath: data.licenseCertificationAttachFilePath || null,
        })
        setOriginalData(data)
      } catch (error) {
        console.error('Failed to fetch license:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLicense()
  }, [id])

  // 데이터 변경 감지
  const hasChanges =
    originalData &&
    (formData.licenseName !== originalData.licenseName ||
      formData.licenseInstitution !== originalData.licenseInstitution ||
      formData.licenseAcquisitionDate !== originalData.licenseAcquisitionDate ||
      formData.licenseDescription !== (originalData.licenseDescription || ''))

  // 필수 입력값 검증
  const isFormValid =
    formData.licenseName.trim() && formData.licenseInstitution.trim() && formData.licenseAcquisitionDate.trim()

  // 버튼 활성화 조건
  const isButtonEnabled = id ? isFormValid && hasChanges : isFormValid

  const handleChange =
    (name: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }))
    }

  const handleCertificationUpdate = (updatedData: Partial<CertificationDataType>) => {
    setCertificationData((prev) => ({
      ...prev,
      ...updatedData,
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      if (id) {
        await updateLicense(id, formData)
        setOriginalData(formData) // 저장 성공 후 현재 데이터를 원본 데이터로 설정
        toast.success('자격증이 수정되었습니다.')
      } else {
        const response = await createLicense(formData)
        if (response.isSuccess) {
          toast.success('자격증이 저장되었습니다.')
          router.push(`/profile/edit/certifications/new?id=${response.result.profileLicenseId}`)
        }
      }
    } catch (error) {
      console.error('Failed to save certificate:', error)
      toast.alert('저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 자격증명 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              자격증명<span className="text-main">*</span>
            </span>
            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="자격증명을 입력해 주세요 (50자 이내)"
            value={formData.licenseName}
            onChange={handleChange('licenseName')}
          />
        </div>

        <div className="flex w-full gap-10">
          {/* 발급 기관 */}
          <div className="flex w-[49%] flex-col gap-3">
            <div className="flex justify-between">
              <span className="flex">
                발급 기관<span className="text-main">*</span>
              </span>
            </div>
            <Input
              placeholder="발급 기관을 입력해 주세요"
              value={formData.licenseInstitution}
              onChange={handleChange('licenseInstitution')}
            />
          </div>

          {/* 취득 날짜 */}
          <div className="flex w-[49%] flex-col gap-3">
            <DatePicker
              date={formData.licenseAcquisitionDate}
              onDateChange={(date) => setFormData({ ...formData, licenseAcquisitionDate: date })}
              label="취득 날짜"
              required={true}
            />
          </div>
        </div>

        {/* 설명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">설명</span>
          </div>
          <Textarea
            placeholder="설명을 입력해 주세요 (300자 이내)"
            className="min-h-32"
            value={formData.licenseDescription}
            onChange={handleChange('licenseDescription')}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5 flex justify-end">
        <Button mode="main" animationMode="main" disabled={!isButtonEnabled || isSubmitting} onClick={handleSave}>
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

      {id ? (
        <div className="mt-5">
          <CertificationForm
            isActivityCertified={certificationData.isActivityCertified}
            isActivityVerified={certificationData.isActivityVerified}
            activityCertificationAttachFilePath={certificationData.activityCertificationAttachFilePath}
            onCertificationUpdate={handleCertificationUpdate}
          />
        </div>
      ) : (
        <div className="mt-10 flex w-full flex-col gap-3 rounded-xl bg-white px-[2.88rem] py-10">
          <span className="text-grey80">인증</span>
          <div className="flex justify-center rounded-xl border border-grey30 bg-grey20 py-5 text-sm font-normal text-grey80">
            저장 후 인증서를 추가할 수 있어요
          </div>
        </div>
      )}
      {/* 인증서 폼 - 버튼 아래에 배치 */}
    </>
  )
}

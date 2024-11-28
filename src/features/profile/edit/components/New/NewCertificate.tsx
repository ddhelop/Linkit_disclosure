'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { formatYYYYMM, isValidYYYYMM } from '@/shared/lib/utils/dateFormat'
import { ChangeEvent, useState } from 'react'
import { createCertificate } from '@/features/profile/api/createCertificate'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

export default function NewCertificate() {
  const [licenseName, setLicenseName] = useState('')
  const [licenseInstitution, setLicenseInstitution] = useState('')
  const [acquiredDate, setAcquiredDate] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatYYYYMM(e.target.value)
    setAcquiredDate(formatted)
  }

  const handleSave = async () => {
    if (!licenseName || !licenseInstitution || !acquiredDate) {
      // 필수 필드 검증
      return
    }

    try {
      setIsSubmitting(true)
      await createCertificate({
        licenseName,
        licenseInstitution,
        licenseAcquisitionDate: acquiredDate,
        licenseDescription: description || undefined,
      })
      alert('자격증이 성공적으로 저장되었습니다.')
      router.back()
    } catch (error) {
      console.error('Certificate creation failed:', error)
      // 에러 처리
    } finally {
      setIsSubmitting(false)
    }
  }

  // 필수 입력값 검증
  const isFormValid = licenseName.trim() && licenseInstitution.trim() && isValidYYYYMM(acquiredDate)

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 자격명 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              자격명<span className="text-main">*</span>
            </span>
            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="자격증 이름과 급수(점수)를 자유롭게 기재해 주세요"
            value={licenseName}
            onChange={(e) => setLicenseName(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-10">
          {/* 관련부처 */}
          <div className="flex w-[49%] flex-col gap-3">
            <div className="flex justify-between ">
              <span className="flex">
                관련부처<span className="text-main">*</span>
              </span>
            </div>
            <Input
              placeholder="관련 기관을 입력해 주세요"
              value={licenseInstitution}
              onChange={(e) => setLicenseInstitution(e.target.value)}
            />
          </div>

          {/* 취득일 */}
          <div className="flex w-[49%] flex-col gap-3">
            <div className="flex justify-between">
              <span className="flex">
                취득일<span className="text-main">*</span>
              </span>
            </div>
            <Input placeholder="YYYY.MM" value={acquiredDate} onChange={handleDateChange} maxLength={7} />
          </div>
        </div>
        {/* 설명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">설명</span>
          </div>
          <Textarea
            placeholder="자격증 취득 경위를 자유롭게 기재해 주세요"
            className="min-h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5 flex justify-end">
        <Button mode="main2" animationMode="main" onClick={handleSave} disabled={!isFormValid || isSubmitting}>
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
    </>
  )
}

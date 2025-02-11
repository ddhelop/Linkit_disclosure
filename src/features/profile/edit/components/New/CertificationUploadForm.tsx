'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { requestCertification } from '../../api/certificationApi'
import { useToast } from '@/shared/hooks/useToast'

interface CertificationUploadFormProps {
  onClose: () => void
  onCertificationUpdate: (
    updatedData: Partial<{
      isEducationCertified: boolean
      isEducationInProgress: boolean
      isEducationVerified: boolean
      educationCertificationAttachFilePath: string | null
    }>,
  ) => void
  pathname: string
}

export default function CertificationUploadForm({
  onClose,
  onCertificationUpdate,
  pathname,
}: CertificationUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const activityId = searchParams.get('id')
  const toast = useToast()

  const getApiEndpoint = (id: string): string => {
    if (pathname.includes('/profile/edit/awards/new')) {
      return 'Awards'
    } else if (pathname.includes('/profile/edit/education/new')) {
      return 'Education'
    } else if (pathname.includes('/profile/edit/history/new')) {
      return 'Activity'
    } else if (pathname.includes('/profile/edit/certifications/new')) {
      return 'License'
    }
    throw new Error('지원하지 않는 URL 경로입니다.')
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024)
      const validFormats = ['application/pdf', 'image/jpeg', 'image/png']

      if (fileSizeInMB > 10) {
        toast.alert('파일 크기가 10MB를 초과합니다.')
        setSelectedFile(null)
        return
      }

      if (!validFormats.includes(file.type)) {
        toast.alert('PDF, JPEG, PNG 형식의 파일만 업로드 가능합니다.')
        setSelectedFile(null)
        return
      }

      setErrorMessage(null)
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !activityId) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const endpointType = getApiEndpoint(activityId)
      const response = await requestCertification(activityId, selectedFile, endpointType)

      onCertificationUpdate({
        [`is${endpointType}Certified`]: true,
        [`is${endpointType}Verified`]: false,
        [`${endpointType.toLowerCase()}CertificationAttachFilePath`]: response.result.filePath,
      })

      onClose()
      toast.success('인증서가 성공적으로 업로드되었습니다.')
    } catch (error) {
      console.error('Failed to upload certification:', error)
      toast.alert('인증서 업로드에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">인증서 파일 업로드</h2>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-5">
        <Image src="/common/icons/upload_file.svg" alt="upload" width={48} height={48} />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-lg bg-[#EDF3FF] px-8 py-2 text-xs text-black hover:bg-grey30"
        >
          파일 선택
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf, .jpeg, .jpg, .png"
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile && <span className="text-sm text-grey70">선택된 파일: {selectedFile.name}</span>}
        {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
        <span className="pt-2 text-xs font-normal text-grey50">*10MB 이하의 PDF, JPEG, PNG 파일을 업로드 해주세요</span>
      </div>
      <div className="flex w-full gap-[0.6rem]">
        <button
          onClick={onClose}
          className="w-[49%] rounded-lg bg-gray-100 px-4 py-[0.88rem] text-gray-500 hover:bg-gray-200"
        >
          인증 안 함
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isSubmitting}
          className={`w-[49%] rounded-lg px-4 py-[0.88rem] text-white ${
            !selectedFile || isSubmitting ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? '요청 중...' : '인증 요청'}
        </button>
      </div>
    </div>
  )
}

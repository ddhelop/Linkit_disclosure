'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { requestCertification } from '../../api/certificationApi'

interface CertificationUploadFormProps {
  onClose: () => void
  onCertificationUpdate: (updatedData: { isActivityCertified: boolean; isActivityInProgress: boolean }) => void
}

export default function CertificationUploadForm({ onClose, onCertificationUpdate }: CertificationUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // 요청 상태 관리
  const searchParams = useSearchParams()
  const activityId = searchParams.get('id') // URL에서 id 가져오기

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024) // 파일 크기 MB 단위 변환
      const validFormats = ['application/pdf', 'image/jpeg', 'image/png'] // 허용된 파일 포맷

      if (fileSizeInMB > 10) {
        setErrorMessage('파일 크기가 10MB를 초과합니다.')
        setSelectedFile(null)
        return
      }

      if (!validFormats.includes(file.type)) {
        setErrorMessage('PDF, JPEG, PNG 형식의 파일만 업로드 가능합니다.')
        setSelectedFile(null)
        return
      }

      setErrorMessage(null) // 에러 초기화
      setSelectedFile(file) // 파일 설정
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile || !activityId) {
      setErrorMessage('파일을 업로드 해주세요.')
      return
    }

    setIsSubmitting(true) // 요청 시작 상태
    try {
      await requestCertification(activityId, selectedFile)
      alert('인증 요청이 성공적으로 완료되었습니다.')

      // 부모 상태 업데이트
      onCertificationUpdate({
        isActivityCertified: true,
        isActivityInProgress: true,
      })

      onClose()
    } catch (error) {
      console.error('요청 중 에러 발생:', error)
      alert('인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false) // 요청 완료 상태
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
          disabled={!selectedFile || isSubmitting} // 파일이 없거나 요청 중일 때 비활성화
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

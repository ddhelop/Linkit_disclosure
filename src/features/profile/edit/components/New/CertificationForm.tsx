'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Modal from '../../../../../shared/ui/Modal/Modal'
import CertificationUploadForm from './CertificationUploadForm'
import Link from 'next/link'
import { deleteCertification } from '../../api/certificationApi'

interface CertificationFormProps {
  isActivityCertified: boolean
  isActivityInProgress: boolean
  isActivityVerified: boolean
  activityCertificationAttachFilePath: string | null
  onCertificationUpdate: (updatedData: Partial<CertificationFormProps>) => void
}

export default function CertificationForm({
  isActivityCertified,
  isActivityInProgress,
  isActivityVerified,
  activityCertificationAttachFilePath,
  onCertificationUpdate,
}: CertificationFormProps) {
  const searchParams = useSearchParams()
  const activityId = searchParams.get('id')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleDelete = async () => {
    if (!activityId) {
      alert('활동 ID가 유효하지 않습니다.')
      return
    }

    if (!confirm('인증서를 삭제하시겠습니까?')) return

    try {
      await deleteCertification(activityId)
      alert('인증서가 성공적으로 삭제되었습니다.')
      onCertificationUpdate({
        isActivityCertified: false,
        activityCertificationAttachFilePath: null,
      })
    } catch (error) {
      console.error('인증서 삭제 중 오류 발생:', error)
      alert('인증서 삭제 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const renderCertificationUI = () => {
    if (isActivityCertified && isActivityVerified) {
      return (
        <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-grey30 bg-[#EDF3FF] py-5">
          <div className="flex items-center gap-2">
            <Image src="/common/cert_badge.svg" width={20} height={20} alt="success" />
            <span className="text-sm font-semibold text-grey70">인증 완료</span>
          </div>
          <div className="flex gap-2 text-xs">
            {activityCertificationAttachFilePath && (
              <Link
                href={activityCertificationAttachFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-grey50 underline"
              >
                인증서 보기
              </Link>
            )}
            <span className="cursor-pointer text-red-500 underline" onClick={handleDelete}>
              삭제하기
            </span>
          </div>
        </div>
      )
    }

    if (!isActivityVerified && isActivityCertified) {
      return (
        <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-grey30 bg-[#EDF3FF] py-5">
          <div className="flex items-center gap-2">
            <Image src="/common/icons/loading.svg" width={20} height={20} alt="in-progress" />
            <span className="text-sm font-semibold text-grey70">인증 진행 중</span>
          </div>
          <div className="flex gap-2 text-xs">
            {activityCertificationAttachFilePath && (
              <Link
                href={activityCertificationAttachFilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-grey50 underline"
              >
                인증서 보기
              </Link>
            )}
            <span className="cursor-pointer text-red-500 underline" onClick={handleDelete}>
              삭제하기
            </span>
          </div>
        </div>
      )
    }

    return (
      <div
        className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-grey30 bg-grey20 py-5"
        onClick={handleModalToggle}
      >
        <div className="flex gap-2">
          <Image src="/common/icons/black_plus.svg" width={13} height={13} alt="plus" />
          <span className="text-sm font-semibold text-grey70">인증서 추가하기</span>
        </div>
        <span className="text-xs font-normal text-grey50">*10MB 이하의 PDF, JPEG, PNG 파일을 업로드 해주세요</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white p-10">
      <span>인증</span>
      {renderCertificationUI()}
      <div className="mt-3 rounded-xl bg-[#EDF3FF] px-6 py-[1.12rem] text-xs leading-5">
        • 자신의 활동을 증명할 수 있는 인증서, 사진 등을 첨부해 주세요
        <br />• 인증서 업로드 후 인증은 1~3일 정도 소요됩니다
        <br />
        <p className="flex">
          • 인증서를 등록하고 인증을 마치면 이력 목록에서{' '}
          <Image src={'/common/cert_badge.svg'} width={22} height={22} alt="cert_badge" className="px-1" /> 인증마크를
          확인할 수 있어요
        </p>
        <p className="flex">
          • 문제가 발생하면 <p className="pl-1 text-main">채널톡</p>으로 문의해 주세요
        </p>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <CertificationUploadForm
          onClose={handleModalToggle}
          onCertificationUpdate={onCertificationUpdate} // 이 부분 추가
        />
      </Modal>
    </div>
  )
}

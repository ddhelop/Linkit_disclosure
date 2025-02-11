'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Modal from '../../../../../shared/ui/Modal/Modal'
import CertificationUploadForm from './CertificationUploadForm'
import Link from 'next/link'
import { deleteCertification } from '../../api/certificationApi'
import { useToast } from '@/shared/hooks/useToast'

interface BaseCertificationFormProps {
  onCertificationUpdate: (updatedData: any) => void
  certificationType: 'education' | 'awards' | 'license' | 'activity'
  itemId?: string | null
  onDelete?: () => void
}

interface EducationCertificationProps extends BaseCertificationFormProps {
  certificationType: 'education'
  isEducationCertified: boolean
  isEducationInProgress: boolean
  isEducationVerified: boolean
  educationCertificationAttachFilePath: string | null
}

interface AwardsCertificationProps extends BaseCertificationFormProps {
  certificationType: 'awards'
  isAwardsCertified: boolean
  isAwardsVerified: boolean
  awardsCertificationAttachFilePath: string | null
}

interface LicenseCertificationProps extends BaseCertificationFormProps {
  certificationType: 'license'
  isLicenseCertified: boolean
  isLicenseVerified: boolean
  licenseCertificationAttachFilePath: string | null
}

interface ActivityCertificationProps extends BaseCertificationFormProps {
  certificationType: 'activity'
  isActivityCertified: boolean
  isActivityVerified: boolean
  activityCertificationAttachFilePath: string | null
}

type CertificationFormProps =
  | EducationCertificationProps
  | AwardsCertificationProps
  | LicenseCertificationProps
  | ActivityCertificationProps

export default function CertificationForm(props: CertificationFormProps) {
  const toast = useToast()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const activityId = searchParams.get('id')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleDelete = async () => {
    if (!props.itemId) {
      toast.alert('ID가 유효하지 않습니다.')
      return
    }

    if (!confirm('인증서를 삭제하시겠습니까?')) return

    try {
      await deleteCertification(props.itemId, props.certificationType)
      toast.success('인증서가 성공적으로 삭제되었습니다.')
      props.onCertificationUpdate({
        [`is${props.certificationType.charAt(0).toUpperCase() + props.certificationType.slice(1)}Certified`]: false,
        [`${props.certificationType}CertificationAttachFilePath`]: null,
      })
      props.onDelete?.()
    } catch (error) {
      console.error('인증서 삭제 중 오류 발생:', error)
      toast.alert('인증서 삭제 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const renderCertificationUI = () => {
    const isCertified =
      (props.certificationType === 'education' && props.isEducationCertified) ||
      (props.certificationType === 'awards' && props.isAwardsCertified) ||
      (props.certificationType === 'license' && props.isLicenseCertified) ||
      (props.certificationType === 'activity' && props.isActivityCertified)

    const isVerified =
      (props.certificationType === 'education' && props.isEducationVerified) ||
      (props.certificationType === 'awards' && props.isAwardsVerified) ||
      (props.certificationType === 'license' && props.isLicenseVerified) ||
      (props.certificationType === 'activity' && props.isActivityVerified)

    const certificationPath =
      props.certificationType === 'education'
        ? props.educationCertificationAttachFilePath
        : props.certificationType === 'awards'
          ? props.awardsCertificationAttachFilePath
          : props.certificationType === 'license'
            ? props.licenseCertificationAttachFilePath
            : props.certificationType === 'activity'
              ? props.activityCertificationAttachFilePath
              : null

    if (isCertified) {
      if (isVerified) {
        return (
          <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-grey30 bg-[#EDF3FF] py-5">
            <div className="flex items-center gap-2">
              ㅇ
              <Image src="/common/cert_badge.svg" width={20} height={20} alt="success" />
              <span className="text-sm font-semibold text-grey70">인증 완료</span>
            </div>
            <div className="flex gap-2 text-xs">
              {certificationPath && (
                <Link
                  href={certificationPath}
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
      } else {
        return (
          <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl border border-grey30 bg-[#EDF3FF] py-5">
            <div className="flex items-center gap-2">
              <Image src="/common/icons/loading.svg" width={20} height={20} alt="pending" />
              <span className="text-sm font-semibold text-grey70">인증 대기중</span>
            </div>
            <div className="flex gap-2 text-xs">
              {certificationPath && (
                <Link
                  href={certificationPath}
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
          • 인증서를 등록하고 인증을 마치면 목록에서{' '}
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
          onCertificationUpdate={props.onCertificationUpdate}
          pathname={pathname}
        />
      </Modal>
    </div>
  )
}

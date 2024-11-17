import Image from 'next/image'
import { useState } from 'react'

import Modal from '../../../../../shared/ui/Modal/Modal'
import CertificationUploadForm from './CertificationUploadForm'

export default function CertificationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev)
  }

  return (
    <div className="flex flex-col rounded-xl bg-white p-10">
      <span>인증</span>

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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <CertificationUploadForm onClose={handleModalToggle} />
      </Modal>
    </div>
  )
}

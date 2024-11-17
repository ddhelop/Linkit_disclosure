import Image from 'next/image'

export default function CertificationUploadForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">인증서 파일 업로드</h2>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-5">
        <Image src="/common/icons/upload_file.svg" alt="upload" width={48} height={48} />
        <button className="rounded-lg bg-[#EDF3FF] px-8 py-2 text-xs text-black hover:bg-grey30">파일 선택</button>
        <span className="pt-2 text-xs font-normal text-grey50">*10MB 이하의 PDF, JPEG, PNG 파일을 업로드 해주세요</span>
      </div>
      <div className="flex w-full gap-[0.6rem]">
        <button
          onClick={onClose}
          className="w-[49%] rounded-lg bg-gray-100 px-4 py-[0.88rem] text-gray-500 hover:bg-gray-200"
        >
          인증 안 함
        </button>
        <button className="w-[49%] rounded-lg bg-blue-500 px-4 py-[0.88rem] text-white hover:bg-blue-600">
          인증 요청
        </button>
      </div>
    </div>
  )
}

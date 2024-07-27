import { Button } from '@/components/common/Button'
import Image from 'next/image'
import React, { useState } from 'react'

export default function MyAttachFile() {
  const [isEditing, setIsEditing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [attachments, setAttachments] = useState<{ links: { name: string; url: string }[]; file: File | null }>({
    links: [],
    file: null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0]
      setFile(newFile)
      setAttachments({ ...attachments, file: newFile })
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">첨부 파일</span>
      </div>

      {/* contents */}
      {!isEditing ? (
        <>
          <div className="mt-[0.94rem] flex w-full justify-end">
            <Button onClick={() => setIsEditing(true)} animationMode="main">
              추가하기
            </Button>
          </div>
        </>
      ) : (
        <form className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="mt-4 flex flex-col">
              <label className="text-sm font-normal text-grey60">파일</label>
              <label className="mt-2 flex w-full cursor-pointer items-center justify-start gap-3 rounded-[0.44rem] bg-grey20 px-[1.21rem] py-[1.12rem]">
                <input type="file" onChange={handleFileChange} className="hidden" />
                <Image src={'/assets/icons/share.svg'} alt="plus" width={17} height={17} />
                <p className="pt-[0.1rem] text-grey60">파일 첨부하기</p>
              </label>
              {file && (
                <div className="mt-2 flex items-center justify-between rounded border border-grey30 p-2">
                  <span>
                    {file.name} {Math.round(file.size / 1024)}KB
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null)
                      setAttachments({ ...attachments, file: null })
                    }}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* buttons */}
          <div className="mt-[0.94rem] flex w-full justify-end gap-2">
            <Button mode="sub" animationMode="sub" type="button" onClick={() => setIsEditing(false)}>
              취소하기
            </Button>
            <Button onClick={() => setIsEditing(false)} animationMode="main">
              저장하기
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

import Image from 'next/image'
import React, { useState } from 'react'

export default function MyAttachFile() {
  const [isEditing, setIsEditing] = useState(false)
  const [links, setLinks] = useState<{ name: string; url: string }[]>([])
  const [editingLinks, setEditingLinks] = useState<{ name: string; url: string }[]>([{ name: '', url: '' }])
  const [file, setFile] = useState<File | null>(null)
  const [attachments, setAttachments] = useState<{ links: { name: string; url: string }[]; file: File | null }>({
    links: [],
    file: null,
  })

  const handleAddLink = () => {
    setEditingLinks([...editingLinks, { name: '', url: '' }])
  }

  const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
    const newEditingLinks = [...editingLinks]
    newEditingLinks[index][field] = value
    setEditingLinks(newEditingLinks)
  }

  const handleConfirmLink = (index: number) => {
    const link = editingLinks[index]
    if (link.name && link.url) {
      const newLinks = [...links, link]
      setLinks(newLinks)
      setAttachments({ ...attachments, links: newLinks })
      const newEditingLinks = editingLinks.filter((_, i) => i !== index)
      setEditingLinks(newEditingLinks)
    }
  }

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    setLinks(newLinks)
    setAttachments({ ...attachments, links: newLinks })
  }

  const handleRemoveEditingLink = (index: number) => {
    const newEditingLinks = editingLinks.filter((_, i) => i !== index)
    setEditingLinks(newEditingLinks)
  }

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
        <span className="text-lg font-semibold text-grey100">첨부</span>
      </div>

      {/* contents */}
      {!isEditing ? (
        <>
          <div className="mt-[0.94rem] flex w-full justify-end">
            <button onClick={() => setIsEditing(true)} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
              추가하기
            </button>
          </div>
        </>
      ) : (
        <form className="mt-4">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-grey60">웹 링크명</p>

            {attachments.links.length === 0 ? (
              <div className="pt-[0.94rem] text-grey50">첨부 링크가 없습니다.</div>
            ) : (
              <div className="mt-4">
                {attachments.links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Image src="/assets/icons/link.svg" alt="link" width={20} height={20} />
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {link.name}
                      </a>
                    </div>
                    <button type="button" onClick={() => handleRemoveLink(index)} className="text-red-500">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {editingLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="웹 링크명"
                  value={link.name}
                  onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                  className="w-[35%] rounded border border-grey30 px-[0.88rem] py-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="http://..."
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="w-[55%] rounded border border-grey30 px-[0.88rem] py-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleConfirmLink(index)}
                  className="rounded-md bg-[#2563EB] px-3 py-2 text-[#fff]"
                >
                  O
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveEditingLink(index)}
                  className="rounded-md bg-grey30 px-3 py-2 text-[#fff]"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLink}
              className="mt-2 flex w-full items-center justify-start gap-3 rounded-[0.44rem] bg-grey20 px-[1.21rem] py-[1.12rem]"
            >
              <Image src={'/assets/icons/plus.svg'} alt="plus" width={13} height={13} />
              <p className="pt-[0.1rem] text-grey60">링크 추가하기</p>
            </button>
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
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 h-10 rounded px-4 text-sm text-[#fff]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]"
            >
              저장하기
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

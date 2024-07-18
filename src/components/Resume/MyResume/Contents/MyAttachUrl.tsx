import { accessTokenState } from '@/context/recoil-context'
import { PostProfileAttchURL } from '@/lib/action'
import { AttachResponse, AttachUrlResponse, URLFormInputs } from '@/lib/types'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumURLProps {
  data: AttachUrlResponse[]
}

export default function MyAttachUrl({ data }: MyResumURLProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [links, setLinks] = useState<{ name: string; url: string }[]>([])
  const [editingLinks, setEditingLinks] = useState<{ name: string; url: string }[]>([{ name: '', url: '' }])
  const [attachments, setAttachments] = useState<{ links: { name: string; url: string }[]; file: File | null }>({
    links: [],
    file: null,
  })
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    if (data && data.length > 0) {
      const initialLinks = data.map((item) => ({
        name: item.attachUrlName,
        url: item.attachUrl,
      }))
      setLinks(initialLinks)
      setAttachments((prev) => ({ ...prev, links: initialLinks }))
    }
  }, [data])

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

  const handleRemoveEditingLink = (index: number) => {
    const newEditingLinks = editingLinks.filter((_, i) => i !== index)
    setEditingLinks(newEditingLinks)
  }

  const handleLinkSubmit = async () => {
    const formattedLinks: URLFormInputs[] = links.map((link) => ({
      attachUrlName: link.name,
      attachUrlPath: link.url,
    }))
    const response = await PostProfileAttchURL(accessToken, formattedLinks)
    alert('저장되었습니다.')
    setIsEditing(false)
  }

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    setLinks(newLinks)
    setAttachments({ ...attachments, links: newLinks })
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">첨부 URL</span>
      </div>

      {/* contents */}
      {!isEditing ? (
        <>
          {attachments.links.length === 0 ? (
            <div className="pt-[0.94rem] text-grey50">첨부 링크가 없습니다.</div>
          ) : (
            <div className="mt-4">
              <p className="pb-4 text-grey60">웹 링크</p>
              {attachments.links.map((link, index) => (
                <div key={index} className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-grey80">
                    <Image src="/assets/icons/link.svg" alt="link" width={20} height={20} />
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {link.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-[0.94rem] flex w-full justify-end">
            <button onClick={() => setIsEditing(true)} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
              추가하기
            </button>
          </div>
        </>
      ) : (
        <form className="mt-4">
          <div className="flex flex-col gap-4">
            {attachments.links.length === 0 ? (
              <div className="pt-1 text-grey50">첨부 링크가 없습니다.</div>
            ) : (
              <div className="mt-4">
                {attachments.links.map((link, index) => (
                  <div key={index} className="mb-4 flex items-center justify-between gap-3">
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

                <Image
                  onClick={() => handleConfirmLink(index)}
                  src={'/assets/images/plusbtn.svg'}
                  alt="check"
                  width={43}
                  height={43}
                  className="cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveEditingLink(index)}
                  className="h-[43px] w-[43px] rounded-md bg-grey30 text-[#fff]"
                >
                  -
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
          </div>

          {/* buttons */}
          <div className="mt-[0.94rem] flex w-full justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="h-10 rounded bg-grey50 px-4 text-sm text-[#fff]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleLinkSubmit}
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

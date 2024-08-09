'use client'
import { TeamAttachUrlResponse } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MyResumURLProps {
  data: TeamAttachUrlResponse[]
}

export default function TeamAttachUrl({ data }: MyResumURLProps) {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([])
  const [attachments, setAttachments] = useState<{ links: { name: string; url: string }[]; file: File | null }>({
    links: [],
    file: null,
  })

  useEffect(() => {
    if (data && data?.length > 0) {
      const initialLinks = data.map((item) => ({
        name: item.teamAttachUrlName,
        url: item.teamAttachUrlPath,
      }))
      setLinks(initialLinks)
      setAttachments((prev) => ({ ...prev, links: initialLinks }))
    }
  }, [data])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">첨부 URL</span>
      </div>

      {/* contents */}

      <>
        {attachments.links.length === 0 ? (
          <div className="pt-[0.94rem] text-sm text-grey50">첨부 링크가 없습니다.</div>
        ) : (
          <div className="mt-4">
            <p className="pb-4 text-grey60">웹 링크</p>
            {attachments.links.map((link, index) => (
              <div key={index} className="mb-4 flex items-center justify-between gap-3 text-sm sm:text-base">
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
      </>
    </div>
  )
}

import { AttachUrlResponse } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface MyResumURLProps {
  data: AttachUrlResponse[]
}

export default function PrivateAttachUrl({ data }: MyResumURLProps) {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([])

  const [attachments, setAttachments] = useState<{ links: { name: string; url: string }[]; file: File | null }>({
    links: [],
    file: null,
  })

  useEffect(() => {
    if (data && data.length > 0) {
      const initialLinks = data.map((item) => ({
        name: item.attachUrlName,
        url: item.attachUrlPath,
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

      <form className="">
        <div className="flex flex-col gap-4">
          {attachments.links.length === 0 ? (
            <div className="pt-3 text-sm text-grey50 sm:text-base">첨부 링크가 없습니다.</div>
          ) : (
            <div className="mt-4">
              {attachments.links.map((link, index) => (
                <div key={index} className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image src="/assets/icons/link.svg" alt="link" width={20} height={20} />
                    <Link
                      target="_blank"
                      href={link.url}
                      rel="noopener noreferrer"
                      className="text-sm text-main underline sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

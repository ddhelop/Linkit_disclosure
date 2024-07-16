'use client'

import { HistoryResponse } from '@/lib/types'
import { useState } from 'react'

interface TeamHistoryProps {
  data: HistoryResponse[]
}

export default function TeamResumeHistory({ data: initialData }: TeamHistoryProps) {
  const [data, setData] = useState<HistoryResponse[]>(initialData)

  return (
    <>
      <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
        {/* Title */}
        <p className="text-lg font-semibold">연혁</p>

        {!data && <div className=" text-grey50">연혁이 없습니다.</div>}
        <div className="flex flex-col gap-4">
          {data?.map((history, index) => (
            <div key={index} className="rounded-[0.63rem] border border-grey30 px-[1.31rem] py-[1.38rem]">
              <div className="flex justify-between">
                <div className="flex gap-[1.62rem]">
                  <p className="text-grey60">{history?.startYear}</p>
                  <div className="flex flex-col gap-1">
                    <p>{history?.historyOneLineIntroduction}</p>
                    <p className="text-sm text-grey60">{history?.historyIntroduction}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

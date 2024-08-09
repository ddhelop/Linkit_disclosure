'use client'

import { AwardFormInputs, AwardResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import { useEffect, useState } from 'react'

interface MyResumAwardProps {
  data: AwardResponse[]
}

export default function PrivateAward({ data }: MyResumAwardProps) {
  const [awards, setAwards] = useState<AwardFormInputs[]>([])

  // select style
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = selectStyle
    document.head.append(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // 초기 데이터 설정
  useEffect(() => {
    if (data && data.length > 0) {
      setAwards(data)
    }
  }, [data])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-base font-semibold text-grey100 sm:text-lg">수상</span>
      </div>

      {/* contents */}
      {awards.length === 0 && <div className="pt-3 text-grey50">수상 내역이 없습니다.</div>}

      {awards.length > 0 && (
        <div className="mt-3 flex flex-col">
          {awards.map((award, index) => (
            <div key={index} className=" flex gap-[1.62rem] rounded-[0.63rem] border border-grey30 p-5">
              <div className="text-sm text-grey60 sm:text-base">{award.awardsYear}</div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-grey60">{award.organizer}</span>
                  <span className="text-sm text-grey100 sm:text-base">
                    {award.awardsName},{award.ranking}
                  </span>
                  <span className="text-xs text-grey60 sm:text-sm">{award.awardsDescription}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

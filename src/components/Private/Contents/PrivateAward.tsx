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
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">수상</span>
      </div>

      {/* contents */}
      {awards.length === 0 && <div className="pt-[0.94rem] text-grey50">수상이력이 없습니다.</div>}

      {awards.length > 0 && (
        <div className="mt-6 flex flex-col">
          {awards.map((award, index) => (
            <div key={index} className="mt-4 flex gap-[1.62rem] rounded-[0.63rem] border border-grey30 p-6">
              <div className="text-grey60">{award.awardsYear}</div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-grey60">{award.organizer}</span>
                  <span className="text-grey100">
                    {award.awardsName},{award.ranking}
                  </span>
                  <span className="text-sm text-grey60">{award.awardsDescription}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SORT_OPTIONS = {
  LATEST: '최신순',
  POPULAR: '인기순',
  DEADLINE: '마감순',
} as const

type SortKey = keyof typeof SORT_OPTIONS

export default function SortToggleButtons() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState<SortKey>('LATEST')

  // URL 쿼리 기반으로 초기 상태 설정
  useEffect(() => {
    const sortBy = searchParams.get('sortBy') as SortKey | null
    if (sortBy && SORT_OPTIONS[sortBy]) {
      setSelected(sortBy)
    }
  }, [searchParams])

  const handleClick = (key: SortKey) => {
    if (key === selected) return

    const params = new URLSearchParams(searchParams)
    params.set('sortBy', key)
    router.push(`${pathname}?${params.toString()}`)
    setSelected(key)
  }

  return (
    <div className="flex gap-2">
      {(Object.entries(SORT_OPTIONS) as [SortKey, string][]).map(([key, label]) => (
        <button
          key={key}
          onClick={() => handleClick(key)}
          className={`rounded-full  border  px-3 py-1 text-sm ${
            selected === key ? ' bg-[#D3E1FE] text-grey80' : 'border-grey30 bg-white text-grey60'
          } transition`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function OutBoxMatchFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleFilterClick = (type: string) => {
    // 현재 searchParams를 URLSearchParams 객체로 변환
    const params = new URLSearchParams(searchParams.toString())

    // 기존 page와 size 파라미터 유지
    const currentPage = params.get('page') || '0'
    const currentSize = params.get('size') || '20'

    // 파라미터 설정
    params.set('page', currentPage)
    params.set('size', currentSize)

    if (type === '전체') {
      params.delete('senderType')
    } else {
      const senderType = type === '팀원' ? 'PROFILE' : 'TEAM'
      params.set('senderType', senderType)
    }

    // URL 업데이트
    router.push(`${pathname}?${params.toString()}`)
  }

  const getActiveClass = (type: string) => {
    const currentType = searchParams.get('senderType')
    const isActive =
      (type === '전체' && !currentType) ||
      (type === '팀원' && currentType === 'PROFILE') ||
      (type === '팀' && currentType === 'TEAM')

    return isActive
      ? 'cursor-pointer rounded-full bg-[#4D82F3] text-white border border-primary px-6 py-2 text-sm font-normal text-primary'
      : 'cursor-pointer rounded-full border border-grey40 px-6 py-2 text-sm font-normal text-grey50'
  }

  return (
    <div className="flex gap-3">
      {['전체', '팀원', '팀'].map((item) => (
        <div key={item} className={getActiveClass(item)} onClick={() => handleFilterClick(item)}>
          {item}
        </div>
      ))}
    </div>
  )
}

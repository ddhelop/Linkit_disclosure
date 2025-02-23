'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function MatchFilter() {
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
      params.delete('receiverType')
    } else {
      const receiverType = type === '내 프로필' ? 'PROFILE' : type === '나의 팀' ? 'TEAM' : 'ANNOUNCEMENT'
      params.set('receiverType', receiverType)
    }

    // URL 업데이트
    router.push(`${pathname}?${params.toString()}`)
  }

  const getActiveClass = (type: string) => {
    const currentType = searchParams.get('receiverType')
    const isActive =
      (type === '전체' && !currentType) ||
      (type === '내 프로필' && currentType === 'PROFILE') ||
      (type === '나의 팀' && currentType === 'TEAM') ||
      (type === '모집 공고' && currentType === 'ANNOUNCEMENT')

    return isActive
      ? 'cursor-pointer rounded-full bg-[#4D82F3] text-white border border-primary px-6 py-2 text-sm font-normal text-primary'
      : 'cursor-pointer rounded-full border border-grey40 px-6 py-2 text-sm font-normal text-grey50'
  }

  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-3 pb-2 ">
        {['전체', '내 프로필', '나의 팀', '모집 공고'].map((item) => (
          <div
            key={item}
            className={`${getActiveClass(item)} whitespace-nowrap`}
            onClick={() => handleFilterClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

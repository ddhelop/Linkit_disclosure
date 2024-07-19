'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { GetPrivateData } from '@/lib/action'
import { MyResumeResponse } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import PrivateNav from './Nav/PrivateNav'
import PrivateContentLayout from './Contents/PrivateContentLayout'

export default function Private() {
  const accessToken = useRecoilValue(accessTokenState)
  const [data, setData] = useState<MyResumeResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const miniProfileId = pathSegments[pathSegments.length - 1]

  // 이력서 데이터 가져오기
  useEffect(() => {
    if (accessToken && miniProfileId) {
      const fetchData = async () => {
        try {
          const result = await GetPrivateData(accessToken, parseInt(miniProfileId, 10))
          setData(result)
        } catch (error) {
          setError(error as Error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [accessToken, miniProfileId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className="flex flex-col bg-grey10 pb-20 pt-[11px]">
      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-[101px]">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <PrivateNav data={data} />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <PrivateContentLayout data={data} />
        </div>
      </div>
    </div>
  )
}

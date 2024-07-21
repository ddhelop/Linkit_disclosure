'use client'

import { accessTokenState } from '@/context/recoil-context'
import { GetTeamData, GetTeamResume } from '@/lib/action'
import { TeamIntroductionResponse } from '@/lib/types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import TeamNav from './Nav/TeamNav'
import TeamContentLayout from './Contents/TeamContentLayout'

export default function Team() {
  const accessToken = useRecoilValue(accessTokenState)
  const [data, setData] = useState<TeamIntroductionResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const teamMiniProfileId = pathSegments[pathSegments.length - 1]

  // 이력서 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const result = await GetTeamData(accessToken, parseInt(teamMiniProfileId, 10))
          setData(result)
        } catch (error) {
          setError(error as Error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [accessToken, teamMiniProfileId])

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
    <div className="flex flex-col bg-grey10 pb-20">
      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-[101px]">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <TeamNav data={data?.teamMiniProfileResponse} />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <TeamContentLayout data={data} />
        </div>
      </div>
    </div>
  )
}

'use client'
import TeamContentLayout from '@/components/Resume/TeamResume/Contents/ContentLayout'
import TeamResumeNav from '@/components/Resume/TeamResume/Nav/TeamResumeNav'
import { accessTokenState } from '@/context/recoil-context'
import { GetTeamResume } from '@/lib/action'
import { TeamIntroductionResponse } from '@/lib/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function TeamResume() {
  const accessToken = useRecoilValue(accessTokenState)
  const [data, setData] = useState<TeamIntroductionResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  // 이력서 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const result = await GetTeamResume(accessToken)
          setData(result)
        } catch (error) {
          setError(error as Error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [accessToken])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  console.log(data)

  return (
    <div className="flex flex-col pt-[61px]">
      {/* Header */}
      <div className="fixed flex h-[4rem] w-full items-center gap-[3.17rem] bg-white-alpha-50 px-[9.72rem] backdrop-blur-2xl">
        <Link href={'/myResume'}>
          <span className="cursor-pointer  text-lg text-grey100 opacity-50">내 이력서</span>
        </Link>
        <Link href={'/TeamResume'}>
          <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-lg ">팀 소개서</span>
        </Link>
      </div>

      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-[101px]">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <TeamResumeNav data={data.teamMiniProfileResponse} />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <TeamContentLayout data={data} />
        </div>
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'
import MyResumNav from './Nav/MyResumeNav'
import ContentLayout from './Contents/ContentLayout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetMyResume } from '@/lib/action'
import { MyResumeResponse } from '@/lib/types'

interface MiniProfileResponse {
  profileTitle: string
  uploadPeriod: string
  uploadDeadline: boolean
  miniProfileImg: string
  myValue: string
  skillSets: string
}

export default function MyResume() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [data, setData] = useState<MyResumeResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  // 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인이 필요합니다')
      router.push('/')
    } else {
      setAccessToken(token)
    }
  }, [router])

  // 이력서 데이터 가져오기
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const result = await GetMyResume(accessToken)
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
      <div className="flex h-[4rem] w-full items-center gap-[3.17rem] bg-[#fff] px-[9.72rem]">
        <Link href={'/myResume'}>
          <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-lg text-grey100">내 이력서</span>
        </Link>
        <Link href={'/TeamResume'}>
          <span className="cursor-pointer text-lg text-grey100 opacity-50">팀 소개서</span>
        </Link>
      </div>

      {/* contents */}
      <div className="flex justify-center gap-[1.87rem] pt-6">
        {/* left navBar */}
        <div className="w-[21.25rem]">
          <MyResumNav data={data} />
        </div>

        {/* right contents */}
        <div className="w-[47.31rem]">
          <ContentLayout />
        </div>
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'
import MyResumNav from './Nav/MyResumeNav'
import ContentLayout from './Contents/ContentLayout'
import { useEffect, useState } from 'react'

import { GetMyResume } from '@/lib/action'
import { MyResumeResponse } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import Image from 'next/image'

export default function MyResume() {
  const accessToken = useRecoilValue(accessTokenState)
  const [data, setData] = useState<MyResumeResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

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

  return (
    <div className="flex flex-col pt-[61px]">
      {/* Header */}
      <div className="fixed z-10 flex h-[4rem] w-full items-center gap-[3.17rem] bg-white-alpha-50 px-[9.72rem] backdrop-blur-2xl">
        <Link href={'/myResume'}>
          <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-main hover:text-main">내 이력서</span>
        </Link>
        <Link href={'/TeamResume'}>
          <span className="cursor-pointer text-grey100 opacity-50 hover:text-main">팀 소개서</span>
        </Link>
      </div>

      {/* contents */}
      {data.privateProfileEssential ? (
        <div className="flex justify-center gap-[1.87rem] pt-[101px]">
          {/* left navBar */}
          <div className="w-[21.25rem]">
            <MyResumNav data={data} />
          </div>

          {/* right contents */}
          <div className="w-[47.31rem]">
            <ContentLayout data={data} />
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="flex w-[25rem] flex-col items-center bg-[#fff] p-4">
            <Image src={'/assets/icons/gray-warning.svg'} width={70} height={70} alt="empty" />
            <p className="pt-3 text-xl font-bold text-grey100">등록된 내 이력서가 없어요</p>

            <div className="flex gap-[0.6rem] pt-[2.25rem]">
              <Link href={'/onBoarding/person/project'}>
                <button className="rounded-[0.6rem] bg-grey90 px-16 py-4 text-[#fff]"> 작성하러 가기</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

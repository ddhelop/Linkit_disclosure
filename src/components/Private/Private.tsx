'use client'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { GetPrivateData } from '@/lib/action'
import { MyResumeResponse } from '@/lib/types'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import PrivateNav from './Nav/PrivateNav'
import PrivateContentLayout from './Contents/PrivateContentLayout'
import Image from 'next/image'

export default function Private() {
  const accessToken = useRecoilValue(accessTokenState)
  const router = useRouter()
  const [data, setData] = useState<MyResumeResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const miniProfileId = pathSegments[pathSegments.length - 1]
  const [isPrivateView, setIsPrivateView] = useState<boolean>(false)
  const isAuth = useRecoilValue(accessTokenState)

  // 이력서 데이터 가져오기
  useEffect(() => {
    if (accessToken && miniProfileId) {
      const fetchData = async () => {
        try {
          const result = await GetPrivateData(accessToken, parseInt(miniProfileId, 10))
          if (result.ok) {
            const resultData = await result.json()
            setIsPrivateView(true)
            setData(resultData)
          } else {
            const resultData = await result.json()
            console.log('1231231231', resultData.code)
            if (resultData.code === 10018) {
              setIsPrivateView(false)
            } else {
              alert(resultData.message)
            }
          }
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
    if (!isAuth) {
      alert('다른 사용자의 이력서/소개서를 보려면 로그인이 필요합니다.')
      router.push('/findMember')

      // return (
      //   <div className="flex h-screen w-full items-center justify-center">
      //     <Image src="/assets/icons/lock.svg" alt="loading" width={100} height={100} />
      //   </div>
      // )
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col bg-grey10 pb-20 pt-[11px]">
      {isPrivateView ? (
        <div className="flex justify-center gap-[1.87rem] pt-[101px]">
          {/* left navBar */}
          <div className="w-[21.25rem]">{data && <PrivateNav data={data} />}</div>

          {/* right contents */}
          <div className="w-[47.31rem]">{data && <PrivateContentLayout data={data} />}</div>
        </div>
      ) : (
        // 프로필 완성도 조건 미충족시
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Image src="/assets/icons/Lock.svg" alt="private" width={82} height={118} />
          <div className="pt-[2.56rem] text-3xl text-grey90">프로필 완성도를 50% 이상 채워야 볼 수 있어요 🥲</div>
          <p className="pt-[1.69rem] text-grey90">Tip : 항목을 많이 채울수록 완성도가 올라가요!</p>
          <button className="mt-8 rounded-lg border border-main px-[1.44rem] py-3 text-main">
            링킷 사이트 바로가기
          </button>
        </div>
      )}
      {/* contents */}
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getAwards, AwardsItem } from '../api/awardsApi'
import ElementComponent from './common/ElementComponent'

export default function ProfileEditAwards() {
  const [awards, setAwards] = useState<AwardsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getAwards()
        setAwards(data)
      } catch (error) {
        console.error('Failed to fetch awards:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAwards()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (awards.length === 0) {
    return (
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Link href="/profile/edit/awards/new">
          <Button mode="main2" animationMode="main">
            수상 추가하기
          </Button>
        </Link>
        <div className="mt-4 text-grey60">수상 내역이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
      <Link href="/profile/edit/awards/new" className="">
        <Button mode="main2" animationMode="main" className="w-full">
          수상 추가하기
        </Button>
      </Link>

      <div className="mt-4">
        {awards.map((award) => (
          <ElementComponent
            key={award.profileAwardsId}
            id={award.profileAwardsId}
            title={award.awardsName}
            subtitle={award.awardsRanking}
            date={award.awardsDate}
            editPath="/profile/edit/awards/new"
            onDelete={(id) => {
              // 삭제 로직 구현
              console.log(`Delete award with id: ${id}`)
            }}
          />
        ))}
      </div>
    </div>
  )
}

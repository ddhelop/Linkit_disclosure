'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getAwards, AwardsItem } from '../api/awardsApi'
import ElementComponent from './common/ElementComponent'
import Image from 'next/image'

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

  return (
    <div className="flex flex-col rounded-xl">
      <Link href="/profile/edit/awards/new" className="">
        <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>

      {awards.length === 0 ? (
        <div className="mt-5 flex w-full justify-center">
          <Image
            src={'/common/images/not-contents-ui.png'}
            alt="empty"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      ) : (
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
      )}
    </div>
  )
}

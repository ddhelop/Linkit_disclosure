'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getAwards, AwardsItem, deleteAward } from '../api/awardsApi'
import ElementComponent from './common/ElementComponent'
import Image from 'next/image'
import { AwardListSkeleton } from './skeletons/ListSkeletons'
import { useToast } from '@/shared/hooks/useToast'
import { useProfileMenuStore } from '../../store/useProfileMenuStore'
import NotContentsUi from './common/NotContentsUi'

export default function ProfileEditAwards() {
  const [awards, setAwards] = useState<AwardsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { updateProfileMenu } = useProfileMenuStore()

  const fetchAwards = async () => {
    try {
      const data = await getAwards()
      setAwards(data)
      // 수상 데이터가 있으면 profileBooleanMenu 업데이트
      if (data.length > 0) {
        updateProfileMenu({ isProfileAwards: true })
      } else {
        updateProfileMenu({ isProfileAwards: false })
      }
    } catch (error) {
      console.error('Failed to fetch awards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAwards()
  }, [updateProfileMenu])

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return

    try {
      await deleteAward(id)
      await fetchAwards() // 목록 새로고침
      toast.success('성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('Failed to delete award:', error)
      toast.alert('삭제 중 오류가 발생했습니다.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col rounded-xl">
        <Link href="/profile/edit/awards/new">
          <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2">
            + 추가하기
          </Button>
        </Link>
        <AwardListSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl">
      <Link href="/profile/edit/awards/new" className="">
        <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>

      {awards.length === 0 ? (
        <div className="mt-6">
          <NotContentsUi />
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {awards.map((award) => (
            <ElementComponent
              key={award.profileAwardsId}
              id={award.profileAwardsId}
              title={award.awardsName}
              subtitle={award.awardsRanking}
              date={award.awardsDate}
              editPath="/profile/edit/awards/new"
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import ProjectComponent from './common/ProjectComponent'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { getPortfolioItems, PortfolioItem } from '../../api/getPortfolioItems'
import { PortfolioListSkeleton } from './skeletons/ListSkeletons'

import { useToast } from '@/shared/hooks/useToast'
import { deletePortfolio } from '../api/portfolio'
import { useProfileMenuStore } from '../../store/useProfileMenuStore'
import NotContentsUi from './common/NotContentsUi'

export default function ProfileEditPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { updateProfileMenu } = useProfileMenuStore()
  const toast = useToast()

  const fetchPortfolioItems = useCallback(async () => {
    try {
      const items = await getPortfolioItems()
      setPortfolioItems(items)
      // 포트폴리오 데이터가 있으면 profileBooleanMenu 업데이트
      if (items.length > 0) {
        updateProfileMenu({ isProfilePortfolio: true })
      } else {
        updateProfileMenu({ isProfilePortfolio: false })
      }
    } catch (error) {
      console.error('포트폴리오 데이터 조회 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [updateProfileMenu])

  useEffect(() => {
    fetchPortfolioItems()
  }, [fetchPortfolioItems])

  const handleDelete = async (portfolioId: number) => {
    try {
      await deletePortfolio(portfolioId)
      // 먼저 portfolioItems 상태 업데이트
      const updatedPortfolioItems = portfolioItems.filter((item) => item.profilePortfolioId !== portfolioId)
      setPortfolioItems(updatedPortfolioItems)

      toast.success('포트폴리오가 삭제되었습니다.')

      // 삭제 후 남은 포트폴리오가 없으면 profileBooleanMenu 업데이트
      if (updatedPortfolioItems.length === 0) {
        updateProfileMenu({ isProfilePortfolio: false })
      }
    } catch (error) {
      console.error('포트폴리오 삭제 실패:', error)
      toast.alert('포트폴리오 삭제에 실패했습니다.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Link href="/profile/edit/portfolio/new" className="flex w-full">
          <Button
            animationMode="main"
            mode="main2"
            size="custom"
            className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
            추가하기
          </Button>
        </Link>
        <PortfolioListSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Link href="/profile/edit/portfolio/new" className="flex w-full">
        <Button
          animationMode="main"
          mode="main2"
          size="custom"
          className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
        >
          <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
          추가하기
        </Button>
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        {portfolioItems.length === 0 ? (
          <div className="">
            <NotContentsUi />
          </div>
        ) : (
          portfolioItems.map((item) => (
            <ProjectComponent key={item.profilePortfolioId} item={item} onDelete={handleDelete} isEdit={true} />
          ))
        )}
      </div>
    </div>
  )
}

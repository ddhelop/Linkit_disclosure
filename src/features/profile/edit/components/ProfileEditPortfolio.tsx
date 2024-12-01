'use client'

import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import ProjectComponent from './common/ProjectComponent'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getPortfolioItems, PortfolioItem } from '../../api/getPortfolioItems'

export default function ProfileEditPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const items = await getPortfolioItems()
        setPortfolioItems(items)
      } catch (error) {
        console.error('포트폴리오 데이터 조회 실패:', error)
      }
    }

    fetchPortfolioItems()
  }, [])

  return (
    <>
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

        <div className="flex flex-col gap-4 pt-6">
          {portfolioItems.length === 0 ? (
            <Image
              src={'/common/images/not-contents-ui.png'}
              alt="empty"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          ) : (
            portfolioItems.map((item) => <ProjectComponent key={item.profilePortfolioId} {...item} />)
          )}
        </div>
      </div>
    </>
  )
}

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
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.88rem]">
        <Link href="/profile/edit/portfolio/new" className="flex w-full">
          <Button
            animationMode="main"
            mode="main2"
            className="flex w-full items-center justify-center gap-2 py-[0.38rem] text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />새 프로젝트
          </Button>
        </Link>

        <div className="flex flex-col gap-4 pt-6">
          {portfolioItems.map((item) => (
            <ProjectComponent key={item.profilePortfolioId} {...item} />
          ))}
        </div>
      </div>
    </>
  )
}

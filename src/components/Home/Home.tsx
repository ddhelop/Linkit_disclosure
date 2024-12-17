'use client'

import MiniTeamCard from '@/shared/components/MiniTeamCard'
import Banner from '../Banner/Banner'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <Banner />

      <div className="mt-[3.77rem] flex w-[65%] flex-col gap-4">
        <h1 className="text-xl font-semibold">나를 찾는 팀이 있어요!</h1>

        <div className="flex gap-9">
          <MiniTeamCard />
          <MiniTeamCard />
        </div>
      </div>
    </div>
  )
}

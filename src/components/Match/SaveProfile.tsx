'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GetMatchReceived } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { MatchReceivedType } from '@/lib/types'
import Link from 'next/link'
import PrivateMiniProfile from '../common/component/PrivateMiniProfile'

export default function SaveProfile() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [matchReceived, setMatchReceived] = useState<MatchReceivedType[]>([])

  // 내가 받은 매칭 데이터 불러오기 : GetMatchReceived
  useEffect(() => {
    const getMatchReceived = async () => {
      try {
        const response = await GetMatchReceived(accessToken)
        setMatchReceived(response)
      } catch (error) {
        console.error(error)
      }
    }
    getMatchReceived()
  })

  return (
    <div className="flex w-full flex-col ">
      <div className="mt-7 flex gap-10 text-lg text-grey100">
        <div className="flex- flex-col">
          <Link href={'/match/save'}>
            <div className=" cursor-pointer px-2 pb-1">찜한 팀원</div>
          </Link>
          <Image src={'/assets/icons/blue_border_bottom.svg'} width={82} height={1} alt="border" />
        </div>
        <div className=" opacity-50">
          <Link href={'/match/save/team'}>
            <div className=" cursor-pointer px-2 pb-1">찜한 팀</div>
          </Link>
        </div>
      </div>

      {/* 미니 프로필 */}
      <div className="mt-3">
        <PrivateMiniProfile />
      </div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GetMatchReceived, GetSavedMembers, GetSavedTeams } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { FindTeamInterface, MatchReceivedType, SaveProfileType, SaveTeamType } from '@/lib/types'
import Link from 'next/link'

import MatchingPrivateMiniProfile from '../common/component/MatchingPrivateMiniProfile'
import MatchingTeamMiniProfile from '../common/component/MatchingTeamMiniProfile'
import { usePathname } from 'next/navigation'

export default function SaveProfile() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [privateMatchReceived, setPrivateMatchReceived] = useState<SaveProfileType[]>([])
  const [teamMatchedReceived, setTeamMatchedReceived] = useState<FindTeamInterface[]>([])
  const pathname = usePathname()

  // 찜한 팀원 프로필 리스트 불러오기
  useEffect(() => {
    const getMatchReceived = async () => {
      try {
        const response = await GetSavedMembers(accessToken)
        setPrivateMatchReceived(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    getMatchReceived()
  }, [])

  return (
    <div className="flex w-full flex-col">
      <div className="mt-7 flex gap-10 text-lg text-grey100">
        <div className="flex flex-col">
          <Link href={'/match/save'}>
            <div className={`cursor-pointer px-2 pb-1 ${pathname === '/match/save' ? 'font-bold' : 'opacity-50'}`}>
              찜한 팀원
            </div>
          </Link>
          {pathname === '/match/save' && (
            <Image src={'/assets/icons/blue_border_bottom.svg'} width={82} height={1} alt="border" />
          )}
        </div>
        <div className="flex flex-col ">
          <Link href={'/match/save/team'}>
            <div
              className={`cursor-pointer px-2 pb-1  ${pathname === '/match/save/team' ? 'text-center font-bold' : 'text-center opacity-50'}`}
            >
              찜한 팀
            </div>
          </Link>
          {pathname === '/match/save/team' && (
            <Image src={'/assets/icons/blue_border_bottom.svg'} width={82} height={1} alt="border" />
          )}
        </div>
      </div>

      {/* 찜한 팀원*/}
      {pathname === '/match/save' &&
        // privateMatchReceived 데이터가 없으면 '찜한 팀원이 없어요' 메세지 출력
        (privateMatchReceived.length === 0 ? (
          <>
            <div className="mt-3 text-grey60">찜한 팀원이 없어요</div>
          </>
        ) : (
          <div className="mt-3 flex flex-wrap gap-3">
            {privateMatchReceived?.map((match, index) => <MatchingPrivateMiniProfile data={match} key={index} />)}
          </div>
        ))}

      {/* 찜한 팀 */}

      {pathname === '/match/save/team' &&
        // teamMatchedReceived 데이터가 없으면 '찜한 팀이 없어요' 메세지 출력
        (teamMatchedReceived?.length === 0 ? (
          <>
            <div className="mt-3 text-grey60">찜한 팀이 없어요</div>
          </>
        ) : (
          <div className="mt-3">
            {teamMatchedReceived?.map((profile, index) => <MatchingTeamMiniProfile key={index} profile={profile} />)}
          </div>
        ))}
    </div>
  )
}

'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GetSavedMembers, GetSavedTeams } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { FindTeamInterface, PrivateProfile, SaveProfileType } from '@/lib/types'
import Link from 'next/link'

import MatchingPrivateMiniProfile from '../common/component/MatchingPrivateMiniProfile'
import MatchingTeamMiniProfile from '../common/component/MatchingTeamMiniProfile'
import { usePathname } from 'next/navigation'
import Match404 from './common/Match404'
import TeamMemberMiniProfile from '../Find/Member/TeamMemberMiniProfile'

export default function SaveProfile() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [privateMatchReceived, setPrivateMatchReceived] = useState<PrivateProfile[]>([])
  const [teamMatchedReceived, setTeamMatchedReceived] = useState<FindTeamInterface[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname === '/match/save') {
          const response = await GetSavedMembers(accessToken)
          setPrivateMatchReceived(Array.isArray(response) ? response : [])
        } else if (pathname === '/match/save/team') {
          const response = await GetSavedTeams(accessToken)
          setTeamMatchedReceived(Array.isArray(response) ? response : [])
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [accessToken, pathname])

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
        <div className="flex flex-col">
          <Link href={'/match/save/team'}>
            <div
              className={`cursor-pointer px-2 pb-1 ${pathname === '/match/save/team' ? 'text-center font-bold' : 'text-center opacity-50'}`}
            >
              찜한 팀
            </div>
          </Link>
          {pathname === '/match/save/team' && (
            <Image src={'/assets/icons/blue_border_bottom.svg'} width={82} height={1} alt="border" />
          )}
        </div>
      </div>

      {/* 찜한 팀원 */}
      {pathname === '/match/save' &&
        (privateMatchReceived?.length === 0 ? (
          <>
            <Match404 message="찜한 팀원이 없어요" />
          </>
        ) : (
          <div className="mt-3 flex w-[48rem] flex-wrap gap-3">
            {privateMatchReceived?.map((profile, index) => <TeamMemberMiniProfile key={index} profile={profile} />)}
          </div>
        ))}

      {/* 찜한 팀 */}
      {pathname === '/match/save/team' &&
        (teamMatchedReceived?.length === 0 ? (
          <>
            <Match404 message="찜한 팀이 없어요" />
          </>
        ) : (
          <div className="mt-3 w-[4]">
            {teamMatchedReceived?.map((profile, index) => <MatchingTeamMiniProfile key={index} profile={profile} />)}
          </div>
        ))}
    </div>
  )
}

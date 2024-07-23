'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GetMatchReceived } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { MatchReceivedType } from '@/lib/types'
import ResponseMatchModat from './common/ResponseMatchModat'
import Match404 from './common/Match404'

export default function FromMyMatch() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [matchReceived, setMatchReceived] = useState<MatchReceivedType[]>([])
  const [selectedMatch, setSelectedMatch] = useState<MatchReceivedType | null>(null)

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
  }, [accessToken])

  return (
    <div className="flex w-full flex-col pt-12">
      <div className="flex flex-col gap-[0.31rem]">
        <h1 className="text-2xl font-bold">내가 받은 매칭</h1>
        <p className="text-grey60">공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!</p>
      </div>
      <div className="mt-[2.65rem] flex flex-col">
        {matchReceived.length === 0 && (
          // 매칭 알림이 없어요 메세지
          <div className="flex items-center gap-[0.5rem]">
            <Match404 message="아직 알림이 없어요!" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {matchReceived?.map((match, index) => (
            <motion.div
              key={`${match.id}-${index}`}
              className="flex w-[48.5rem] cursor-pointer  gap-[1.44rem] rounded-lg bg-[#fff] p-5 shadow-sm"
              whileHover={{
                y: -3,
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.05)',
              }}
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex items-start">
                <Image
                  src={match.miniProfileImg ? match.miniProfileImg : '/assets/images/DefaultProfile.png'}
                  width={65}
                  height={65}
                  alt="empty"
                  className="rounded-full"
                />
              </div>
              <div className="flex w-full justify-between">
                <div className="flex w-full flex-col justify-center gap-1">
                  <div className="flex w-full justify-between">
                    <p className="text-xs text-[#2563EB]">
                      {match.receivedTeamProfile ? '팀 소개서에 알림이 왔어요' : '내 이력서에 알림이 왔어요'}
                    </p>
                    <p className="text-xs text-grey50">{match.requestOccurTime}</p>
                  </div>
                  <p className="font-semibold">{match.senderName}님이 매칭 요청을 보냈습니다</p>
                  <p className="text-sm text-grey60">{match.requestMessage}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedMatch && <ResponseMatchModat match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GetMatchAccomplished, PostMatchContact, PostTeamMatchContact } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { MatchAccomplishedType } from '@/lib/types'
import Match404 from './common/Match404'
import RequestMatchModal from './common/RequestMatchModal'
import SuccessContactModal from './common/SuccessContactModal'

export default function AccomplishMatch() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [matchReceived, setMatchReceived] = useState<MatchAccomplishedType[]>([])
  const [selectedMatch, setSelectedMatch] = useState<MatchAccomplishedType | null>(null)

  // 내가 받은 매칭 데이터 불러오기 : GetMatchReceived
  useEffect(() => {
    const getMatchReceived = async () => {
      try {
        const response = await GetMatchAccomplished(accessToken)
        setMatchReceived(response)
      } catch (error) {
        console.error(error)
      }
    }

    // 데이터가 중복으로 불러오는 것을 방지하기 위해 빈 배열 체크 후 데이터 불러오기
    if (matchReceived.length === 0) {
      getMatchReceived()
    }
  }, [accessToken, matchReceived.length])

  const handleContactClick = (match: MatchAccomplishedType) => {
    setSelectedMatch(match)
  }

  const handleCloseModal = () => {
    setSelectedMatch(null)
  }

  return (
    <div className="flex w-full flex-col pt-12">
      <div className="flex flex-col gap-[0.31rem]">
        <h1 className="text-2xl font-bold">성사된 매칭</h1>
        <p className="text-grey60">공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!</p>
      </div>

      <div className="mt-[2.65rem] flex flex-col gap-2">
        {matchReceived.length === 0 && (
          // 매칭 알림이 없어요 메세지
          <div className="flex items-center gap-[0.5rem]">
            <Match404 message="아직 성사된 매칭이 없어요!" />
          </div>
        )}

        {matchReceived.map((match, index) => (
          <motion.div
            key={index}
            className="flex w-[48.5rem] cursor-pointer gap-[1.44rem] rounded-lg bg-[#fff] p-5 shadow-sm"
            whileHover={{
              y: -3,
              boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-center gap-1">
                <div className="flex w-full justify-between">
                  <p className="text-xs text-[#2563EB]">매칭 완료 알림</p>
                  <p className="text-xs text-grey50">{match.requestOccurTime}</p>
                </div>
                <p className="font-semibold">{match.successMatchingMemberName}님과 매칭이 성사되었습니다</p>
                <p className="w-full text-sm text-grey60">{match.requestMessage}</p>
                <div className="flex w-full justify-end">
                  <button
                    onClick={() => handleContactClick(match)}
                    className="rounded-[0.3rem] bg-main px-6 py-2 text-sm text-white"
                  >
                    연락하기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedMatch && (
        <SuccessContactModal match={selectedMatch} onClose={handleCloseModal} accessToken={accessToken} />
      )}
    </div>
  )
}

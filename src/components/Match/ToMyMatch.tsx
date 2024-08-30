'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DeleteMatchReceived, GetMatchSent } from '@/lib/action'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { MatchSentType } from '@/lib/types'
import Match404 from './common/Match404'
import { pushNotification } from '../common/component/ToastPopUp/ToastPopup'
import { equal } from 'assert'

export default function FromMyMatch() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [matchReceived, setMatchReceived] = useState<MatchSentType[]>([])

  // 내가 받은 매칭 데이터 불러오기 : GetMatchReceived
  useEffect(() => {
    const getMatchReceived = async () => {
      try {
        const response = await GetMatchSent(accessToken)
        setMatchReceived(response)
      } catch (error) {
        console.error(error)
      }
    }
    getMatchReceived()
  }, [accessToken, setMatchReceived])

  const onClickDelete = async (match: MatchSentType) => {
    try {
      // 여기서 match 정보를 사용하여 해당 매칭 데이터를 삭제하는 로직을 구현
      console.log('Deleting match:', match)

      if (confirm('정말 삭제하시겠습니까?')) {
        if (match.matchingType === 'PROFILE') {
          const response = await DeleteMatchReceived(accessToken, match.requestMatchingId, 'private')
          if (response.ok) {
            setMatchReceived((prevMatches) =>
              prevMatches.filter((m) => m.requestMatchingId !== match.requestMatchingId),
            )
            pushNotification('삭제되었습니다.', 'success')
          } else {
            pushNotification('삭제 중 오류가 발생했습니다.', 'error')
          }
        } else if (match.matchingType === 'TEAM_PROFILE') {
          const response = await DeleteMatchReceived(accessToken, match.requestMatchingId, 'team')
          if (response.ok) {
            setMatchReceived((prevMatches) =>
              prevMatches.filter((m) => m.requestMatchingId !== match.requestMatchingId),
            )
            pushNotification('삭제되었습니다.', 'success')
          } else {
            pushNotification('삭제 중 오류가 발생했습니다.', 'error')
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex  flex-col lg:w-full lg:pt-12">
      <div className="flex flex-col gap-[0.31rem]">
        <h1 className="text-2xl font-bold">내가 보낸 매칭</h1>
        <p className="text-grey60">공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!</p>
      </div>

      <div className="mt-[2.65rem] flex w-full flex-col">
        {matchReceived.length === 0 && (
          // 매칭 알림이 없어요 메세지
          <div className="flex items-center gap-[0.5rem]">
            <Match404 message="아직 알림이 없어요!" />
          </div>
        )}

        <div className="flex w-full flex-col gap-2">
          {matchReceived.map((match, index) => (
            <motion.div
              key={`${match.requestMatchingId}-${index}`}
              className="relative flex w-full  gap-[1.44rem] rounded-lg bg-[#fff] p-5 shadow-sm lg:w-[48.5rem]"
              whileHover={{
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                className="absolute bottom-5 right-5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md hover:bg-grey20"
                onClick={() => onClickDelete(match)} // match 전체 정보를 전달
              >
                <Image src={'/assets/icons/trash.svg'} width={20} height={20} alt="empty" className="" />
              </div>

              <div className="flex items-start">
                <div className="relative h-[65px] w-[65px] rounded-full">
                  <Image
                    src={match.miniProfileImg ? match.miniProfileImg : '/assets/images/DefaultProfile.png'}
                    layout="fill"
                    objectFit="cover"
                    alt="empty"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex w-full flex-col justify-center gap-1">
                  <div className="flex w-full justify-between">
                    <p className="text-xs text-[#2563EB]">
                      {match.requestTeamProfile ? `팀 찾기 > 수신 확인` : '팀원 찾기 > 수신 확인'}
                    </p>
                    <p className="text-xs text-grey50">{match.requestOccurTime}</p>
                  </div>
                  <p className="font-semibold">{match.receiverName}께 매칭 요청을 보냈습니다</p>
                  <p className="text-sm text-grey60">{match.requestMessage}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

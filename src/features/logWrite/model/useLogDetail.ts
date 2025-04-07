import { useEffect } from 'react'

import { getTeamLog } from '@/features/team/api/teamApi'
import { useToast } from '@/shared/hooks/useToast'
import { getProfileLogDetail } from '@/features/profile/log/api/getProfileLog'
import { useQuery } from '@tanstack/react-query'

// 응답 데이터 타입 정의
interface LogDetailResponse {
  result: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  }
}

export const useLogDetail = ({
  logId,
  teamName,
  setTitle,
  setContents,
  setIsPublic,
  setIsLoading,
}: {
  logId: string | null
  teamName: string | null
  setTitle: (v: string) => void
  setContents: (v: string) => void
  setIsPublic: (v: boolean) => void
  setIsLoading: (v: boolean) => void
}) => {
  const toast = useToast()

  const { data, isLoading, error } = useQuery<LogDetailResponse, Error>({
    queryKey: ['logDetail', logId, teamName],
    queryFn: async () => {
      // 팀 이름이 있으면 팀 로그를, 그렇지 않으면 프로필 로그를 가져옴
      if (teamName) {
        return getTeamLog(teamName, Number(logId))
      }
      return getProfileLogDetail(Number(logId))
    },
    enabled: !!logId, // logId가 있을 때만 쿼리 실행
  })

  // 성공 시 상태 업데이트
  useEffect(() => {
    if (data) {
      setTitle(data.result.logTitle)
      setContents(data.result.logContent)
      setIsPublic(data.result.isLogPublic)
    }
  }, [data, setTitle, setContents, setIsPublic])

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.alert('로그 정보를 불러오는데 실패했습니다.')
    }
  }, [error, toast])

  // 로딩 상태 업데이트
  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return { data, isLoading }
}

import { useState, useCallback } from 'react'
import { getMatchingProfileMenu, getTeamMatchingRequestMenu } from '@/features/match/api/MatchApi'
import { MatchingProfileMenuResponse, TeamInformation, TeamMatchingResponse } from '@/features/match/types/MatchTypes'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useToast } from './useToast'

interface MatchingType {
  type: 'PROFILE' | 'TEAM'
  id: string
}

export const useMatching = ({ type, id }: MatchingType) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [matchingData, setMatchingData] = useState<MatchingProfileMenuResponse | TeamMatchingResponse['result'] | null>(
    null,
  )
  const [selectedProfile, setSelectedProfile] = useState<TeamInformation | null>(null)
  const [isTeamMatching, setIsTeamMatching] = useState(false)

  const { isLogin } = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const onClickMatching = useCallback(async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }

    try {
      let data
      if (type === 'PROFILE') {
        data = await getMatchingProfileMenu(id)
        setMatchingData(data)
      } else {
        data = await getTeamMatchingRequestMenu(id)
        setMatchingData(data.result)
        setIsTeamMatching(data.result.isTeamMatching)
      }

      if (data) {
        setIsProfileModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching matching data:', error)
    }
  }, [type, id, isLogin, router, toast])

  const handleSelectProfile = useCallback((profile: TeamInformation) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(false)
    setIsRequestModalOpen(true)
  }, [])

  const handleCloseModals = useCallback(() => {
    setIsProfileModalOpen(false)
    setIsRequestModalOpen(false)
    setSelectedProfile(null)
  }, [])

  return {
    isProfileModalOpen,
    isRequestModalOpen,
    matchingData,
    selectedProfile,
    onClickMatching,
    handleSelectProfile,
    handleCloseModals,
    type,
    isTeamMatching,
  }
}

import { useState, useCallback } from 'react'
import { getMatchingProfileMenu, getTeamMatchingRequestMenu } from '@/features/match/api/MatchApi'
import { MatchingProfileMenuResponse, TeamInformation, TeamMatchingResponse } from '@/features/match/types/MatchTypes'

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

  const onClickMatching = useCallback(async () => {
    try {
      let data
      if (type === 'PROFILE') {
        data = await getMatchingProfileMenu(id)
        setMatchingData(data)
      } else {
        data = await getTeamMatchingRequestMenu(id)
        setMatchingData(data.result)
      }

      if (data) {
        console.log('Matching data:', data)
        setIsProfileModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching matching data:', error)
    }
  }, [type, id])

  const handleSelectProfile = useCallback((profile: TeamInformation) => {
    console.log('Handling profile selection:', profile)
    setSelectedProfile(profile)
    setIsProfileModalOpen(false)
    setIsRequestModalOpen(true)
  }, [])

  const handleCloseModals = useCallback(() => {
    console.log('Closing modals')
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
  }
}

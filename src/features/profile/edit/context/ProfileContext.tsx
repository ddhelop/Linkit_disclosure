// layout.tsx와 같은 파일 위치에 있다고 가정하고, 필요한 타입을 불러옵니다.
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ProfileLayoutType } from '../types/ProfileLayoutType'

type ProfileContextType = {
  profileData: ProfileLayoutType
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children, profileData }: { children: ReactNode; profileData: ProfileLayoutType }) => {
  return <ProfileContext.Provider value={{ profileData }}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

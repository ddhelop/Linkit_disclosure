// layout.tsx와 같은 파일 위치에 있다고 가정하고, 필요한 타입을 불러옵니다.
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ResultType } from '../types/ProfileLayoutType'

type ProfileEditContextType = {
  profileData: ResultType
}

const ProfileEditContext = createContext<ProfileEditContextType | undefined>(undefined)

export const ProfileEditProvider = ({ children, profileData }: { children: ReactNode; profileData: ResultType }) => {
  return <ProfileEditContext.Provider value={{ profileData }}>{children}</ProfileEditContext.Provider>
}

export const useProfileEdit = () => {
  const context = useContext(ProfileEditContext)
  if (context === undefined) {
    throw new Error('useProfileEdit must be used within a ProfileEditProvider')
  }
  return context
}

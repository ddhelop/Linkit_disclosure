'use client'
import { createContext, useContext, ReactNode } from 'react'
import { ProfileDetailData } from './types'
import { ProfileLayoutType } from '@/features/profile/edit/types/ProfileLayoutType'

interface ProfileViewContextType {
  profileData: ProfileDetailData | null
}

const ProfileViewContext = createContext<ProfileViewContextType | undefined>(undefined)

export function ProfileViewProvider({
  children,
  profileData,
}: {
  children: ReactNode
  profileData: ProfileDetailData
}) {
  return <ProfileViewContext.Provider value={{ profileData }}>{children}</ProfileViewContext.Provider>
}

export function useProfileView() {
  const context = useContext(ProfileViewContext)
  if (context === undefined) {
    throw new Error('useProfileView must be used within a ProfileViewProvider')
  }
  return context
}

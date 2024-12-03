'use client'
import { createContext, useContext, ReactNode } from 'react'
import { ProfileDetailData } from './types'

interface ProfileContextType {
  profileData: ProfileDetailData | null
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children, profileData }: { children: ReactNode; profileData: ProfileDetailData }) {
  return <ProfileContext.Provider value={{ profileData }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

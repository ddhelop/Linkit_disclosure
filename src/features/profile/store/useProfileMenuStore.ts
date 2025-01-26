import { create } from 'zustand'
import { ProfileBooleanMenuType } from '../edit/types/ProfileLayoutType'

interface ProfileMenuState {
  profileBooleanMenu: ProfileBooleanMenuType
  updateProfileMenu: (newMenu: Partial<ProfileBooleanMenuType>) => void
  setProfileMenu: (menu: ProfileBooleanMenuType) => void
}

export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  profileBooleanMenu: {
    isMiniProfile: false,
    isProfileSkill: false,
    isProfileActivity: false,
    isProfilePortfolio: false,
    isProfileEducation: false,
    isProfileAwards: false,
    isProfileLicense: false,
    isProfileLink: false,
  },
  updateProfileMenu: (newMenu) =>
    set((state) => ({
      profileBooleanMenu: { ...state.profileBooleanMenu, ...newMenu },
    })),
  setProfileMenu: (menu) =>
    set({
      profileBooleanMenu: menu,
    }),
}))

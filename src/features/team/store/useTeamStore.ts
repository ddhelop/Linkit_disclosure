import { create } from 'zustand'

interface TeamStore {
  isMyTeam: boolean
  setIsMyTeam: (value: boolean) => void
  isTeamManager: boolean
  setIsTeamManager: (value: boolean) => void
}

export const useTeamStore = create<TeamStore>((set) => ({
  isMyTeam: false,
  setIsMyTeam: (value) => set({ isMyTeam: value }),
  isTeamManager: false,
  setIsTeamManager: (value) => set({ isTeamManager: value }),
}))

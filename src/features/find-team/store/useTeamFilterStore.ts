import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 팀 찾기 필터 상태 관리를 위한 Zustand 스토어
 */
interface TeamFilterState {
  filters: {
    scaleNames: string[]
    cityNames: string[]
    teamStateNames: string[]
  }
}

interface TeamFilterStore extends TeamFilterState {
  // 모든 필터 설정
  setFilters: (filters: { scaleNames: string[]; cityNames: string[]; teamStateNames: string[] }) => void

  // 필터 업데이트 (기존 필터에 추가)
  updateFilters: (filters: { scaleNames?: string[]; cityNames?: string[]; teamStateNames?: string[] }) => void

  // 필터 초기화
  resetFilters: () => void

  // 개별 필터 제거
  removeSize: (size: string) => void
  removeLocation: (location: string) => void
  removeStatus: (status: string) => void
}

// 초기 상태
const initialState: TeamFilterState = {
  filters: {
    scaleNames: [],
    cityNames: [],
    teamStateNames: [],
  },
}

// Zustand 스토어 생성
export const useTeamFilterStore = create<TeamFilterStore>()(
  persist(
    (set) => ({
      // 초기 상태
      ...initialState,

      // 모든 필터 설정
      setFilters: (filters) => set({ filters }),

      // 필터 업데이트 (기존 필터에 추가)
      updateFilters: (partialFilters) =>
        set((state) => ({
          filters: {
            scaleNames: partialFilters.scaleNames || state.filters.scaleNames,
            cityNames: partialFilters.cityNames || state.filters.cityNames,
            teamStateNames: partialFilters.teamStateNames || state.filters.teamStateNames,
          },
        })),

      // 필터 초기화
      resetFilters: () => set(initialState),

      // 개별 필터 제거
      removeSize: (size) =>
        set((state) => ({
          filters: {
            ...state.filters,
            scaleNames: state.filters.scaleNames.filter((s) => s !== size),
          },
        })),

      removeLocation: (location) =>
        set((state) => ({
          filters: {
            ...state.filters,
            cityNames: state.filters.cityNames.filter((c) => c !== location),
          },
        })),

      removeStatus: (status) =>
        set((state) => ({
          filters: {
            ...state.filters,
            teamStateNames: state.filters.teamStateNames.filter((s) => s !== status),
          },
        })),
    }),
    {
      name: 'team-filter-storage', // 로컬 스토리지 키
    },
  ),
)

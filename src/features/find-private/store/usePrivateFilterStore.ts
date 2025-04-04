import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 개인 프로필 필터 상태 관리를 위한 Zustand 스토어
 */
export interface PrivateFilterState {
  subPositions: string[]
  cityNames: string[]
  profileStateNames: string[]
}

interface PrivateFilterStore {
  // 필터 상태
  filters: PrivateFilterState

  // 액션
  setFilters: (filters: PrivateFilterState) => void
  updateFilters: (filters: Partial<PrivateFilterState>) => void
  resetFilters: () => void
  removePosition: (position: string) => void
  removeLocation: (city: string) => void
  removeStatus: (status: string) => void
}

// 초기 필터 상태
const initialFilters: PrivateFilterState = {
  subPositions: [],
  cityNames: [],
  profileStateNames: [],
}

export const usePrivateFilterStore = create<PrivateFilterStore>()(
  persist(
    (set) => ({
      filters: initialFilters,

      // 전체 필터 설정
      setFilters: (newFilters) => {
        set({ filters: newFilters })
      },

      // 필터 일부 업데이트
      updateFilters: (partialFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...partialFilters },
        }))
      },

      // 필터 초기화
      resetFilters: () => {
        set({ filters: initialFilters })
      },

      // 특정 포지션 제거
      removePosition: (position) => {
        set((state) => ({
          filters: {
            ...state.filters,
            subPositions: state.filters.subPositions.filter((p) => p !== position),
          },
        }))
      },

      // 특정 지역 제거
      removeLocation: (city) => {
        set((state) => ({
          filters: {
            ...state.filters,
            cityNames: state.filters.cityNames.filter((c) => c !== city),
          },
        }))
      },

      // 특정 상태 제거
      removeStatus: (status) => {
        set((state) => ({
          filters: {
            ...state.filters,
            profileStateNames: state.filters.profileStateNames.filter((s) => s !== status),
          },
        }))
      },
    }),
    {
      name: 'private-filters', // localStorage 키 이름
      partialize: (state) => ({ filters: state.filters }),
    },
  ),
)

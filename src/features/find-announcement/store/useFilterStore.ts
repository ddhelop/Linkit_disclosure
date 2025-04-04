import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 공고 필터 상태 관리를 위한 Zustand 스토어
 */
export interface FilterState {
  subPositions: string[]
  cityNames: string[]
  scaleName: string[]
  projectType: string[]
}

interface FilterStore {
  // 필터 상태
  filters: FilterState

  // 액션
  setFilters: (filters: FilterState) => void
  updateFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  removePosition: (position: string) => void
  removeLocation: (city: string) => void
  removeSize: (size: string) => void
  removeProjectType: (type: string) => void
}

// 초기 필터 상태
const initialFilters: FilterState = {
  subPositions: [],
  cityNames: [],
  scaleName: [],
  projectType: [],
}

export const useFilterStore = create<FilterStore>()(
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

      // 특정 규모 제거
      removeSize: (size) => {
        set((state) => ({
          filters: {
            ...state.filters,
            scaleName: state.filters.scaleName.filter((s) => s !== size),
          },
        }))
      },

      // 특정 프로젝트 유형 제거
      removeProjectType: (type) => {
        set((state) => ({
          filters: {
            ...state.filters,
            projectType: state.filters.projectType.filter((t) => t !== type),
          },
        }))
      },
    }),
    {
      name: 'announcement-filters', // localStorage 키 이름
      partialize: (state) => ({ filters: state.filters }),
    },
  ),
)

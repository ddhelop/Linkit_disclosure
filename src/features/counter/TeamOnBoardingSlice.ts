// src/features/onboarding/TeamOnBoardingSlice.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TeamOnBoardingState {
  selectedShortTermFields: string[]
  selectedLongTermFields: string[]
  selectedArea: string
  selectedSubArea: string
  formData: {
    teamName: string
    teamSize: string
    teamField: string
  }
}

const initialState: TeamOnBoardingState = {
  selectedShortTermFields: [],
  selectedLongTermFields: [],
  selectedArea: '',
  selectedSubArea: '',
  formData: {
    teamName: '',
    teamSize: '2~3명',
    teamField: '개발',
  },
}

const teamOnBoardingSlice = createSlice({
  name: 'teamOnboarding',
  initialState,
  reducers: {
    setSelectedShortTermFields(state, action: PayloadAction<string[]>) {
      state.selectedShortTermFields = action.payload
    },
    setSelectedLongTermFields(state, action: PayloadAction<string[]>) {
      state.selectedLongTermFields = action.payload
    },
    setSelectedArea(state, action: PayloadAction<string>) {
      state.selectedArea = action.payload
    },
    setSelectedSubArea(state, action: PayloadAction<string>) {
      state.selectedSubArea = action.payload
    },
    setFormData(state, action: PayloadAction<Partial<TeamOnBoardingState['formData']>>) {
      state.formData = { ...state.formData, ...action.payload }
    },
  },
})

export const {
  setSelectedShortTermFields,
  setSelectedLongTermFields,
  setSelectedArea,
  setSelectedSubArea,
  setFormData,
} = teamOnBoardingSlice.actions
export default teamOnBoardingSlice.reducer

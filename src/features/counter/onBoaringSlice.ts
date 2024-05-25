import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OnboardingState {
  selectedShortTermFields: string[]
  selectedLongTermFields: string[]
  selectedPosition: string[]
  selectedSkills: string[]
}

const initialState: OnboardingState = {
  selectedShortTermFields: [],
  selectedLongTermFields: [],
  selectedPosition: [],
  selectedSkills: [],
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setSelectedShortTermFields: (state, action: PayloadAction<string[]>) => {
      state.selectedShortTermFields = action.payload
    },
    setSelectedLongTermFields: (state, action: PayloadAction<string[]>) => {
      state.selectedLongTermFields = action.payload
    },
    setSelectedPosition: (state, action: PayloadAction<string[]>) => {
      state.selectedPosition = action.payload
    },
    setSelectedSkills: (state, action: PayloadAction<string[]>) => {
      state.selectedSkills = action.payload
    },
  },
})

export const { setSelectedShortTermFields, setSelectedLongTermFields, setSelectedPosition, setSelectedSkills } =
  onboardingSlice.actions

export default onboardingSlice.reducer

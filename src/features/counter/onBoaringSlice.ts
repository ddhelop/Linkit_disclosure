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
  educationList: [],
}
interface Education {
  schoolName: string
  major: string
  startYear: string
  endYear: string
  status: string
}

interface OnboardingState {
  educationList: Education[]
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

    // Education
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educationList.push(action.payload)
    },
    editEducation: (state, action: PayloadAction<{ index: number; education: Education }>) => {
      state.educationList[action.payload.index] = action.payload.education
    },
    deleteEducation: (state, action: PayloadAction<number>) => {
      state.educationList.splice(action.payload, 1)
    },
  },
})

export const { addEducation, editEducation, deleteEducation } = onboardingSlice.actions
export const { setSelectedShortTermFields, setSelectedLongTermFields, setSelectedPosition, setSelectedSkills } =
  onboardingSlice.actions

export default onboardingSlice.reducer

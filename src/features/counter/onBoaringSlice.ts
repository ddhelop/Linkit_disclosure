import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Education {
  schoolName: string
  major: string
  startYear: string
  endYear: string
  status: string
}

interface Career {
  companyName: string
  position: string
  startYear: string
  startMonth: string
  endYear: string
  endMonth: string
  status: string
}

interface OnboardingState {
  selectedShortTermFields: string[]
  selectedLongTermFields: string[]
  selectedPosition: string[]
  selectedSkills: string[]
  educationList: Education[]
  careerList: Career[]
}

const initialState: OnboardingState = {
  selectedShortTermFields: [],
  selectedLongTermFields: [],
  selectedPosition: [],
  selectedSkills: [],
  educationList: [],
  careerList: [],
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

    // Career
    addCareer: (state, action: PayloadAction<Career>) => {
      state.careerList.push(action.payload)
    },
    editCareer: (state, action: PayloadAction<{ index: number; career: Career }>) => {
      state.careerList[action.payload.index] = action.payload.career
    },
    deleteCareer: (state, action: PayloadAction<number>) => {
      state.careerList.splice(action.payload, 1)
    },
  },
})

export const {
  setSelectedShortTermFields,
  setSelectedLongTermFields,
  setSelectedPosition,
  setSelectedSkills,
  addEducation,
  editEducation,
  deleteEducation,
  addCareer,
  editCareer,
  deleteCareer,
} = onboardingSlice.actions

export default onboardingSlice.reducer

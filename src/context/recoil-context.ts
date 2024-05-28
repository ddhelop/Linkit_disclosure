import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export interface Career {
  companyName: string
  position: string
  startYear: string
  startMonth: string
  endYear: string
  endMonth: string
  status: string
}
export interface Education {
  schoolName: string
  major: string
  startYear: string
  endYear: string
  status: string
}

export const educationListState = atom<Education[]>({
  key: 'educationListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const emailState = atom({
  key: 'emailState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
})

export const careerListState = atom<Career[]>({
  key: 'careerListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

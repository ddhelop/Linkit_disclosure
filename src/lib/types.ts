export interface IFormData {
  memberName: string
  contact: string
  code: string
  roleName: string // 직무/역할
  marketingAgree: boolean // 뉴스레터 및 마케팅 정보 수신 동의
}

export interface AuthResponseData {
  accessToken: string
  email: string
  memberBasicInform: Record<string, any>
}

export interface Career {
  projectName: string
  projectRole: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  retirement: boolean
}
export interface Education {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number
  degreeName: string
}

export interface TeamOnBoadingFieldFormInputs {
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string[]
}

export interface TeamOnBoardingActivityWayFormInputs {
  selectedArea: string
  selectedSubArea: string
  selectedShortTermFields: string[]
}

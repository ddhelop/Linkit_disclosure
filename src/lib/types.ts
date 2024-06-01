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
  startYear: string
  startMonth: string
  endYear: string
  endMonth: string
  retirement: boolean
}
export interface Education {
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  degreeName: string
}

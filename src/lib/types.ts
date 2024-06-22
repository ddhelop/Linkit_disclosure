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

// 미니프로필 조회
// lib/types.ts
export interface MiniProfileResponse {
  profileTitle: string
  uploadPeriod: string
  uploadDeadline: boolean
  miniProfileImg: string
  myValue: string
  skillSets: string
}

export interface CompletionResponse {
  completion: number
  awards: boolean
  attach: boolean
  introduction: boolean
  profileSkill: boolean
  profileTeamBuildingField: boolean
  profileRegion: boolean
  antecedents: boolean
  education: boolean
}

export interface ProfileIntroductionResponse {
  introduction: string
}

export interface ProfileSkillResponse {
  roleFields: string[]
  skillNames: string[]
}

export interface ProfileTeamBuildingFieldResponse {
  teamBuildingFieldNames: string[]
}

export interface AntecedentResponse {
  id: number
  projectName: string
  projectRole: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  retirement: boolean
}

export interface EducationResponse {
  id: number
  admissionYear: number
  graduationYear: number
  universityName: string
  majorName: string
  degreeName: string
}

export interface AwardResponse {
  id: number
  awardsName: string
  ranking: string
  organizer: string
  awardsYear: number
  awardsMonth: number
  awardsDescription: string
}

export interface AttachUrlResponse {
  id: number
  attachUrlName: string
  attachUrl: string
}

export interface AttachFileResponse {
  id: number
  attachFile: string
}

export interface AttachResponse {
  attachUrlResponseList: AttachUrlResponse[]
  attachFileResponseList: AttachFileResponse[]
}

export interface MyResumeResponse {
  miniProfileResponse: MiniProfileResponse
  completionResponse: CompletionResponse
  profileIntroductionResponse: ProfileIntroductionResponse
  profileSkillResponse: ProfileSkillResponse
  profileTeamBuildingFieldResponse: ProfileTeamBuildingFieldResponse
  antecedentsResponse: AntecedentResponse[]
  educationResponse: EducationResponse[]
  awardsResponse: AwardResponse[]
  attachResponse: AttachResponse
  memberNameResponse: MemberNameResponse
}

export interface MemberNameResponse {
  memberName: string
}

export interface MyResumNavProps {
  data: MyResumeResponse
}

export interface FormInputs {
  profileTitle: string
  collaborationValue: string
  skills: string
  year: string
  month: string
  day: string
  profileImage?: FileList
}

export interface ApiPayload {
  teamProfileTitle: string
  teamUploadPeriod: string
  teamUploadDeadline: boolean
  teamValue: string
  teamDetailInform: string
}

export interface PostTeamProfileResponse {
  ok: boolean
}

export interface IFormData {
  memberName: string
  contact: string
  roleName: string // 직무/역할
  marketingAgree: boolean // 뉴스레터 및 마케팅 정보 수신 동의
}

export interface PrivateIFormData {
  memberName: string
  contact: string
  marketingAgreement: boolean // 뉴스레터 및 마케팅 정보 수신 동의
  serviceAgreement: boolean
  privacyAgreement: boolean
  ageAgreement: boolean
  allAgree?: boolean
}

export interface PostIFormData {
  memberName: string
  contact: string
  marketingAgree: boolean
}

export interface AuthResponseData {
  accessToken: string
  email: string
  memberBasicInform: Record<string, any>
}

export interface Career {
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean
  // antecedentsDescription: string
}
export interface Education {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number | null
  degreeName: string
}

export interface TeamOnBoadingFieldFormInputs {
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string[]
}
export interface updateTeamOnBoadingFieldFormInputs {
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string | null
}

export interface TeamOnBoardingActivityWayFormInputs {
  cityName: string
  divisionName: string
  activityTagNames: string[]
}

// 미니프로필 조회
// lib/types.ts
export interface MiniProfileResponse {
  id: number
  profileTitle: string
  uploadPeriod: string
  uploadDeadline: boolean
  miniProfileImg: string
  myValue: string
  skillSets: string
  memberName: string
  myKeywordNames: string[]
  jobRoleNames: string[]
  isPrivateSaved: boolean
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
  startDate: string
  endDate: string
  retirement: boolean
  antecedentsDescription: string
}

export interface EducationResponse {
  id: number
  admissionYear: number
  graduationYear: number | null
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

export interface LocationResponse {
  cityName: string
  divisionName: string
}

export interface AttachUrlResponse {
  id: number
  attachUrlName: string
  attachUrlPath: string
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
  profileId: number
  privateProfileEssential: boolean
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
  profileRegionResponse: LocationResponse
  jobAndSkillResponse: JobAndSkillResponse
}

export interface JobAndSkillResponse {
  jobRoleNames: string[]
  skillNames: string[]
}

export interface MemberNameResponse {
  memberName: string
}

export interface MyResumNavProps {
  data: MyResumeResponse
}

export interface FormInputs {
  teamProfileTitle: string
  teamKeywordNames: string
  skills: string
  isTeamActivate: boolean
  profileImage?: FileList
}

export interface ApiPayload {
  teamProfileTitle: string
  isTeamActivate: boolean
  teamKeywordNames: string[]
}

export interface PostTeamProfileResponse {
  ok: boolean
  // teamDetailInform: string
}

export interface PostTeamProfileResponse2 {
  teamDetailInform: string
  teamProfileTitle: string
  teamLogoImageUrl: string
  teamKeywordNames: string[]
  sectorName: string
  sizeType: string
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string | null
}

export interface AwardFormInputs {
  id: number
  awardsName: string
  ranking: string
  organizer: string
  awardsYear: number
  awardsMonth: number
  awardsDescription: string
}

export interface URLFormInputs {
  attachUrlName: string
  attachUrlPath: string
}

export interface TeamURLFormInputs {
  teamAttachUrlName: string
  teamAttachUrlPath: string
}

// 팀 프로필 데이터 전체 조회
export interface TeamMiniProfileResponse {
  sectorName: string
  sizeType: string
  teamName: string
  teamProfileTitle: string

  teamLogoImageUrl: string
  teamKeywordNames: string[]
  teamDetailInform: string

  teamSize: string
  teamField: string
  teamBuildingFieldNames: string | null
}

// 팀 소개서 이력서 수정
export interface TeamMiniProfilePlusResponse {
  teamKeywordNames: string[]
  sectorName: string
  sizeType: string
  teamSize: string
  teamField: string
  teamLogoImageUrl: string
  teamBuildingFieldNames: string[]
  teamProfileTitle: string
  teamName: string
  teamDetailInform: string // 추가된 필드
}

export interface TeamCompletionResponse {
  teamCompletion: string
  teamMemberAnnouncement: boolean
  teamIntroduction: boolean
  teamMemberIntroduction: boolean
  teamAttach: boolean
  activity: boolean
  history: boolean
  teamProfileTeamBuildingField: boolean
}

export interface TeamProfileTeamBuildingFieldResponse {
  teamProfileTeamBuildingFieldNames: string[]
}

export interface TeamMemberAnnouncementResponse {
  mainBusiness: string
  jobRoleName: string
  id: number
  teamName: string
  applicationProcess: string
  skillNames: string[]
  teamLogoImageUrl: string
}

export interface ActivityResponse {
  activityTagName: string[]
  cityName: string
  divisionName: string
}

export interface TeamProfileIntroductionResponse {
  teamIntroduction: string
}

export interface TeamMemberIntroductionResponse {
  id: number
  teamName: string
  teamMemberName: string
  teamMemberRole: string
  teamMemberIntroductionText: string
}
export interface TeamIntroductionResponse {
  teamProfileEssential: boolean
  TeamCompletionResponse: TeamCompletionResponse
  teamProfileTeamBuildingFieldResponse: TeamProfileTeamBuildingFieldResponse
  teamProfileIntroductionResponse: TeamProfileIntroductionResponse
  teamMemberIntroductionResponses: TeamMemberIntroductionResponse
  // teamMemberAnnouncementResponses: TeamMemberAnnouncementResponse[]
}

export interface HistoryResponse {
  id: number
  historyOneLineIntroduction: string
  startYear: number
  endYear: number | null
  historyIntroduction: string
  inProgress: boolean
}

export interface TeamAttachUrlResponse {
  id: number
  teamAttachUrlName: string
  teamAttachUrlPath: string
}

export interface TeamAttachFileResponse {
  id: number
  teamAttachFileName: string
  teamAttachFilePath: string
}

export interface TeamAttachResponse {
  teamAttachUrlResponseList: TeamAttachUrlResponse[]
  teamAttachFileResponseList: TeamAttachFileResponse[]
}

export interface TeamIntroductionResponse {
  teamMiniProfileResponse: TeamMiniProfileResponse
  teamCompletionResponse: TeamCompletionResponse
  teamProfileTeamBuildingFieldResponse: TeamProfileTeamBuildingFieldResponse
  teamMemberAnnouncementResponses: TeamMemberAnnouncementResponse[]
  activityResponse: ActivityResponse
  teamProfileIntroductionResponse: TeamProfileIntroductionResponse
  teamMemberIntroductionResponses: TeamMemberIntroductionResponse
  historyResponses: HistoryResponse[]
  teamAttachResponse: TeamAttachResponse
}

export interface TeamMemberData {
  id: number
  teamName: string
  teamMemberName: string
  teamMemberRole: string
  teamMemberIntroductionText: string
}

export interface PostTeamMemberData {
  data: TeamMemberData[]
}

// 팀원 찾기 미니프로필
export interface PrivateProfile {
  id: number
  isPrivateSaved: boolean
  jobRoleNames: string[]
  memberName: string
  miniProfileImg: string
  profileTitle: string
  myKeywordNames: string[]
  uploadPeriod: string
  uploadDeadline: boolean
}

export interface TeamProfile {
  id: string
  sectorName: string
  sizeType: string
  teamName: string
  uploadPeriod: string
  miniProfileTitle: string
  teamUploadPeriod: string
  teamUploadDeadline: boolean
  teamLogoImageUrl: string
  teamKeywordNames: string[]
}

export interface teamMiniProfileResponse {
  id: number
  isTeamActivate: boolean
  sectorName: string
  sizeType: string
  teamKeywordNames: string[]
  teamLogoImageUrl: string
  teamName: string
  teamProfileTitle: string
}

export interface teamMemberAnnouncementResponse {
  applicationProcess: string
  jobRoleName: string
  id: number
  jobRoleNames: string[]
  mainBusiness: string
  skillNames: string[]
  teamName: string
  isTeamSaved: boolean
  teamLogoImageUrl: string
}
export interface FindTeamInterface {
  teamMiniProfileResponse: teamMiniProfileResponse
  teamMemberAnnouncementResponse: teamMemberAnnouncementResponse
}

export interface OneSchoolFormInputs {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number | null
  degreeName: string
}

export interface AntecedentFormInputs {
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean
}

// 팀소개서 - 팀원 공고 데이터 셋
export interface TeamAnnouncementMemberInterface {
  jobRoleName: string
  mainBusiness: string
  skillNames: string[]
  applicationProcess: string
}

// 팀 소개서- 팀 연혁 데이터 셋
export interface TeamHistoryDataSet {
  id: number
  historyOneLineIntroduction: string
  startYear: number
  endYear: number | null
  inProgress: boolean
  historyIntroduction: string
}

// 매칭관리 - 내게 온 매칭 알림
export interface MatchReceivedType {
  id: number
  receivedTeamProfile: boolean
  senderName: string
  requestMessage: string
  requestOccurTime: string
  jobRoleNames: string
  miniProfileImg: string
  matchingType: string
  receivedMatchingId: number
}

// 매칭관리 - 내가 보낸 매칭 알림
export interface MatchSentType {
  id: number
  requestTeamProfile: boolean
  receiverName: string
  requestMessage: string
  requestOccurTime: string
  miniProfileImg: string
}

// 매칭관리 - 성사된 매칭
export interface MatchAccomplishedType {
  successMatchingMemberName: string
  requestMessage: string
  requestOccurTime: string
  matchingType: string
  matchingId: number
}

// 찜한 팀원 리스트
export interface SaveProfileType {
  id: number
  profileTitle: string
  miniProfileImg: string
  isActivate: boolean
  myKeywordNames: string[]
  memberName: string
  isPrivateSaved: boolean
  jobRoleNames: string[]
}

// 찜한 팀 리스트
export interface SaveTeamType {
  teamMiniProfileResponse: teamMiniProfileResponse[]
  teamMemberAnnouncementResponse: teamMemberAnnouncementResponse[]
}

export interface MyResumEducationProps {
  data: EducationResponse[]
}

export interface EducationFormInputs {
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string | null
  degreeName: string
}

export interface EducationFormData {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number | null
  degreeName: string
}

// 온보딩 - career 페이지
export interface OnBoardingCareerFormInputs {
  id: number
  projectName: string
  projectRole: string
  startDate: string
  endDate: string | ''
  retirement: boolean | string
}

export interface OnBoardingCareer {
  id: number
  projectName: string
  projectRole: string
  startDate: string
  endDate: string | ''
  retirement: boolean | string
}

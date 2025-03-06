/** 모집 공고 포지션 정보 */
export interface AnnouncementPosition {
  majorPosition?: string
  subPosition: string
}

/** 모집 공고 스킬 정보 */
export interface AnnouncementSkill {
  announcementSkillName: string
}

/** 모집 공고 상세 정보 */
export interface Announcement {
  teamMemberAnnouncementId: number
  isAnnouncementScrap: boolean
  announcementScrapCount: number
  announcementDDay: number
  isPermanentRecruitment: boolean
  announcementTitle: string
  announcementPositionItem: AnnouncementPosition
  announcementSkillNames: AnnouncementSkill[]
  announcementEndDate?: string
  isRegionFlexible?: boolean
  mainTasks?: string
  workMethod?: string
  idealCandidate?: string
  preferredQualifications?: string
  joiningProcess?: string
  benefits?: string

  teamName?: string
  teamLogoImagePath?: string
  teamCode?: string
  isClosed?: boolean
}

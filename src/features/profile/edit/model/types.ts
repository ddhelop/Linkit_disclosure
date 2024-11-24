export interface LinkItem {
  id: number
  title: string
  url: string
}

export interface SocialLink {
  pattern: RegExp
  icon: string
}

export type SocialLinksConfig = Record<string, SocialLink>

export interface RoleContribution {
  role: string
  contribution: string
}

export interface ContributionOption {
  label: string
  value: string
}

export interface SkillInputProps {
  placeholder?: string
  className?: string
  onSkillAdd?: (skill: string) => void
  onSkillRemove?: (skill: string) => void
  selectedSkills?: string[]
}

export interface Portfolio {
  projectName: string
  projectLineDescription: string
  projectSize: 'TEAM' | 'PERSONAL'
  projectHeadCount: number
  projectTeamComposition: string
  projectStartDate: string
  projectEndDate: string | null
  isProjectInProgress: boolean
  projectRoleAndContributions: RoleContribution[]
  projectSkillNames: string[]
  projectLink: string
  projectDescription: string
  representImage: File | null
  subImages: File[]
}

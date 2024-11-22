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

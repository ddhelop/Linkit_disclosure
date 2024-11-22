import { SOCIAL_LINKS } from '../config/socialLinks'

export const getLinkIcon = (url: string): string | null => {
  for (const [key, value] of Object.entries(SOCIAL_LINKS)) {
    if (value.pattern.test(url)) {
      return value.icon
    }
  }
  return null
}

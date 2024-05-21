export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const part = parts.pop()
    if (part) {
      const refreshToken = part.split(';').shift()
      return refreshToken
    }
  }
  return undefined
}

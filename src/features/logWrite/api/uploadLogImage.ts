import { fetchWithCSR } from '@/shared/api/fetchData'

export const uploadLogImage = async (
  file: File,
  domainType: 'PROFILE' | 'TEAM',
  teamCode?: string,
): Promise<string> => {
  const formData = new FormData()
  const key = domainType === 'TEAM' ? 'teamLogBodyImage' : 'profileLogBodyImage'
  formData.append(key, file)

  const endpoint = domainType === 'TEAM' ? `/team/${teamCode}/log/body/image` : '/profile/log/body/image'

  const response = (await fetchWithCSR(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    credentials: 'include',
    body: formData,
  })) as Response

  if (!response.ok) throw new Error('이미지 업로드 실패')
  const data = await response.json()

  return domainType === 'TEAM' ? data.result.teamLogBodyImagePath : data.result.profileLogBodyImagePath
}

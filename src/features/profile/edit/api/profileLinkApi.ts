import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface LinkItem {
  productLinkId: number
  productLinkName: string
  productLinkPath: string
}

interface ProfileLinkResponse {
  profileLinkId: number
  linkName: string
  linkPath: string
  linkType: string
}

export const saveLinks = async (links: LinkItem[]) => {
  const formattedLinks = {
    profileLinkItems: links.map((link) => ({
      linkName: link.productLinkName,
      linkPath: link.productLinkPath,
    })),
  }

  const response = await fetchWithAuth('/api/v1/profile/link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedLinks),
  })

  if (!response.ok) {
    throw new Error('Failed to save links')
  }

  return response.json()
}

export const getLinks = async () => {
  const response = await fetchWithAuth('/api/v1/profile/link', {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch links')
  }

  const data = await response.json()
  return data.result.profileLinkItems.map((item: ProfileLinkResponse) => ({
    id: item.profileLinkId,
    title: item.linkName,
    url: item.linkPath,
  }))
}

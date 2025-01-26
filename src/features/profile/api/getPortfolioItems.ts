import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface PortfolioItem {
  profilePortfolioId: number
  projectName: string
  projectLineDescription: string
  projectSize: 'PERSONAL' | 'TEAM'
  projectStartDate: string
  projectEndDate: string
  isProjectInProgress: boolean
  projectRoles: string[]
  projectRepresentImagePath: string
}

export async function getPortfolioItems() {
  const response = await fetchWithAuth('/api/v1/profile/portfolio')
  const data = await response.json()

  if (!data.isSuccess) {
    throw new Error(data.message)
  }

  return data.result.profilePortfolioItems as PortfolioItem[]
}

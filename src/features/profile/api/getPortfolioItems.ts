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

// 프로포트폴리오 상세 조회
export async function getPortfolioDetail(id: number) {
  const response = await fetchWithAuth(`/api/v1/profile/portfolio/${id}`)
  const data = await response.json()
  return data.result
}

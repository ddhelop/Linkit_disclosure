import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface AddPortfolioRequest {
  projectName: string
  projectLineDescription: string
  projectSize: 'TEAM' | 'PERSONAL'
  projectHeadCount: number
  projectTeamComposition: string
  projectStartDate: string
  projectEndDate: string | null
  isProjectInProgress: boolean
  projectRoleAndContributions: {
    projectRole: string
    projectContribution: string
  }[]
  projectSkillNames: {
    projectSkillName: string
  }[]
  projectLink: string
  projectDescription: string
}

export const addPortfolio = async (formData: FormData, accessToken: string): Promise<void> => {
  const response = await fetchWithAuth('/api/v1/profile/portfolio', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to add portfolio')
  }

  return response.json()
}

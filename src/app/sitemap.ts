// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { BASE_SITE_URL } from '@/shared/constants/seo'
import { STATIC_PAGES } from '@/shared/constants/routes'
// import { fetchApi } from '@/shared/api/fetchData'

/**
 * sitemap.xml 파일을 생성하는 함수
 * Next.js가 자동으로 /sitemap.xml 엔드포인트로 변환합니다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 페이지를 상수 파일에서 가져와 sitemap에 추가
  const getPriority = (path: string): number => {
    if (path === '/') return 1.0
    if (path.startsWith('/find/') || path === '/match') return 0.9
    if (path.startsWith('/profile')) return 0.8
    return 0.7
  }

  const getChangeFrequency = (path: string): MetadataRoute.Sitemap[number]['changeFrequency'] => {
    if (path === '/' || path.startsWith('/find/')) return 'daily'
    return 'weekly'
  }

  const staticRoutes = STATIC_PAGES.map((path) => ({
    url: `${BASE_SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }))

  // 현재는 정적 페이지만 반환
  return staticRoutes

  /* 동적 페이지 URL 생성 - 추후 API 연동 시 활성화
  const dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    // 1. 팀 목록 가져와서 팀 상세 페이지 URL 생성
    const teams = await fetchTeams()
    const teamRoutes = teams.map((team) => ({
      url: `${BASE_SITE_URL}/team/${team.teamName}`,
      lastModified: new Date(team.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    dynamicRoutes.push(...teamRoutes)

    // 2. 유저 목록 가져와서 프로필 페이지 URL 생성
    const users = await fetchUsers()
    const userRoutes = users.map((user) => ({
      url: `${BASE_SITE_URL}/${user.emailId}`,
      lastModified: new Date(user.updatedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    dynamicRoutes.push(...userRoutes)

    // 더 많은, 동적 페이지 추가 가능
    // ...
  } catch (error) {
    console.error('동적 URL 생성 중 오류 발생:', error)
    // 오류가 있더라도 정적 페이지는 포함
  }

  return [...staticRoutes, ...dynamicRoutes]
  */
}

/**
 * 팀 정보를 가져오는 함수 - 추후 API 연동 시 활성화
 * 실제 구현에서는 DB나 API에서 데이터를 가져옵니다
 */
/*
async function fetchTeams() {
  try {
    // 예시: API에서 팀 목록 가져오기
    // const response = await fetchApi('/teams', { revalidate: 86400 }) // 24시간마다 재검증
    // return response.result.teams

    // 임시 데이터 (실제 구현 시 API/DB에서 가져오는 코드로 대체)
    return [
      { teamName: 'teamA', updatedAt: '2023-07-15' },
      { teamName: 'teamB', updatedAt: '2023-08-20' },
      // ...더 많은 팀
    ]
  } catch (error) {
    console.error('팀 정보 가져오기 실패:', error)
    return []
  }
}
*/

/**
 * 유저 정보를 가져오는 함수 - 추후 API 연동 시 활성화
 * 실제 구현에서는 DB나 API에서 데이터를 가져옵니다
 */
/*
async function fetchUsers() {
  try {
    // 예시: API에서 유저 목록 가져오기
    // const response = await fetchApi('/users', { revalidate: 86400 }) // 24시간마다 재검증
    // return response.result.users

    // 임시 데이터 (실제 구현 시 API/DB에서 가져오는 코드로 대체)
    return [
      { emailId: 'user1', updatedAt: '2023-09-10' },
      { emailId: 'user2', updatedAt: '2023-10-05' },
      // ...더 많은 유저
    ]
  } catch (error) {
    console.error('유저 정보 가져오기 실패:', error)
    return []
  }
}
*/

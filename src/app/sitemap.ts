// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { BASE_SITE_URL } from '@/shared/constants/seo'

/**
 * sitemap.xml 파일을 생성하는 함수
 * Next.js가 자동으로 /sitemap.xml 엔드포인트로 변환합니다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 메인 페이지들의 sitemap 항목
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_SITE_URL}/find/team`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_SITE_URL}/find/private`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_SITE_URL}/find/announcement`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_SITE_URL}/match`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // 여기에 동적으로 생성된 페이지들(팀, 프로필, 공고 상세 등)의 URL을 추가할 수 있습니다.
  // 예: DB에서 모든 팀 ID를 가져와서 팀 상세 페이지 URL을 생성

  // const teams = await getAllTeams(); // DB에서 팀 목록 가져오기
  // const teamRoutes = teams.map(team => ({
  //   url: `${BASE_SITE_URL}/team/${team.id}`,
  //   lastModified: new Date(team.updatedAt || team.createdAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7
  // }));

  // return [...mainRoutes, ...teamRoutes];

  return mainRoutes
}

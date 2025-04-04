// app/robots.ts
import type { MetadataRoute } from 'next'
import { BASE_SITE_URL } from '@/shared/constants/seo'

/**
 * robots.txt 파일을 생성하는 함수
 * Next.js가 자동으로 /robots.txt 엔드포인트로 변환합니다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/chat'],
      },
    ],
    sitemap: `${BASE_SITE_URL}/sitemap.xml`,
    host: BASE_SITE_URL,
  }
}

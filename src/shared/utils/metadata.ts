// src/shared/utils/metadata.ts
import type { Metadata } from 'next'
import {
  AUTHOR_NAME,
  BASE_SITE_NAME,
  BASE_SITE_URL,
  BASE_TEMPLETE_TITLE,
  BASE_SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from '@/shared/constants/seo'

type CreateMetadataParamsType = {
  title: string
  description?: string
  url?: string
  keywords?: string[]
  authors?: string
  robots?: {
    index?: boolean
    follow?: boolean
  }
  images?: {
    url: string
    alt: string
    width?: number
    height?: number
  }[]
  verification?: {
    google?: string
    yandex?: string
    bing?: string
    // 기타 검증 서비스...
  }
}

/**
 * 주어진 매개변수를 사용하여 메타데이터 객체를 생성합니다.
 *
 * @param {CreateMetadataParamsType} param - 메타데이터 생성에 필요한 매개변수를 담고 있는 객체입니다.
 * @param {string} param.title - 메타데이터의 제목입니다.
 * @param {string} [param.description] - 메타데이터의 설명입니다. 기본값은 상수 `BASE_SITE_DESCRIPTION`을 사용합니다.
 * @param {string} [param.url] - 메타데이터와 관련된 URL입니다. 기본값은 `BASE_SITE_URL`입니다.
 * @param {string[]} [param.keywords] - 메타데이터의 키워드 목록입니다. 기본값으로 `DEFAULT_KEYWORDS`를 사용합니다.
 * @param {string} [param.authors] - 메타데이터의 저자입니다. 기본값은 상수 `AUTHOR_NAME`을 사용합니다.
 * @param {Object} [param.robots] - 검색 엔진 크롤러의 색인 생성 및 팔로우 여부를 제어합니다.
 * @param {boolean} [param.robots.index=true] - 페이지가 검색 엔진에 의해 색인되어야 하는지 여부입니다.
 * @param {boolean} [param.robots.follow=true] - 페이지의 링크를 검색 엔진이 팔로우해야 하는지 여부입니다.
 * @param {Object[]} [param.images] - 오픈 그래프 및 트위터 카드 이미지
 *
 * @returns {Metadata} 생성된 메타데이터 객체입니다.
 */
export const createMetadata = (param: CreateMetadataParamsType): Metadata => {
  const index = typeof param.robots?.index === 'boolean' ? param.robots.index : true
  const follow = typeof param.robots?.follow === 'boolean' ? param.robots.follow : true
  const authors = param.authors ?? AUTHOR_NAME
  const description = param.description ?? BASE_SITE_DESCRIPTION
  const url = param.url ?? BASE_SITE_URL
  const keywords = param.keywords ?? DEFAULT_KEYWORDS
  const images = param.images ?? [
    {
      url: `${BASE_SITE_URL}/og:image.png`,
      alt: `${BASE_SITE_NAME} 이미지`,
    },
  ]

  const { title } = param

  const verification = param.verification

  return {
    metadataBase: new URL(BASE_SITE_URL),
    title: {
      default: title,
      template: `%s | ${BASE_TEMPLETE_TITLE}`,
    },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    authors: {
      name: authors,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: BASE_SITE_NAME,
      images,
    },
    twitter: {
      creator: authors,
      card: 'summary_large_image',
      site: url,
      title,
      description,
      images,
    },
    robots: {
      index,
      follow,
    },
    icons: {
      icon: [{ url: '/favicon.ico' }, { url: '/common/logo.png', type: 'image/png' }],
    },
    verification,
  }
}

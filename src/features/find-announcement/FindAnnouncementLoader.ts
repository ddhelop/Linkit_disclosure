// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { getFindAnnouncementProfile, getStaticFindAnnouncementData } from './api/FindAnnouncementApi'

export async function loadFindAnnouncementData(searchParams: { [key: string]: string | string[] }) {
  const queryClient = new QueryClient()

  // 기본 정적 데이터 가져오기
  await queryClient.prefetchQuery({
    queryKey: ['staticFindAnnouncementData'],
    queryFn: getStaticFindAnnouncementData,
  })

  // 검색 파라미터 기반 데이터 가져오기
  const params = {
    subPosition: Array.isArray(searchParams.subPosition)
      ? searchParams.subPosition
      : searchParams.subPosition
        ? [searchParams.subPosition]
        : [],
    cityName: Array.isArray(searchParams.cityName)
      ? searchParams.cityName
      : searchParams.cityName
        ? [searchParams.cityName]
        : [],
    scaleName: Array.isArray(searchParams.scaleName)
      ? searchParams.scaleName
      : searchParams.scaleName
        ? [searchParams.scaleName]
        : [],
    projectType: Array.isArray(searchParams.projectType)
      ? searchParams.projectType
      : searchParams.projectType
        ? [searchParams.projectType]
        : [],
    sortBy: searchParams.sortBy as string | null,
    size: 20,
  }

  // 무한 스크롤을 위한 첫 페이지 데이터 미리 가져오기
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['infiniteAnnouncements', params],
    queryFn: ({ pageParam }) => getFindAnnouncementProfile({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
  })

  return dehydrate(queryClient)
}

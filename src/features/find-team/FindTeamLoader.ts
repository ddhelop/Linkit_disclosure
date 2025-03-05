// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getStaticFindTeamData } from './api/FindTeamApi'
import { getFindTeamProfile } from '../find-private/api/FindTeamApi'

export async function loadFindTeamData(searchParams: { [key: string]: string | string[] }) {
  const queryClient = new QueryClient()

  // 기본 정적 데이터 가져오기
  await queryClient.prefetchQuery({
    queryKey: ['staticFindTeamData'],
    queryFn: getStaticFindTeamData,
  })

  // 검색 파라미터 기반 데이터 가져오기
  const params = {
    scaleName: Array.isArray(searchParams.scaleName)
      ? searchParams.scaleName
      : searchParams.scaleName
        ? [searchParams.scaleName]
        : [],
    cityName: Array.isArray(searchParams.cityName)
      ? searchParams.cityName
      : searchParams.cityName
        ? [searchParams.cityName]
        : [],
    teamStateName: Array.isArray(searchParams.teamStateName)
      ? searchParams.teamStateName
      : searchParams.teamStateName
        ? [searchParams.teamStateName]
        : [],
    size: 20,
  }

  // 무한 스크롤을 위한 첫 페이지 데이터 미리 가져오기
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['infiniteProfiles', params],
    queryFn: ({ pageParam }) => getFindTeamProfile({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
  })

  return dehydrate(queryClient)
}

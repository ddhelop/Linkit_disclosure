// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getStaticFindPrivateData, getFindPrivateProfile } from './api/FindPrivateApi'

export async function loadFindPrivateData(searchParams: { [key: string]: string | string[] }) {
  const queryClient = new QueryClient()

  // 기본 정적 데이터 가져오기
  await queryClient.prefetchQuery({
    queryKey: ['staticFindPrivateData'],
    queryFn: getStaticFindPrivateData,
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
    profileStateName: Array.isArray(searchParams.profileStateName)
      ? searchParams.profileStateName
      : searchParams.profileStateName
        ? [searchParams.profileStateName]
        : [],
    skillName: Array.isArray(searchParams.skillName)
      ? searchParams.skillName
      : searchParams.skillName
        ? [searchParams.skillName]
        : [],
    size: 20,
  }

  // 필터링된 프로필 데이터 미리 가져오기 (URL 파라미터가 있는 경우)
  if (
    params.subPosition.length > 0 ||
    params.cityName.length > 0 ||
    params.profileStateName.length > 0 ||
    params.skillName.length > 0
  ) {
    await queryClient.prefetchQuery({
      queryKey: ['filteredProfiles', params],
      queryFn: () => getFindPrivateProfile(params),
    })
  }

  return dehydrate(queryClient)
}

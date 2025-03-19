// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import {
  getTeamDetail,
  getTeamHistoryCalendar,
  getTeamList,
  getTeamMembers,
  getTeamProducts,
  getTeamRecruitment,
  getTeamRecruitmentList,
} from './api/TeamDataViewApi'
import { getTeamRepresentLog } from './api/TeamDataItemsApi'

// 팀 정보 조회
export async function loadTeamData(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamInfo', teamName],
    queryFn: () => getTeamDetail(teamName),
  })

  return dehydrate(queryClient)
}

// 팀 목록 조회
export async function loadTeamList() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamList'],
    queryFn: () => getTeamList(),
  })

  return dehydrate(queryClient)
}

// 팀 대표 로그 조회
export async function loadTeamRepresentLog(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamRepresentLog', teamName],
    queryFn: () => getTeamRepresentLog(teamName),
  })

  return dehydrate(queryClient)
}

// 팀 채용 공고 조회
export async function loadTeamRecruitments(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamRecruitment', teamName],
    queryFn: () => getTeamRecruitmentList(teamName),
  })

  return dehydrate(queryClient)
}

// 팀 채용 공고 상세 조회
export async function loadTeamRecruitment(teamName: string, id: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamRecruitment', teamName, id],
    queryFn: () => getTeamRecruitment(teamName, Number(id)),
  })

  return dehydrate(queryClient)
}

// 팀 멤버 조회
export async function loadTeamMembers(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamMembers', teamName],
    queryFn: () => getTeamMembers(teamName),
  })

  return dehydrate(queryClient)
}

// 팀 프로덕트 조회
export async function loadTeamProducts(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamProducts', teamName],
    queryFn: () => getTeamProducts(teamName),
  })

  return dehydrate(queryClient)
}

// 팀 연혁 조회
export async function loadTeamHistory(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamHistoryCalendar', teamName],
    queryFn: () => getTeamHistoryCalendar(teamName),
  })

  return dehydrate(queryClient)
}

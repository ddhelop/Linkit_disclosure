'use client'
import LogCard from '@/shared/components/Card/LogCard'
import { getPopularLog } from '../api/homeApi'
import { useQuery } from '@tanstack/react-query'

export default function HomeLogSection() {
  const { data } = useQuery({
    queryKey: ['popularLog'],
    queryFn: getPopularLog,
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold">오늘의 인기 로그</h1>

      <div className="grid grid-cols-1 gap-6">
        {data?.result.logInformMenus.map((log) => <LogCard key={log.id} log={log} />)}
      </div>
    </div>
  )
}

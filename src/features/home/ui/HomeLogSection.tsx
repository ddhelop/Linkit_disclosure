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
    <section className="flex w-full flex-col gap-6" aria-labelledby="log-heading">
      <h2 id="log-heading" className="text-xl font-semibold">
        오늘의 인기 로그
      </h2>

      <div className="grid grid-cols-1 gap-6" role="feed" aria-busy={!data}>
        {data?.result?.logInformMenus?.map((log) => (
          <article key={log.id}>
            <LogCard log={log} />
          </article>
        )) || <p>인기 로그가 없습니다.</p>}
      </div>
    </section>
  )
}

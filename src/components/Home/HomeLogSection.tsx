import LogCard from '@/shared/components/Card/LogCard'
import { ILogCard } from '@/shared/types/Card/LogCardTypes'

export default function HomeLogSection({ popularLog }: { popularLog: ILogCard[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold">오늘의 인기 로그</h1>

      <div className="grid grid-cols-2 gap-6">
        {popularLog.map((log) => (
          <LogCard key={log.id} log={log} />
        ))}
      </div>
    </div>
  )
}

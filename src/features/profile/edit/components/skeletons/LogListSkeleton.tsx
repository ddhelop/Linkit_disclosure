import { LogSkeleton } from './LogSkeleton'

export const LogListSkeleton = () => {
  return (
    <div className="mt-5 flex flex-col gap-4 pt-1">
      {[...Array(3)].map((_, index) => (
        <LogSkeleton key={index} />
      ))}
    </div>
  )
}

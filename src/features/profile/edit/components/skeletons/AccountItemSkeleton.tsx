export const AccountItemSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem]">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-grey20" />
        <div className="flex flex-col justify-center gap-1">
          <div className="h-3 w-16 animate-pulse rounded bg-grey20" />
          <div className="h-4 w-32 animate-pulse rounded bg-grey20" />
        </div>
      </div>
      <div className="h-8 w-8 animate-pulse rounded bg-grey20" />
    </div>
  )
}

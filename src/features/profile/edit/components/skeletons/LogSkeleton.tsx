export const LogSkeleton = () => {
  return (
    <div className="group relative flex flex-col rounded-xl bg-white p-5">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-[18px] w-[200px] animate-pulse rounded bg-grey20" />
        </div>
        <div className="h-3 w-24 animate-pulse rounded bg-grey20" />
      </div>

      <div className="mt-5 rounded-xl bg-grey10 px-6 py-[1.31rem]">
        <div className="h-4 w-full animate-pulse rounded bg-grey20" />
      </div>

      <div className="absolute right-0 top-7 flex -translate-y-1/2 gap-2 pr-6">
        <div className="h-[22px] w-[22px] animate-pulse rounded bg-grey20" />
      </div>
    </div>
  )
}

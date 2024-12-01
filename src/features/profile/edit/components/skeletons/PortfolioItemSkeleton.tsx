export const PortfolioItemSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-48 animate-pulse rounded bg-grey20" />
          <div className="h-4 w-32 animate-pulse rounded bg-grey20" />
        </div>
        <div className="h-[22px] w-[22px] animate-pulse rounded bg-grey20" />
      </div>
      <div className="mt-4 h-20 w-full animate-pulse rounded-lg bg-grey20" />
    </div>
  )
}

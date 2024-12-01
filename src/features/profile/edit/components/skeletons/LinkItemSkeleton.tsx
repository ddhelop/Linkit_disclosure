export const LinkItemSkeleton = () => {
  return (
    <div className="mt-3 flex gap-2">
      <div className="h-10 w-32 animate-pulse rounded-lg bg-grey20" />
      <div className="relative flex-1">
        <div className="h-10 w-full animate-pulse rounded-lg bg-grey20" />
      </div>
      <div className="ml-4 h-6 w-6 animate-pulse rounded bg-grey20" />
    </div>
  )
}

export const ProfileImageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <div className="h-5 w-24 animate-pulse rounded bg-grey20" />
        <div className="h-4 w-32 animate-pulse rounded bg-grey20" />
      </div>

      <div className="mt-3 flex gap-8">
        <div className="h-[150px] w-[150px] animate-pulse rounded-[1.25rem] bg-grey20" />
        <div className="flex flex-col justify-end gap-2">
          <div className="h-4 w-72 animate-pulse rounded bg-grey20" />
          <div className="flex items-end gap-4">
            <div className="h-10 w-24 animate-pulse rounded-xl bg-grey20" />
            <div className="h-4 w-16 animate-pulse rounded bg-grey20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const NameSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-5 w-16 animate-pulse rounded bg-grey20" />
      <div className="h-12 w-full animate-pulse rounded-lg bg-grey20" />
      <div className="h-4 w-64 animate-pulse rounded bg-grey20" />
    </div>
  )
}

export const SelectionSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-5 w-20 animate-pulse rounded bg-grey20" />
      <div className="flex w-full gap-[1.38rem]">
        <div className="flex w-[48%] flex-col gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-grey20" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-grey20" />
        </div>
        <div className="flex w-[48%] flex-col gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-grey20" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-grey20" />
        </div>
      </div>
    </div>
  )
}

export const StatusSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-5 w-20 animate-pulse rounded bg-grey20" />
      <div className="flex flex-wrap gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 w-24 animate-pulse rounded-lg bg-grey20" />
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-3 rounded-xl bg-grey10 px-6 py-7">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 w-28 animate-pulse rounded-lg bg-grey20" />
        ))}
      </div>
    </div>
  )
}

export const VisibilitySectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-5 w-32 animate-pulse rounded bg-grey20" />
      <div className="flex gap-4">
        <div className="h-6 w-20 animate-pulse rounded bg-grey20" />
        <div className="h-6 w-20 animate-pulse rounded bg-grey20" />
      </div>
    </div>
  )
}

export const BasicProfileSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        <ProfileImageSkeleton />
        <NameSectionSkeleton />
        <SelectionSectionSkeleton /> {/* Position */}
        <SelectionSectionSkeleton /> {/* Area */}
        <StatusSectionSkeleton />
        <VisibilitySectionSkeleton />
      </div>
      <div className="mt-[1.31rem] flex w-full justify-end">
        <div className="h-10 w-24 animate-pulse rounded-xl bg-grey20" />
      </div>
    </>
  )
}

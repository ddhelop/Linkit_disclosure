import { HistoryItemSkeleton } from './HistoryItemSkeleton'
import { EducationItemSkeleton } from './EducationItemSkeleton'
import { LinkItemSkeleton } from './LinkItemSkeleton'
import { PortfolioItemSkeleton } from './PortfolioItemSkeleton'
import { SkillItemSkeleton } from './SkillItemSkeleton'
import { AwardItemSkeleton } from './AwardItemSkeleton'
import { AccountItemSkeleton } from './AccountItemSkeleton'

export const HistoryListSkeleton = () => (
  <div className="mt-4 flex flex-col gap-4">
    {[...Array(3)].map((_, i) => (
      <HistoryItemSkeleton key={i} />
    ))}
  </div>
)

export const EducationListSkeleton = () => (
  <div className="mt-4 flex flex-col gap-4">
    {[...Array(2)].map((_, i) => (
      <EducationItemSkeleton key={i} />
    ))}
  </div>
)

export const LinkListSkeleton = () => (
  <div className="flex flex-col gap-3">
    {[...Array(3)].map((_, i) => (
      <LinkItemSkeleton key={i} />
    ))}
  </div>
)

export const PortfolioListSkeleton = () => (
  <div className="flex flex-col gap-4 pt-6">
    {[...Array(2)].map((_, i) => (
      <PortfolioItemSkeleton key={i} />
    ))}
  </div>
)

export const SkillListSkeleton = () => (
  <div className="flex flex-col gap-2">
    {[...Array(4)].map((_, i) => (
      <SkillItemSkeleton key={i} />
    ))}
  </div>
)

export const AwardListSkeleton = () => (
  <div className="mt-4 flex flex-col gap-4">
    {[...Array(3)].map((_, i) => (
      <AwardItemSkeleton key={i} />
    ))}
  </div>
)

export const AccountListSkeleton = () => (
  <div className="flex flex-col items-center gap-2">
    {[...Array(3)].map((_, i) => (
      <AccountItemSkeleton key={i} />
    ))}
    <div className="my-[1.88rem] h-[1px] w-[96%] animate-pulse bg-grey20" />
    <div className="h-6 w-full animate-pulse rounded bg-grey20" />
  </div>
)

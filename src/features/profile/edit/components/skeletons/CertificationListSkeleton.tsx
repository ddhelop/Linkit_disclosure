import { CertificationSkeleton } from './CertificationSkeleton'

export const CertificationListSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {[...Array(3)].map((_, index) => (
        <CertificationSkeleton key={index} />
      ))}
    </div>
  )
}

type FilterType = 'MEMBER' | 'TEAM' | 'RECRUITMENT'

interface FilterButtonProps {
  type: FilterType
  label: string
  selected: FilterType
  onClick: (type: FilterType) => void
}

const FilterButton = ({ type, label, selected, onClick }: FilterButtonProps) => (
  <div
    className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-normal ${
      selected === type ? 'bg-[#4D82F3] text-white' : 'border-grey40 text-grey50'
    }`}
    onClick={() => onClick(type)}
  >
    {label}
  </div>
)

export default function MatchScrapFilter({
  selected,
  onFilterChange,
}: {
  selected: FilterType
  onFilterChange: (type: FilterType) => void
}) {
  return (
    <div className="mt-9 flex gap-3">
      <FilterButton type="MEMBER" label="팀원" selected={selected} onClick={onFilterChange} />
      <FilterButton type="TEAM" label="팀" selected={selected} onClick={onFilterChange} />
      <FilterButton type="RECRUITMENT" label="모집공고" selected={selected} onClick={onFilterChange} />
    </div>
  )
}

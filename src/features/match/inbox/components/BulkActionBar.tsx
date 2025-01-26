import MessageCheckbox from './MessageCheckbox'

interface BulkActionBarProps {
  selectedCount: number
  totalCount: number
  onMarkRead: () => void
  onDelete: () => void
  onToggleAll: () => void
  isAllSelected: boolean
}

export default function BulkActionBar({
  selectedCount,
  totalCount,
  onMarkRead,
  onDelete,
  onToggleAll,
  isAllSelected,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg p-4">
      <div className="flex items-center gap-3">
        <MessageCheckbox isChecked={isAllSelected} onChange={onToggleAll} />
        <span className="text-sm text-grey80">{selectedCount}개 선택됨</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onMarkRead}
          className="flex items-center gap-2 rounded-[0.38rem] border border-grey40 px-3 py-1 text-sm text-grey70"
        >
          읽음 처리
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-[0.38rem] border border-grey40 px-3 py-1 text-sm text-[#FF345F]"
        >
          삭제하기
        </button>
      </div>
    </div>
  )
}

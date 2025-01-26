'use client'

import { useState, useEffect } from 'react'
import { MatchingMessage } from '../types/MatchTypes'
import { deleteRequestedMatchings } from '../api/MatchApi'
import MessageCheckbox from './components/MessageCheckbox'
import OutboxMessage from './components/OutboxMessage'
import { useToast } from '@/shared/hooks/useToast'

interface OutBoxMessageProps {
  messages: MatchingMessage[]
  onUpdate?: () => void
}

function BulkActionBar({
  selectedCount,
  onDelete,
  onToggleAll,
  isAllSelected,
}: {
  selectedCount: number
  totalCount: number
  onDelete: () => void
  onToggleAll: () => void
  isAllSelected: boolean
}) {
  if (selectedCount === 0) return null

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg p-4">
      <div className="flex items-center gap-3">
        <MessageCheckbox isChecked={isAllSelected} onChange={onToggleAll} />
        <span className="text-sm text-grey80">{selectedCount}개 선택됨</span>
      </div>
      <div className="flex gap-4">
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

export default function OutBoxRequestMessage({ messages, onUpdate }: OutBoxMessageProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [localMessages, setLocalMessages] = useState<MatchingMessage[]>(messages)
  const toast = useToast()

  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  const handleCheckboxChange = (matchingId: number) => {
    setSelectedIds((prev) =>
      prev.includes(matchingId) ? prev.filter((id) => id !== matchingId) : [...prev, matchingId],
    )
  }

  const handleToggleAll = () => {
    if (selectedIds.length === messages.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(messages.map((msg) => msg.matchingId))
    }
  }

  const handleBulkDelete = async () => {
    if (!window.confirm('선택한 메시지를 삭제하시겠습니까?')) return

    try {
      const response = await deleteRequestedMatchings(selectedIds)
      if (response.isSuccess) {
        toast.success('메시지 삭제에 성공했습니다.')
        setSelectedIds([])
        onUpdate?.()
      } else {
        toast.alert(response.message)
      }
    } catch (error) {
      console.error('Error deleting messages:', error)
      toast.alert('메시지 삭제에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col">
      <BulkActionBar
        selectedCount={selectedIds.length}
        totalCount={localMessages.length}
        onDelete={handleBulkDelete}
        onToggleAll={handleToggleAll}
        isAllSelected={selectedIds.length === localMessages.length}
      />

      <div className="flex flex-col gap-4">
        {localMessages.map((message) => (
          <div key={message.matchingId} className="flex items-center gap-3">
            <MessageCheckbox
              isChecked={selectedIds.includes(message.matchingId)}
              onChange={() => handleCheckboxChange(message.matchingId)}
            />
            <OutboxMessage message={message} />
          </div>
        ))}
      </div>
    </div>
  )
}

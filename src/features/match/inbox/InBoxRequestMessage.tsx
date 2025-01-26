'use client'

import { useState, useRef, useEffect } from 'react'
import { MatchingMessage, MessageWithSenderInfo } from '../types/MatchTypes'
import { markMatchingAsRead, updateMatchingStatus, deleteMatchings } from '../api/MatchApi'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import RequestedMessage from './components/RequestedMessage'
import CompletedMessage from './components/CompletedMessage'
import DeniedMessage from './components/DeniedMessage'
import MatchingModal from './components/MatchingModal'
import MessageCheckbox from './components/MessageCheckbox'

interface InBoxMessageProps {
  messages: MatchingMessage[]
  onUpdate?: () => void
}

function BulkActionBar({
  selectedCount,
  onMarkRead,
  onDelete,
  onToggleAll,
  isAllSelected,
}: {
  selectedCount: number
  totalCount: number
  onMarkRead: () => void
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
          onClick={onMarkRead}
          className="p flex items-center gap-2 rounded-[0.38rem] border border-grey40 px-3 text-sm text-grey70"
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

export default function InBoxRequestMessage({ messages, onUpdate }: InBoxMessageProps) {
  const [selectedMessage, setSelectedMessage] = useState<MatchingMessage | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [localMessages, setLocalMessages] = useState<MatchingMessage[]>(messages)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  useEffect(() => {
    if (selectedMessage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedMessage])

  useOnClickOutside({
    refs: [modalRef],
    handler: () => setSelectedMessage(null),
    isEnabled: !!selectedMessage,
  })

  const handleCheckboxChange = (matchingId: number) => {
    setSelectedIds((prev) =>
      prev.includes(matchingId) ? prev.filter((id) => id !== matchingId) : [...prev, matchingId],
    )
  }

  const handleBulkMarkRead = async () => {
    try {
      await markMatchingAsRead(selectedIds)
      setSelectedIds([])
      onUpdate?.()
    } catch (error) {
      console.error('Error marking messages as read:', error)
    }
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
      await deleteMatchings(selectedIds)
      setSelectedIds([])
      onUpdate?.()
    } catch (error) {
      console.error('Error deleting messages:', error)
    }
  }

  const handleMessageClick = async (message: MatchingMessage) => {
    setSelectedMessage(message)

    if (message.receiverReadStatus === 'UNREAD_REQUESTED_MATCHING') {
      try {
        await markMatchingAsRead([message.matchingId])
        setLocalMessages((prev) =>
          prev.map((msg) =>
            msg.matchingId === message.matchingId ? { ...msg, receiverReadStatus: 'READ_COMPLETED_MATCHING' } : msg,
          ),
        )
      } catch (error) {
        console.error('Error marking message as read:', error)
      }
    }
  }

  const handleAccept = async () => {
    if (!selectedMessage) return

    try {
      await updateMatchingStatus(selectedMessage.matchingId, 'COMPLETED')
      setSelectedMessage(null)
      onUpdate?.()
    } catch (error) {
      console.error('Error accepting matching:', error)
    }
  }

  const handleReject = async () => {
    if (!selectedMessage) return
    try {
      await updateMatchingStatus(selectedMessage.matchingId, 'DENIED')
      setSelectedMessage(null)
      onUpdate?.()
    } catch (error) {
      console.error('Error rejecting matching:', error)
    }
  }

  const renderMessage = (message: MatchingMessage) => {
    const isChecked = selectedIds.includes(message.matchingId)
    const MessageComponent =
      {
        REQUESTED: RequestedMessage,
        COMPLETED: CompletedMessage,
        DENIED: DeniedMessage,
      }[message.matchingStatusType] || RequestedMessage

    // 메시지 정보 객체 생성
    const messageInfo =
      message.senderType === 'TEAM'
        ? {
            name: message.senderTeamInformation.teamName,
            imagePath: message.senderTeamInformation.teamLogoImagePath || '/common/default_profile.svg',
            scale: message.senderTeamInformation.teamScaleItem.teamScaleName,
            link: `/team/${message.senderTeamInformation.teamCode}`,
          }
        : {
            name: message.senderProfileInformation.memberName,
            imagePath: message.senderProfileInformation.profileImagePath || '/common/default_profile.svg',
            position: message.senderProfileInformation.profilePositionDetail.majorPosition,
            link: `/profile/${message.senderProfileInformation.emailId}`,
          }

    return (
      <div className="flex items-center gap-3">
        <MessageCheckbox isChecked={isChecked} onChange={() => handleCheckboxChange(message.matchingId)} />
        <MessageComponent
          message={
            {
              ...message,
              senderInfo: messageInfo,
            } as MessageWithSenderInfo
          }
          onClick={message.matchingStatusType === 'REQUESTED' ? () => handleMessageClick(message) : undefined}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <BulkActionBar
        selectedCount={selectedIds.length}
        totalCount={localMessages.length}
        onMarkRead={handleBulkMarkRead}
        onDelete={handleBulkDelete}
        onToggleAll={handleToggleAll}
        isAllSelected={selectedIds.length === localMessages.length}
      />

      <div className="flex flex-col gap-4">
        {localMessages.map((message) => (
          <div key={message.matchingId}>{renderMessage(message)}</div>
        ))}
      </div>

      {selectedMessage && selectedMessage.matchingStatusType === 'REQUESTED' && (
        <MatchingModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onAccept={handleAccept}
          onReject={handleReject}
          modalRef={modalRef}
        />
      )}
    </div>
  )
}

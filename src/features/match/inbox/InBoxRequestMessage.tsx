'use client'

import { useState, useRef, useEffect } from 'react'
import { MatchingMessage } from '../types/MatchTypes'
import { markMatchingAsRead, updateMatchingStatus } from '../api/MatchApi'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import RequestedMessage from './components/RequestedMessage'
import CompletedMessage from './components/CompletedMessage'
import DeniedMessage from './components/DeniedMessage'
import MatchingModal from './components/MatchingModal'

interface InBoxMessageProps {
  messages: MatchingMessage[]
  onUpdate?: () => void
}

export default function InBoxRequestMessage({ messages, onUpdate }: InBoxMessageProps) {
  const [selectedMessage, setSelectedMessage] = useState<MatchingMessage | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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

  const handleMessageClick = (message: MatchingMessage) => {
    setSelectedMessage(message)

    if (message.receiverReadStatus === 'UNREAD_REQUESTED_MATCHING') {
      markMatchingAsRead([message.matchingId]).catch((error) => {
        console.error('Error marking message as read:', error)
      })
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
    switch (message.matchingStatusType) {
      case 'REQUESTED':
        return <RequestedMessage message={message} onClick={() => handleMessageClick(message)} />
      case 'COMPLETED':
        return <CompletedMessage message={message} />
      case 'DENIED':
        return <DeniedMessage message={message} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.matchingId}>{renderMessage(message)}</div>
      ))}

      {selectedMessage && selectedMessage.matchingStatusType === 'REQUESTED' && (
        <MatchingModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  )
}

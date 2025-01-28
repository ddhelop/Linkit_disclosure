'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MatchFilter from '../common/MatchFilter'
import { getRequestedMatchingMessages } from '../api/MatchApi'
import { MatchingMessage, SenderType } from '../types/MatchTypes'
import OutBoxRequestMessage from './OutBoxRequestMessage'
import OutBoxMatchFilter from '../common/OutBoxMatchFilter'

export default function MatchOutBox() {
  const [messages, setMessages] = useState<MatchingMessage[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const page = Number(searchParams.get('page')) || 0
        const size = Number(searchParams.get('size')) || 20
        const senderType = searchParams.get('senderType') as SenderType | null

        const response = await getRequestedMatchingMessages(page, size, undefined, senderType || undefined)
        setMessages(response.result.content)
        setTotalElements(response.result.totalElements)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [searchParams])

  return (
    <div className="mt-9 flex flex-col">
      <OutBoxMatchFilter />

      <div className="mt-8 flex flex-col">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <OutBoxRequestMessage messages={messages} />
          </>
        )}
      </div>
    </div>
  )
}

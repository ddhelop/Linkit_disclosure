'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MatchFilter from '../common/MatchFilter'
import InBoxMessage from './InBoxMessage'
import { getMatchingMessages } from '../api/MatchApi'
import { MatchingMessage } from '../types/MatchTypes'

export default function MatchInBox() {
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
        const receiverType = searchParams.get('receiverType') as 'PROFILE' | 'TEAM' | null

        const response = await getMatchingMessages(page, size, receiverType || undefined)
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
      <MatchFilter />

      <div className="mt-8 flex flex-col">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <InBoxMessage messages={messages} />
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MatchFilter from '../common/MatchFilter'
import { getMatchingMessages } from '../api/MatchApi'
import { MatchingMessage } from '../types/MatchTypes'
import InBoxRequestMessage from './InBoxRequestMessage'

export default function MatchInBox() {
  const [messages, setMessages] = useState<MatchingMessage[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

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

  useEffect(() => {
    fetchMessages()
  }, [searchParams])

  return (
    <div className="mt-9 flex flex-col">
      <MatchFilter />

      <div className="mt-8 flex flex-col">
        {isLoading ? <div>로딩 중...</div> : <InBoxRequestMessage messages={messages} onUpdate={fetchMessages} />}
      </div>
    </div>
  )
}

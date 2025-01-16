'use client'

import { useEffect, useState } from 'react'
import ChattingListComponent from './ChattingListComponent'
import { getChattingList } from '../api/ChatApi'
import { ChattingListType } from '../types/ChatTypes'

export default function ChattingList() {
  const [chattingList, setChattingList] = useState<ChattingListType[]>([])

  useEffect(() => {
    const fetchChattingList = async () => {
      const response = await getChattingList()
      setChattingList(response.result.chatRoomSummaries)
    }
    fetchChattingList()
  }, [])

  return (
    <div className="flex w-[22.5rem] flex-col rounded-2xl border border-grey30 bg-white p-4">
      {chattingList.map((chatting) => (
        <ChattingListComponent chattingList={chatting} key={chatting.chatRoomId} />
      ))}
    </div>
  )
}

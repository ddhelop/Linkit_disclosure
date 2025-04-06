'use client'

import { useEffect } from 'react'
import ChannelService from './third-party/ChannelTalk'
import { ReactQueryProvider } from '@/shared/lib/react-query/ReactQueryProvider'

export default function CustomClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const CT = new ChannelService()
    CT.boot({ pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY || '' })
    return () => CT.shutdown()
  }, [])

  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

// app/layout.tsx

import { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Scripts from '@/components/script'
import Header from '@/widgets/Header/Header'
import WebSocketInitializer from '@/shared/components/webSocket/WebSocketInitializer'
import Toast from '@/shared/components/Toast/Toast'
import CustomClient from '@/components/CustomClient'
import { QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { createMetadata } from '@/shared/utils/metadata'
import { AUTHOR_NAME, BASE_SITE_DESCRIPTION, BASE_SITE_TITLE, BASE_SITE_URL } from '@/shared/constants/seo'

export const metadata: Metadata = {
  ...createMetadata({
    title: BASE_SITE_TITLE,
    description: BASE_SITE_DESCRIPTION,
    url: BASE_SITE_URL,
    authors: AUTHOR_NAME,
  }),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_CONTENT,
  },
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  // 현재 경로 가져오기
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_NAVER_SITE_CONTENT} />
        <link rel="canonical" href={`https://www.linkit.im${pathname}`} />
      </head>
      <body className={`${pretendard.className} bg-[#FCFCFD]`}>
        <CustomClient>
          <WebSocketInitializer />
          <Header />
          <div className="bg-[#fcfcfd]">{children}</div>
          <Toast />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
          <Scripts />
        </CustomClient>
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover',
}

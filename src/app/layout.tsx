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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const metadata: Metadata = {
  title: '링킷ㅣ일하는 사람들의 연결점',
  description: '팀 빌딩 서비스, 링킷',
  icons: {
    icon: '/common/logo.png',
  },

  openGraph: {
    title: 'Linkit',
    description: '팀 빌딩 서비스, 링킷',

    siteName: 'Linkit',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://linkit.im',
    images: [
      {
        url: 'https://www.linkit.im/og:image.png',
        alt: '사이트 썸네일',
      },
    ],
  },
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
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <meta name="naver-site-verification" content={process.env.NEXT_PUBLIC_NAVER_SITE_CONTENT} />
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

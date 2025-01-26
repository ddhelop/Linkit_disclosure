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

export const metadata: Metadata = {
  title: '링킷(Linkit) | 일하는 사람들의 연결점',
  description: '팀 빌딩 서비스, 링킷',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Linkit',
    description: '팀 빌딩 서비스, 링킷',
    siteName: 'Linkit',
    locale: 'ko_KR',
    type: 'website',
    url: 'https://linkit.im',
    images: {
      url: '/logo.png',
    },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_CONTENT },
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
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <meta name="google-site-verification" content="PP9z5zXtPDA9QeD8TEvKvlzTGIDZt3R9tCpcUZfoFZ4" />
        <meta name="naver-site-verification" content="17163296e94f835f71bb3d1994ea168bd456675b" />
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

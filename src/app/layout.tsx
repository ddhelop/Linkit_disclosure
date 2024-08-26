// app/layout.tsx

import { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'
import Scripts from '@/components/script'

import ClientProvider from '@/components/common/ClientProvider'
import FetchSetting from '@/components/common/fetch/page'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Linkit',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_CONTENT || '',
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
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${pretendard.className} bg-[#fff]`}>
        <ClientProvider>
          {/* <FetchSetting> */}
          <Header />
          <ToastContainer />
          <div className="bg-grey10">{children}</div>
          <Footer />
          {/* </FetchSetting> */}
        </ClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Scripts />
      </body>
    </html>
  )
}

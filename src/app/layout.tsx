import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'
import Scripts from '@/components/script'

import ClientProvider from '@/components/common/ClientProvider'
import FetchSetting from '@/components/common/fetch/page'

export const metadata: Metadata = {
  title: 'Linkit',
  description: '',
  icons: {
    icon: '/logo.png',
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
      <ClientProvider>
        <FetchSetting>
          <body className={`${pretendard.className} bg-[#F6F8FC]`}>
            <Header />
            {children}
            <Footer />
          </body>
        </FetchSetting>
      </ClientProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      <Scripts />
    </html>
  )
}

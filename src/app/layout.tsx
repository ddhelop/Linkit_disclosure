import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinKit',
  description: '',
  icons: {
    icon: '/logo.png',
  },
}

const pretendard = localFont({
  src: '../lib/fonts/PretendardVariable.woff2',
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
      <body className={pretendard.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

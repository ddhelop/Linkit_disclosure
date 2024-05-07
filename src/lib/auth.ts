// /src/lib/auth.ts

import axios from 'axios'
import { NextAuthOptions, User } from 'next-auth'

import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_OAUTH_ID || "",
    //   clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    // }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID || "",
    //   clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    // }),
  ],

  /* JWT Callback */
  /* 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행 */
  /* 반환된 값은 암호화되어 쿠키에 저장됨 */
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}

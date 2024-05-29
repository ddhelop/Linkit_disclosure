'use client'
import { accessTokenState } from '@/context/recoil-context'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function FetchSetting({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  // 1. get 요청으로 로그인 유저 정보 불러오기

  // 2. accessToken이 만료되면 리프레쉬 토큰으로 재 요청하기.

  // 3. refreshToken이 만료되면 로그아웃 처리 및 로그인 요청

  useEffect(() => {
    const result = localStorage.getItem('accessToken')
    setAccessToken(result ?? '')
  }, [setAccessToken])
  return <div>{children}</div>
}

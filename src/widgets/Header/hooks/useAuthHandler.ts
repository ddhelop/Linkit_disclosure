// src/widgets/Header/hooks/useAuthHandler.ts
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { Logout, RefreshAccessToken } from '@/lib/action'

export const useAuthHandler = () => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    if (!token || token === 'undefined') return

    RefreshAccessToken(token)
      .then((response) => {
        if (!response.existMemberBasicInform) {
          setIsAuth(false)
        } else {
          setToken(response.accessToken)
          setIsAuth(true)
        }

        if (response.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          handleLogout()
        }
      })
      .catch((error) => {
        if (error.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          handleLogout()
        }
      })
  }, [token, setToken, setIsAuth, router])

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const handleLogout = async () => {
    if (!token) return

    try {
      const response = await Logout(token)
      if (response.ok) {
        setIsAuth(false)
        resetAccessTokenState()
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  return {
    isAuth,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    handleLogout,
  }
}

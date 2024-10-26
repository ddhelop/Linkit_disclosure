// src/features/auth/components/KakaoRedirect.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useKakaoAuth } from '../model/useKakaoAuth'

const KakaoRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const { loading } = useKakaoAuth(code)

  return loading ? (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  ) : null
}

export default KakaoRedirect

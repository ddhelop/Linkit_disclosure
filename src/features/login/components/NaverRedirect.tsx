// src/features/auth/components/NaverRedirect.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useNaverAuth } from '../model/useNaverAuth'

const NaverRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const { loading } = useNaverAuth(code)

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

export default NaverRedirect

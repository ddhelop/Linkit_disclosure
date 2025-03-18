'use client'
import { motion } from 'framer-motion'

const ProfileViewProgressSkeleton = () => {
  return (
    <div className="flex w-[17.5rem] flex-col gap-4 rounded-lg border border-grey40 px-[0.94rem] py-5">
      <motion.div
        className="mb-1 h-5 w-24 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <div className="relative h-1.5 rounded-full bg-grey40">
        {/* 시작 지점 동그라미 */}
        <motion.div
          className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* 프로그레스 바 */}
        <motion.div
          className="absolute z-10 h-1.5 w-[30%] rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* 완료 지점 도형 (마름모 모양) */}
        <motion.div
          className="absolute left-[calc(30%-0.75rem)] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rotate-45 transform bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />

        {/* 끝 지점 동그라미 */}
        <motion.div
          className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>
    </div>
  )
}

export default ProfileViewProgressSkeleton

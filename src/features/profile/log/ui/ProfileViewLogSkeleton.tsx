'use client'
import { motion } from 'framer-motion'

const ProfileViewLogSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border">
      {/* 제목 및 날짜 스켈레톤 */}
      <div className="flex items-center gap-2">
        <motion.div
          className="h-6 w-32 rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span className="text-xs text-grey50">|</span>
        <motion.div
          className="h-4 w-24 rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>

      {/* 내용 스켈레톤 */}
      <div className="flex flex-col gap-2">
        <motion.div
          className="h-5 w-full rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div
          className="h-5 w-5/6 rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div
          className="h-5 w-4/6 rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div
          className="h-5 w-3/4 rounded bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>

      {/* 더보기 버튼 스켈레톤 */}
      <div className="flex justify-end">
        <motion.div
          className="h-10 w-28 rounded-xl bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>
    </div>
  )
}

export default ProfileViewLogSkeleton

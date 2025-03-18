'use client'
import { motion } from 'framer-motion'

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col justify-between gap-3 bg-[#EDF3FF] px-6 py-8 md:flex-row md:px-[4.25rem] md:py-[4.62rem]">
      {/* 왼쪽 스켈레톤 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-6 w-16 rounded-[0.38rem] bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="h-6 w-16 rounded-[0.38rem] bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

        <div className="flex gap-5">
          <motion.div
            className="h-[5rem] w-[5rem] rounded-lg bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <div className="flex flex-col justify-center gap-2">
            <motion.div
              className="h-6 w-32 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div
              className="h-4 w-48 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <motion.div
            className="h-[2.5rem] w-[2.5rem] rounded-lg bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="h-[2.5rem] w-[2.5rem] rounded-lg bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>

      {/* 오른쪽 스켈레톤 */}
      <div className="flex flex-col gap-3">
        <motion.div
          className="h-12 w-32 rounded-full bg-gray-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>
    </div>
  )
}

export default ProfileSkeleton

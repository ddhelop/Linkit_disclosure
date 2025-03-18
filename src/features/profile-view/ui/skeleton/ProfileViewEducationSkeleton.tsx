'use client'
import { motion } from 'framer-motion'

const ProfileViewEducationSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border">
      {/* 제목 스켈레톤 */}
      <motion.div
        className="h-6 w-16 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* 학력 아이템 스켈레톤 */}
      <div className="flex flex-col gap-5">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex gap-3 rounded-lg bg-grey10 px-6 py-4"
            animate={{ opacity: [0.7, 0.9, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-6 w-32 rounded bg-gray-200"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-5 w-24 rounded bg-gray-200"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.div
                  className="h-4 w-32 rounded bg-gray-200"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <motion.div
                className="h-16 w-full rounded bg-gray-200"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProfileViewEducationSkeleton

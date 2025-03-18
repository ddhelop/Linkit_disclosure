'use client'
import { motion } from 'framer-motion'

const ProfileViewLinksSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border">
      {/* 제목 스켈레톤 */}
      <motion.div
        className="h-6 w-16 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* 링크 아이템 스켈레톤 */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-xl bg-grey10 px-6 py-3"
            animate={{ opacity: [0.7, 0.9, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          >
            <motion.div
              className="h-5 w-5 rounded-full bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div
              className="h-5 w-32 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <div className="flex-grow"></div>
            <motion.div
              className="h-5 w-5 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProfileViewLinksSkeleton
